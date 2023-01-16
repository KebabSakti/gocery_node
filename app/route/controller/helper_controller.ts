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
import RandomStringGenerator from "../../common/utility/random_string_generator";
import PaymentScheme from "../../entity/customer/payment_scheme";
import ChatUsecase from "../../port/interactor/chat_usecase";
import DeliveryTimeUsecase from "../../port/interactor/customer/delivery_time_usecase";
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
const distance = new DistanceMatrix();
const paymentGatewayService = new PaymentGatewayXendit();

const distanceUsecase = new DistanceUsecase(
  distanceService,
  appConfigRepository
);

const orderUsecase = new OrderUsecase(
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

const chatUsecase = new ChatUsecase(
  chatRepository,
  orderRepository,
  notificationService
);

const deliveryTimeUsecase = new DeliveryTimeUsecase(
  new DeliveryTimeMongodb(),
  dateTimeService
);

const xendit = new PaymentGatewayXendit();

const generator = new RandomStringGenerator();

router.get("*", async (req: Request, res: Response) => {
  try {
    // const iterates: number[] = [...Array(20).keys()];

    const { param } = req.query;

    if (param != undefined) {
      // await orderUsecase.submitOrder(param.toString());
      // const chatPayload: ChatSendOption = {
      //   session: param.toString(),
      //   sender: {
      //     _id: "sMQ6HEvkfZadQfbbae2Qlgj11IJ2",
      //     name: "Aryo",
      //     role: "customers",
      //   },
      //   message: "Hallo",
      // };
      // await chatUsecase.chatSend(chatPayload);
      // const results = await chatUsecase.getChatSession(param.toString());
      // if (results == null) {
      //   throw new ResourceNotFound("Chat session not found");
      // }
      // res.json(results);
      // const distanceFromLatlng = await distance.getDistance({
      //   origin: "-0.45112820110515417,117.16787601134645",
      //   destination: "-0.4946222024853206,117.12710191134651",
      // });
      // const distanceFromPlaceId = await distance.getDistance({
      //   origin: "place_id:ChIJ4Wxyxb959i0RezVkTs8gY_Q",
      //   destination: "place_id:ChIJRwfTC29_9i0R92CLWYaaTms",
      // });
      // console.log(distanceFromLatlng);
      // console.log(distanceFromPlaceId);
    }

    // const time = "01:00"; //09:00 in UTC+8

    // const start = DateTime.fromISO(time).toFormat("HH:mm");
    // const end = DateTime.now().toFormat("HH:mm");

    // console.log(dateTimeService.startIsBeforeEnd(start, end));

    // await DeliveryTimeScheme.create([
    //   { time: "01:00", active: true },
    //   { time: "04:00", active: true },
    //   { time: "07:00", active: true },
    // ]);

    // const times = await deliveryTimeUsecase.getAvailableDeliveryTimes();

    // const result = await xendit.makeVaPayment({
    //   id: Date.now().toString(),
    //   amount: 25000,
    //   code: "MANDIRI",
    //   // name: "UDIN",
    //   // phone: "6281254982664",
    // });

    // await new PaymentScheme({
    //   vendor: "xendit",
    //   category: "qr",
    //   code: "QRIS",
    //   name: "QRIS",
    //   picture:
    //     "https://res.cloudinary.com/vjtechsolution/image/upload/v1656986817/ayo%20mobile/qris.png",
    //   percentage: true,
    //   fee: 0.7,
    //   cash: false,
    //   active: true,
    // }).save();

    const randomString = generator.uuidv4();

    if (generator.udin.length > 0) {
      generator.udin = generator.udin;
    } else {
      generator.udin = randomString;
    }

    res.json(generator.udin);
  } catch (error) {
    new ErrorHandler(res, error);
  }
});

export default router;
