import express, { Request, Response } from "express";
import OrderMongo from "../../../../feature/customer/order/datasource/order_mongo";
import { OrderModel } from "../../../../feature/customer/order/model/order_model";
import OrderRepository from "../../../../feature/customer/order/repository/order_repository";
import PaymentMongo from "../../../../feature/customer/payment/datasource/payment_mongo";
import PaymentRepository from "../../../../feature/customer/payment/repository/payment_repository";
import CustomerMongo from "../../../../feature/customer/user/datasource/customer_mongo";
import CustomerRepository from "../../../../feature/customer/user/repository/customer_repository";
import { OrderStatus, PaymentStatus } from "../../../config/enums";
import { BadRequest, InternalServerError } from "../../../config/errors";
import PagingOption from "../../../model/paging_option";
import ErrorHandler from "../../../service/error_handler";
import OrderOption from "./../../../../feature/customer/order/model/order_option";

const router = express.Router();
const orderRepository: OrderRepository = new OrderMongo();
const customerRepository: CustomerRepository = new CustomerMongo();
const paymentRepository: PaymentRepository = new PaymentMongo();

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
    const payment = await paymentRepository.show(req.body.payment.id);

    if (customer == null || payment == null) {
      throw new InternalServerError();
    }

    let deliveryFee = 0;
    let paymentFee = 0;
    let qtyTotal = 0;
    let payTotal = 0;

    const bills: { name: string; value: number }[] = [];
    const discounts: { name: string; value: number }[] = [];

    const items = req.body.items;

    items.forEach((e: any) => {
      qtyTotal += e.qty;
      paymentFee += e.total;
    });

    //shop total
    bills.push({
      name: "Total belanja",
      value: payTotal,
    });

    //delivery fee
    bills.push({
      name: "Ongkir",
      value: req.body.delivery.fee,
    });

    //payment fee
    bills.push({
      name: "Biaya admin",
      value: payment.fee!,
    });

    const orderModel: OrderModel = {
      qty: qtyTotal,
      total: payTotal,
      status: OrderStatus.PENDING,
      invoice: {
        prefix: "GC",
        leading: 6,
      },
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
        _id: "",
        category: "",
        code: "",
        name: "",
        picture: "",
        fee: paymentFee,
        percentage: 0,
        min: 0,
        max: 0,
        expire: "",
        status: PaymentStatus.PENDING,
      },
      items: [],
    };

    await orderRepository.upsert(orderModel);

    res.end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
