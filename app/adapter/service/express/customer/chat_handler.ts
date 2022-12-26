import { Response } from "express";
import { Request } from "express";
import ErrorHandler from "../../../../common/error/error_handler";
import { BadRequest } from "../../../../common/error/exception";
import ChatUsecase from "../../../../port/interactor/chat_usecase";
import ChatMongodb from "../../../data/mongodb/chat_mongodb";
import OrderMongodb from "../../../data/mongodb/customer/order_mongodb";
import NotificationFcm from "../../fcm/customer/notification_fcm";

const usecase = new ChatUsecase(
  new ChatMongodb(),
  new OrderMongodb(),
  new NotificationFcm()
);

class ChatHandler {
  async getChatSession(req: Request, res: Response) {
    try {
      const { session } = req.params;

      if (session == undefined) {
        throw new BadRequest();
      }

      const results = await usecase.getChatSession(session);

      res.json(results);
    } catch (error) {
      new ErrorHandler(res, error);
    }
  }
}

export default ChatHandler;
