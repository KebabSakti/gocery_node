import express, { Request, Response } from "express";
import ChatMongodb from "../../adapter/data/mongodb/chat_mongodb";
import AppConfigMongodb from "../../adapter/data/mongodb/customer/app_config_mongodb";
import BillMongodb from "../../adapter/data/mongodb/customer/bill_mongodb";
import CartMongodb from "../../adapter/data/mongodb/customer/cart_mongodb";
import CustomerMongodb from "../../adapter/data/mongodb/customer/customer_mongodb";
import DeductorMongodb from "../../adapter/data/mongodb/customer/deductor_mongodb";
import DeliveryTimeMongodb from "../../adapter/data/mongodb/customer/delivery_time_mongodb";
import OrderMongodb from "../../adapter/data/mongodb/customer/order_mongodb";
import PaymentMongodb from "../../adapter/data/mongodb/customer/payment_mongodb";
import ProductMongodb from "../../adapter/data/mongodb/customer/product_mongodb";
import NotificationFcm from "../../adapter/service/fcm/customer/notification_fcm";
import DistanceMatrix from "../../adapter/service/google/distance/distance_matrix";
import DateTimeLuxon from "../../adapter/service/luxon/date_time_luxon";
import PaymentGatewayXendit from "../../adapter/service/xendit/payment_gateway_xendit";
import ErrorHandler from "../../common/error/error_handler";
import DistanceUsecase from "../../port/interactor/customer/distance_usecase";
import OrderUsecase from "../../port/interactor/customer/order_usecase";

const router = express.Router();

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

router.post("/xendit", async (req: Request, res: Response) => {
  try {
    const { type, status } = req.query;
    const payload = req.body;

    console.log(status);
    console.log(payload);

    switch (type) {
      case "va":
        console.log("VA TRIGGERED");

        if (status == "paid") {
          await usecase.orderPaid(payload.external_id, JSON.stringify(payload));
        }
        break;

      case "retail":
        console.log("RETAIL TRIGGERED");
        break;

      case "qr":
        console.log("QR TRIGGERED");
        break;

      case "ewallet":
        //SUCCEDED FAILED
        console.log("EWALLET TRIGGERED");

        const { data } = payload;

        if (data != undefined) {
          const { status, reference_id } = data;

          if (status == "SUCCEEDED") {
            usecase.orderPaid(reference_id, JSON.stringify(payload));
          }
        }
        break;
    }

    res.status(200).end();
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;

//xnd_development_3lLKNoyNUU1kwtWPRua2cUG1jx2pIeA0Eij5JH80aHKN8K5vpHJFzW8Kep
