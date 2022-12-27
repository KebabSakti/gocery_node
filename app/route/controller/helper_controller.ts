import express, { Request, Response } from "express";
import ChatMongodb from "../../adapter/data/mongodb/chat_mongodb";
import CourierMongodb from "../../adapter/data/mongodb/courier/courier_mongodb";
import AppConfigMongodb from "../../adapter/data/mongodb/customer/app_config_mongodb";
import BillMongodb from "../../adapter/data/mongodb/customer/bill_mongodb";
import CustomerMongodb from "../../adapter/data/mongodb/customer/customer_mongodb";
import DeductorMongodb from "../../adapter/data/mongodb/customer/deductor_mongodb";
import OrderMongodb from "../../adapter/data/mongodb/customer/order_mongodb";
import PaymentMongodb from "../../adapter/data/mongodb/customer/payment_mongodb";
import ProductMongodb from "../../adapter/data/mongodb/customer/product_mongodb";
import NotificationFcm from "../../adapter/service/fcm/customer/notification_fcm";
import ErrorHandler from "../../common/error/error_handler";
import { ResourceNotFound } from "../../common/error/exception";
import ChatSendOption from "../../entity/chat_send_option";
import ChatUsecase from "../../port/interactor/chat_usecase";
import OrderUsecase from "../../port/interactor/customer/order_usecase";

const router = express.Router();

const orderUsecase = new OrderUsecase(
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

const chatUsecase = new ChatUsecase(
  new ChatMongodb(),
  new OrderMongodb(),
  new NotificationFcm()
);

router.get("*", async (req: Request, res: Response) => {
  try {
    // const iterates: number[] = [...Array(20).keys()];

    const { param } = req.query;

    if (param != undefined) {
      // await orderUsecase.submitOrder(param.toString());

      const chatPayload: ChatSendOption = {
        session: param.toString(),
        sender: {
          _id: "sMQ6HEvkfZadQfbbae2Qlgj11IJ2",
          name: "Aryo",
          role: "customers",
        },
        message: "Hallo",
      };

      await chatUsecase.chatSend(chatPayload);

      // const results = await chatUsecase.getChatSession(param.toString());

      // if (results == null) {
      //   throw new ResourceNotFound("Chat session not found");
      // }

      // res.json(results);
    }

    res.status(200).end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
