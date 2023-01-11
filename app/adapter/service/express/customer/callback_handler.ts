import { Request, Response } from "express";
import ErrorHandler from "../../../../common/error/error_handler";
import DistanceUsecase from "../../../../port/interactor/customer/distance_usecase";
import OrderUsecase from "../../../../port/interactor/customer/order_usecase";
import ChatMongodb from "../../../data/mongodb/chat_mongodb";
import AppConfigMongodb from "../../../data/mongodb/customer/app_config_mongodb";
import BillMongodb from "../../../data/mongodb/customer/bill_mongodb";
import CartMongodb from "../../../data/mongodb/customer/cart_mongodb";
import CustomerMongodb from "../../../data/mongodb/customer/customer_mongodb";
import DeductorMongodb from "../../../data/mongodb/customer/deductor_mongodb";
import DeliveryTimeMongodb from "../../../data/mongodb/customer/delivery_time_mongodb";
import OrderMongodb from "../../../data/mongodb/customer/order_mongodb";
import PaymentMongodb from "../../../data/mongodb/customer/payment_mongodb";
import ProductMongodb from "../../../data/mongodb/customer/product_mongodb";
import NotificationFcm from "../../fcm/customer/notification_fcm";
import DistanceMatrix from "../../google/distance/distance_matrix";
import DateTimeLuxon from "../../luxon/date_time_luxon";
import PaymentGatewayXendit from "../../xendit/payment_gateway_xendit";

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
const paymentGatewayService = new PaymentGatewayXendit();

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
  paymentGatewayService
);

class CallbackHandler {
  async xendit(req: Request, res: Response) {
    try {
      const { type } = req.query;
      const payload = req.body;
      const payloadString = JSON.stringify(payload);

      if (type == "va" || type == "retail") {
        await usecase.orderPaid(payload.external_id, payloadString);
      }

      if (type == "qr" || type == "ewallet") {
        if (payload.data != undefined) {
          if (payload.data.status == "SUCCEEDED") {
            await usecase.orderPaid(payload.data.reference_id, payloadString);
          }
        }
      }

      res.status(200).end();
    } catch (error) {
      new ErrorHandler(res, error);
    }
  }
}

export default CallbackHandler;
