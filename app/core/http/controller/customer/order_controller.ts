import express, { Request, Response } from "express";
import OrderMongo from "../../../../feature/customer/order/datasource/order_mongo";
import { OrderModel } from "../../../../feature/customer/order/model/order_model";
import OrderRepository from "../../../../feature/customer/order/repository/order_repository";
import PaymentMongo from "../../../../feature/customer/payment/datasource/payment_mongo";
import PaymentRepository from "../../../../feature/customer/payment/repository/payment_repository";
import ProductMongo from "../../../../feature/customer/product/datasource/product_mongo";
import ProductRepository from "../../../../feature/customer/product/repository/product_repository";
import CustomerMongo from "../../../../feature/customer/user/datasource/customer_mongo";
import CustomerRepository from "../../../../feature/customer/user/repository/customer_repository";
import Config from "../../../config/config";
import { BadRequest, InternalServerError } from "../../../config/errors";
import PagingOption from "../../../model/paging_option";
import ErrorHandler from "../../../service/error_handler";
import FcmNotification from "./../../../../feature/customer/notification/datasource/fcm_notification";
import NotificationRepository from "./../../../../feature/customer/notification/repository/notification_repository";
import { OrderItemModel } from "./../../../../feature/customer/order/model/order_model";
import OrderOption from "./../../../../feature/customer/order/model/order_option";
import { io } from "../../../../index";

const router = express.Router();

const orderRepository: OrderRepository = new OrderMongo();
const customerRepository: CustomerRepository = new CustomerMongo();
const paymentRepository: PaymentRepository = new PaymentMongo();
const productRepository: ProductRepository = new ProductMongo();
const notificationRepository: NotificationRepository<
  any,
  Promise<void>
> = new FcmNotification();

router.get("/", async (req: Request, res: Response) => {
  try {
    const orderOption: OrderOption = {
      customer: req.params.customer_id,
      status: req.body.status,
    };

    const page = isNaN(parseInt(req.query.page as string))
      ? 1
      : parseInt(req.query.page as string);

    const limit = isNaN(parseInt(req.query.limit as string))
      ? 10
      : parseInt(req.query.limit as string);

    if (limit >= 20) {
      throw new BadRequest();
    }

    const pagingOption = new PagingOption(page, limit);

    const results = await orderRepository.index(orderOption, pagingOption);

    res.json(results);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.get("/:id/show", async (req: Request, res: Response) => {
  try {
    const results = await orderRepository.show(req.params.id);

    res.json(results);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const customer = await customerRepository.show(req.app.locals.user);
    const payment = await paymentRepository.show(req.body.payment._id);

    if (customer == null || payment == null) {
      throw new InternalServerError();
    }

    let itemsQty = 0;
    let itemsTotal = 0;

    const deliveryFee = Config.app.fee.delivery;
    const bills: { name: string; value: number }[] = [];
    const deductors: { name: string; value: number }[] = [];

    const items = req.body.items;
    const orderItems: OrderItemModel[] = [];

    for (const item of items) {
      const product = await productRepository.show(item._id);

      if (product != null) {
        const qty = item.qty;
        const total = product.price!.final * item.qty;

        itemsQty += qty;
        itemsTotal += total;

        orderItems.push({
          product: product._id!,
          qty: qty,
          total: total,
          category: product.category!,
          currency: product.currency!,
          image: product.image!,
          meta: product.meta!,
          name: product.name!,
          point: product.point!,
          price: product.price!,
          unit: product.unit!,
          description: product.description,
          link: product.link,
          max: product.max,
          min: product.min,
          note: item.note,
        });
      }
    }

    bills.push({
      name: "Total belanja",
      value: itemsTotal,
    });

    bills.push({
      name: "Ongkir",
      value: deliveryFee,
    });

    bills.push({
      name: "Biaya admin",
      value: payment.fee!,
    });

    if (req.body.point == true) {
      deductors.push({
        name: "Point",
        value: customer.point!,
      });
    }

    const billTotal =
      bills.length == 0
        ? 0
        : bills.reduce((partialSum, e) => partialSum + e.value, 0);

    const deductorTotal =
      deductors.length == 0
        ? 0
        : deductors.reduce((partialSum, e) => partialSum + e.value, 0);

    const payTotal =
      billTotal - deductorTotal < 0 ? 0 : billTotal - deductorTotal;

    const orderModel: OrderModel = {
      qty: itemsQty,
      total: payTotal,
      invoice: "GC/INV/1",
      customer: {
        _id: customer._id!,
        name: customer.name!,
        email: customer.email,
        phone: customer.phone,
        image: customer.image,
      },
      shipping: {
        address: req.body.shipping.address,
        name: req.body.shipping.name,
        phone: req.body.shipping.phone,
        note: req.body.shipping.note,
        place_id: req.body.shipping.place_id,
      },
      delivery: {
        distance: req.body.delivery.distance,
        unit: req.body.delivery.unit,
        time: req.body.delivery.time,
        fee: deliveryFee,
      },
      payment: {
        _id: payment._id!,
        category: payment.category!,
        code: payment.code!,
        name: payment.name!,
        picture: payment.picture!,
        fee: payment.fee!,
        percentage: payment.percentage!,
        min: payment.min!,
        max: payment.max!,
        expire: payment.expire!,
      },
      items: orderItems,
      bills: bills,
      deductors: deductors,
    };

    await orderRepository.upsert(orderModel);

    io.I.on("connection", (socket) => {
      socket.emit("user:joined", { username: "KEBAB" });
    });

    res.status(200).end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
