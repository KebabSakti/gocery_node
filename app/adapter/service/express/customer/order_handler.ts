import { Request, Response } from "express";
import ErrorHandler from "../../../../common/error/error_handler";
import { BadRequest } from "../../../../common/error/exception";
import OrderPayload from "../../../../entity/customer/order_payload";
import DistanceUsecase from "../../../../port/interactor/customer/distance_usecase";
import OrderUsecase from "../../../../port/interactor/customer/order_usecase";
import ChatMongodb from "../../../data/mongodb/chat_mongodb";
import AppConfigMongodb from "../../../data/mongodb/customer/app_config_mongodb";
import BillMongodb from "../../../data/mongodb/customer/bill_mongodb";
import CartMongodb from "../../../data/mongodb/customer/cart_mongodb";
import CustomerMongodb from "../../../data/mongodb/customer/customer_mongodb";
import DeductorMongodb from "../../../data/mongodb/customer/deductor_mongodb";
import DeliveryTimeMongodb from "../../../data/mongodb/customer/delivery_time_mongodb";
import OrderItemMongodb from "../../../data/mongodb/customer/order_item_mongodb";
import OrderMongodb from "../../../data/mongodb/customer/order_mongodb";
import PaymentMongodb from "../../../data/mongodb/customer/payment_mongodb";
import ProductMongodb from "../../../data/mongodb/customer/product_mongodb";
import NotificationFcm from "../../fcm/customer/notification_fcm";
import DistanceMatrix from "../../google/distance/distance_matrix";
import DateTimeLuxon from "../../luxon/date_time_luxon";

const orderRepository = new OrderMongodb();
const productRepository = new ProductMongodb();
const customerRepository = new CustomerMongodb();
const paymentRepository = new PaymentMongodb();
const billRepository = new BillMongodb();
const deductorRepository = new DeductorMongodb();
const appConfigRepository = new AppConfigMongodb();
const notificationService = new NotificationFcm();
const chatRepository = new ChatMongodb();
const cartRepository = new CartMongodb();
const distanceService = new DistanceMatrix();
const deliveryTimeRepository = new DeliveryTimeMongodb();
const dateTimeService = new DateTimeLuxon();
const orderItemRepository = new OrderItemMongodb();

const distanceUsecase = new DistanceUsecase(
  distanceService,
  appConfigRepository
);

const usecase = new OrderUsecase(
  orderRepository,
  productRepository,
  customerRepository,
  paymentRepository,
  billRepository,
  deductorRepository,
  appConfigRepository,
  notificationService,
  chatRepository,
  cartRepository,
  distanceUsecase,
  dateTimeService,
  deliveryTimeRepository,
  orderItemRepository
);

class OrderHandler {
  async getOrderDetail(req: Request, res: Response) {
    try {
      const orderId = req.params.orderId;

      const results = await usecase.getOrderDetail(orderId);

      res.json(results);
    } catch (error) {
      new ErrorHandler(res, error);
    }
  }

  async updateOrderSummary(req: Request, res: Response) {
    try {
      const { point, shipping, payment, items, bills, deductors, clear_cart } =
        req.body;

      const customer = req.app.locals.user;

      const orderPayload: OrderPayload = {
        customer: customer,
        point: point,
        shipping: shipping,
        payment: payment,
        items: items,
        bills: bills,
        deductors: deductors,
        clearCart: clear_cart,
      };

      await usecase.updateOrderSummary(orderPayload);

      res.status(200).end();
    } catch (error) {
      new ErrorHandler(res, error);
    }
  }

  async submitOrder(req: Request, res: Response) {
    try {
      const { order_id } = req.body;

      if (order_id == undefined) {
        throw new BadRequest();
      }

      await usecase.submitOrder(order_id);

      res.status(200).end();
    } catch (error) {
      new ErrorHandler(res, error);
    }
  }
}

export default OrderHandler;
