import express, { Request, Response } from "express";
import NotificationFcm from "../../../../feature/customer/notification/framework/fcm/notification_fcm";
import OrderModel from "../../../../feature/customer/order-new/entity/model/order_model";
import OrderMongodb from "../../../../feature/customer/order-new/framework/mongodb/order_mongodb";
import OrderUsecase from "../../../../feature/customer/order-new/usecase/order_usecase";
import ProductMongodb from "../../../../feature/customer/product/framework/mongodb/product_mongodb";
import OrderValidatorJoi from "../../../../feature/customer/order-new/framework/joi/order_validator_joi";
import ErrorHandler from "../../../service/error_handler";
import AppConfigMongodb from "../../../../feature/customer/app_conf/framework/mongodb/app_config_mongodb";
import CustomerMongodb from "../../../../feature/customer/user/framework/mongodb/customer_mongodb";
import OrderPayload from "../../../../feature/customer/order-new/usecase/model/order_payload";

const router = express.Router();

const usecase = new OrderUsecase(
  new OrderMongodb(),
  new ProductMongodb(),
  new CustomerMongodb(),
  new AppConfigMongodb(),
  new NotificationFcm()
);

router.post("/", async (req: Request, res: Response) => {
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
});

export default router;
