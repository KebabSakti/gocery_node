import { Request, Response } from "express";
import ErrorHandler from "../../../../common/error/error_handler";
import OrderPayload from "../../../../entity/customer/order_payload";
import OrderUsecase from "../../../../port/interactor/customer/order_usecase";
import ChatMongodb from "../../../data/mongodb/chat_mongodb";
import AppConfigMongodb from "../../../data/mongodb/customer/app_config_mongodb";
import BillMongodb from "../../../data/mongodb/customer/bill_mongodb";
import CustomerMongodb from "../../../data/mongodb/customer/customer_mongodb";
import DeductorMongodb from "../../../data/mongodb/customer/deductor_mongodb";
import OrderMongodb from "../../../data/mongodb/customer/order_mongodb";
import PaymentMongodb from "../../../data/mongodb/customer/payment_mongodb";
import ProductMongodb from "../../../data/mongodb/customer/product_mongodb";
import NotificationFcm from "../../fcm/customer/notification_fcm";

const usecase = new OrderUsecase(
  new OrderMongodb(),
  new ProductMongodb(),
  new CustomerMongodb(),
  new PaymentMongodb(),
  new BillMongodb(),
  new DeductorMongodb(),
  new AppConfigMongodb(),
  new NotificationFcm(),
  new ChatMongodb()
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
      const { point, shipping, delivery, payment, items, bills, deductors } =
        req.body;

      const customer = req.app.locals.user;

      const orderPayload: OrderPayload = {
        customer: customer,
        point: point,
        shipping: shipping,
        delivery: delivery,
        payment: payment,
        items: items,
        bills: bills,
        deductors: deductors,
      };

      await usecase.updateOrderSummary(orderPayload);

      res.status(200).end();
    } catch (error) {
      new ErrorHandler(res, error);
    }
  }

  async updateOrderStatus(req: Request, res: Response) {}
}

export default OrderHandler;
