import { Request, Response } from "express";
import ErrorHandler from "../../../../common/error/error_handler";
import OrderPayload from "../../../../entity/customer/order_payload";
import OrderUsecase from "../../../../port/interactor/customer/order_usecase";
import AppConfigMongodb from "../../../data/mongodb/customer/app_config_mongodb";
import CustomerMongodb from "../../../data/mongodb/customer/customer_mongodb";
import OrderMongodb from "../../../data/mongodb/customer/order_mongodb";
import PaymentMongodb from "../../../data/mongodb/customer/payment_mongodb";
import ProductMongodb from "../../../data/mongodb/customer/product_mongodb";
import NotificationFcm from "../../fcm/customer/notification_fcm";

const usecase = new OrderUsecase(
  new OrderMongodb(),
  new ProductMongodb(),
  new CustomerMongodb(),
  new PaymentMongodb(),
  new AppConfigMongodb(),
  new NotificationFcm()
);

class OrderHandler {
  async updateOrderSummary(req: Request, res: Response) {
    try {
      const { point, shipping, delivery, payment, items } = req.body;

      const customer = req.app.locals.user;

      const orderPayload: OrderPayload = {
        customer: customer,
        point: point,
        shipping: shipping,
        delivery: delivery,
        payment: payment,
        items: items,
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
