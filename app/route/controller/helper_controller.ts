import express, { Request, Response } from "express";
import ChatMongodb from "../../adapter/data/mongodb/chat_mongodb";
import AppConfigMongodb from "../../adapter/data/mongodb/customer/app_config_mongodb";
import BillMongodb from "../../adapter/data/mongodb/customer/bill_mongodb";
import CustomerMongodb from "../../adapter/data/mongodb/customer/customer_mongodb";
import DeductorMongodb from "../../adapter/data/mongodb/customer/deductor_mongodb";
import OrderMongodb from "../../adapter/data/mongodb/customer/order_mongodb";
import PaymentMongodb from "../../adapter/data/mongodb/customer/payment_mongodb";
import ProductMongodb from "../../adapter/data/mongodb/customer/product_mongodb";
import NotificationFcm from "../../adapter/service/fcm/customer/notification_fcm";
import ErrorHandler from "../../common/error/error_handler";
import OrderUsecase from "../../port/interactor/customer/order_usecase";

const router = express.Router();

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

router.get("*", async (req: Request, res: Response) => {
  try {
    // const iterates: number[] = [...Array(20).keys()];

    const { param } = req.query;

    if (param != undefined) {
      await usecase.submitOrder(param.toString());
    }

    res.status(200).end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
