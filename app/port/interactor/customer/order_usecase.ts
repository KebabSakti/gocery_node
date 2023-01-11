import { BadRequest, ResourceNotFound } from "../../../common/error/exception";
import ChatModel from "../../../entity/chat_model";
import BillModel from "../../../entity/customer/bill_model";
import {
  OrderStatus,
  PaymentStatus,
} from "../../../entity/customer/order_enum";
import OrderModel from "../../../entity/customer/order_model";
import OrderOption from "../../../entity/customer/order_option";
import OrderPayload from "../../../entity/customer/order_payload";
import NotificationOption from "../../../entity/notification_option";
import ChatContract from "../../repository/chat_contract";
import AppConfigContract from "../../repository/customer/app_config_contract";
import BillContract from "../../repository/customer/bill_contract";
import CartContract from "../../repository/customer/cart_contract";
import CustomerContract from "../../repository/customer/customer_contract";
import DeductorContract from "../../repository/customer/deductor_contract";
import DeliveryTimeContract from "../../repository/customer/delivery_time_contract";
import OrderContract from "../../repository/customer/order_contract";
import PaymentContract from "../../repository/customer/payment_contract";
import ProductContract from "../../repository/customer/product_contract";
import DateTimeContract from "../../service/customer/date_time_contract";
import NotificationContract from "../../service/customer/notification_contract";
import PaymentGateway from "../../service/customer/payment_gateway";
import DistanceUsecase from "./distance_usecase";

class OrderUsecase {
  private orderRepository: OrderContract;
  private productRepository: ProductContract;
  private customerRepository: CustomerContract;
  private paymentRepository: PaymentContract;
  private billRepository: BillContract;
  private deductorRepository: DeductorContract;
  private appConfigRepository: AppConfigContract;
  private notificationService: NotificationContract;
  private chatRepository: ChatContract;
  private cartRepository: CartContract;
  private distanceService: DistanceUsecase;
  private dateTimeService: DateTimeContract;
  private deliveryTimeRepository: DeliveryTimeContract;
  private paymentGatewayService: PaymentGateway;

  constructor(
    orderRepository: OrderContract,
    productRepository: ProductContract,
    customerRepository: CustomerContract,
    paymentRepository: PaymentContract,
    billRepository: BillContract,
    deductorRepository: DeductorContract,
    appConfigRepository: AppConfigContract,
    notificationService: NotificationContract,
    chatRepository: ChatContract,
    cartRepository: CartContract,
    distanceService: DistanceUsecase,
    dateTimeService: DateTimeContract,
    deliveryTimeRepository: DeliveryTimeContract,
    paymentGatewayService: PaymentGateway
  ) {
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
    this.customerRepository = customerRepository;
    this.paymentRepository = paymentRepository;
    this.billRepository = billRepository;
    this.deductorRepository = deductorRepository;
    this.appConfigRepository = appConfigRepository;
    this.notificationService = notificationService;
    this.chatRepository = chatRepository;
    this.cartRepository = cartRepository;
    this.distanceService = distanceService;
    this.dateTimeService = dateTimeService;
    this.deliveryTimeRepository = deliveryTimeRepository;
    this.paymentGatewayService = paymentGatewayService;
  }

  async getAllOrders(
    customerId: string,
    option: OrderOption
  ): Promise<OrderModel[]> {
    const results = await this.orderRepository.getAllOrder(customerId, option);

    return results;
  }

  async getOrderDetail(orderId: string): Promise<OrderModel | null> {
    return await this.orderRepository.getOrderDetail(orderId);
  }

  async updateOrderSummary(orderPayload: OrderPayload): Promise<void> {
    const app = await this.appConfigRepository.show();
    const customer = await this.customerRepository.show(orderPayload.customer);

    if (customer == null) {
      throw new ResourceNotFound("Customer not found");
    }

    let user: any = {
      _id: customer._id!,
      name: customer.name!,
      fcm: customer.fcm!,
      email: customer.email,
      image: customer.image,
      phone: customer.phone,
    };

    let point = 0;
    let shipping: any = null;
    let payment: any = {};
    let items: any = [];
    let bills: BillModel[] = [];
    let deductors: BillModel[] = [];
    let qtyTotal = 0;
    let shopTotal = 0;
    let deliveryFeeTotal = app.fee.delivery;
    let paymentFeeTotal = 0;
    let payTotal = 0;

    if (orderPayload.point == true) {
      point = customer.point!;

      user = { ...user, point: point };
    }

    if (orderPayload.shipping != undefined) {
      const distanceResponse = await this.distanceService.getDistance(
        orderPayload.shipping!.destination
      );

      const deliveryTime = await this.deliveryTimeRepository.getById(
        orderPayload.shipping!.time
      );

      if (deliveryTime == null) {
        throw new ResourceNotFound("Delivery time is not available");
      }

      const timeIsAvailable = this.dateTimeService.startIsBeforeEnd(
        deliveryTime.time,
        this.dateTimeService.timeNow()
      );

      // if (!timeIsAvailable) {
      //   throw new BadRequest("Selected delivery time is in the past");
      // }

      shipping = {
        ...shipping,
        fee: app.fee.delivery,
        origin: {
          placeId: app.origin.placeId,
          latLng: app.origin.latLng,
        },
        destination: {
          ...orderPayload.shipping,
          place: orderPayload.shipping.destination,
          distance: distanceResponse.distance.text,
          duration: distanceResponse.duration.text,
        },
        schedule: {
          timeId: deliveryTime._id,
          time: deliveryTime.time,
        },
        meta: {
          distance: distanceResponse.distance.value,
          duration: distanceResponse.duration.value,
        },
      };
    }

    for (const item of orderPayload.items) {
      const product = await this.productRepository.getProductById(item._id);
      const total = product!.price!.final! * item.qty;
      shopTotal += total;
      qtyTotal += item.qty;

      items = [
        ...items,
        {
          _id: product?._id?.toString(),
          product: product?._id?.toString(),
          name: product?.name,
          description: product?.description,
          image: product?.image,
          point: product?.point,
          stock: product?.stock,
          category: product?.category?.toString(),
          currency: {
            code: product?.currency?.code,
            name: product?.currency?.name,
            symbol: product?.currency?.symbol,
          },
          price: {
            base: product?.price?.base,
            discount: product?.price?.discount,
            final: product?.price?.final,
          },
          unit: {
            name: product?.unit?.name,
            symbol: product?.unit?.symbol,
            count: product?.unit?.count,
          },
          meta: {
            sold: product?.meta?.sold,
            view: product?.meta?.view,
            favs: product?.meta?.favs,
          },
          qty: item.qty,
          total: total,
        },
      ];
    }

    if (orderPayload.payment._id != undefined) {
      const paymentMethod = await this.paymentRepository.show(
        orderPayload.payment._id
      );

      if (paymentMethod == null) {
        throw new ResourceNotFound("Payment method not found");
      }

      paymentFeeTotal = !paymentMethod.percentage
        ? paymentMethod.fee!
        : shopTotal * ((paymentMethod.fee! / shopTotal) * 100);

      payment = {
        ...orderPayload.payment,
        ...paymentMethod,
        note: orderPayload.payment.note,
      };
    }

    //total belanja
    bills.push({
      title: "Total Belanja",
      value: shopTotal,
      selected: null,
      active: null,
    });

    //ongkir
    bills.push({
      title: "Total Ongkir",
      value: deliveryFeeTotal,
      selected: null,
      active: null,
    });

    //payment fee
    if (!payment.cash) {
      bills.push({
        title: `Biaya ${payment.name}`,
        value: paymentFeeTotal,
        selected: null,
        active: null,
      });
    }

    //dynamic bill
    for (const billItem of orderPayload.bills) {
      const repoBill = await this.billRepository.getBillById(billItem._id);

      if (repoBill != null) {
        bills.push({
          _id: billItem._id,
          title: repoBill.title,
          value: repoBill.value,
          active: repoBill.active,
          selected: billItem.selected,
        });
      }
    }

    if (point > 0) {
      //point deduction
      deductors.push({
        title: "Potongan Point",
        value: point,
        selected: null,
        active: null,
      });
    }

    //dynamic deductor
    for (const deductorItem of orderPayload.deductors) {
      const repoDeductor = await this.deductorRepository.getDeductorById(
        deductorItem._id
      );

      if (repoDeductor != null) {
        bills.push({
          _id: deductorItem._id,
          title: repoDeductor.title,
          value: repoDeductor.value,
          active: repoDeductor.active,
          selected: deductorItem.selected,
        });
      }
    }

    const billTotal =
      bills.length == 0
        ? 0
        : bills.reduce((partialSum, e) => {
            if (e.selected == true || e.selected == null) {
              return partialSum + e.value;
            }

            return partialSum;
          }, 0);

    const deductorTotal =
      deductors.length == 0
        ? 0
        : deductors.reduce((partialSum, e) => {
            if (e.selected == true || e.selected == null) {
              return partialSum + e.value;
            }

            return partialSum;
          }, 0);

    payTotal = billTotal - deductorTotal < 0 ? 0 : billTotal - deductorTotal;

    const model: OrderModel = {
      customer: user,
      point: point,
      shipping: shipping,
      payment: payment,
      items: items,
      bills: bills,
      deductors: deductors,
      qty: qtyTotal,
      total: payTotal,
    };

    await this.orderRepository.upsertOrder(orderPayload.customer, model);
  }

  async submitOrder(orderId: string): Promise<void> {
    const order = await this.orderRepository.getOrderDetail(orderId);

    if (order == null) {
      throw new ResourceNotFound("Order not found");
    }

    for (const item of order.items!) {
      const product = await this.productRepository.getProductById(
        item.product!
      );

      if (product == null) {
        throw new ResourceNotFound("Product not found");
      }

      if (product.stock! <= 0) {
        throw new BadRequest(`${product?.name} out of stock`);
      }
    }

    // if (order.status == null && order.payment!.status == null) {
    let orderStatus = OrderStatus.PENDING;
    let paymentStatus = PaymentStatus.PENDING;
    let paymentData: any = null;

    if (order.payment!.cash) {
      orderStatus = OrderStatus.ACTIVE;
    } else {
      switch (order.payment!.category) {
        case "va":
          const va = await this.paymentGatewayService.makeVaPayment({
            id: orderId,
            amount: order.total!,
            code: order.payment!.code,
            name: "GOCERY",
          });

          paymentData = {
            category: "va",
            info: `${va.name}\n${va.accountNumber}`,
            raw: {
              charge_response: va.raw.charge_response,
            },
          };
          break;

        case "ewallet":
          const ewallet = await this.paymentGatewayService.makeEwalletPayment({
            id: orderId,
            amount: order.total!,
            code: order.payment!.code,
            phone: order.payment?.note,
          });

          paymentData = {
            category: "ewallet",
            info: ewallet.note,
            raw: {
              charge_response: ewallet.raw.charge_response,
            },
          };
          break;

        case "retail":
          const retail = await this.paymentGatewayService.makeRetailPayment({
            id: orderId,
            amount: order.total!,
            code: order.payment!.code,
            name: order.customer?.name ?? "GOCERY",
          });

          paymentData = {
            category: "retail",
            info: retail.paymentCode,
            raw: {
              charge_response: retail.raw.charge_response,
            },
          };
          break;

        case "qr":
          const qr = await this.paymentGatewayService.makeQrPayment({
            id: orderId,
            amount: order.total!,
          });

          paymentData = {
            category: "qr",
            info: qr.qr,
            raw: {
              charge_response: qr.raw.charge_response,
            },
          };
          break;

        default:
          break;
      }
    }

    const orderModel: OrderModel = {
      ...order,
      status: [...order.status!, { detail: orderStatus }],
      payment: {
        ...order.payment!,
        status: [...order.payment!.status!, { detail: paymentStatus }],
        data: paymentData,
      },
      updated_at: Date.now().toString(),
    };

    await this.orderRepository.updateOrder(orderId, orderModel);

    if (order.clear_cart) {
      await this.cartRepository.clearCart(order.customer!._id);
    }

    if (orderStatus == OrderStatus.ACTIVE) {
      await this.orderIsActive(orderId);
    }
    // }
  }

  async orderPaid(orderId: string, payload: string): Promise<void> {
    const order = await this.orderRepository.getOrderDetail(orderId);

    if (order == null) {
      throw new ResourceNotFound("Order not found");
    }

    const orderModel: OrderModel = {
      ...order,
      status: [...order.status!, { detail: OrderStatus.ACTIVE }],
      payment: {
        ...order.payment!,
        status: [...order.payment!.status!, { detail: PaymentStatus.PAID }],
        data: {
          ...order.payment!.data!,
          raw: { ...order.payment!.data!.raw, paid_response: payload },
        },
      },
      updated_at: Date.now().toString(),
    };

    await this.orderRepository.updateOrder(orderId, orderModel);

    await this.orderIsActive(orderId);

    const notifPayload: NotificationOption = {
      title: "Pembayaran Berhasil",
      body: `Pembayaran menggunakan ${order.payment?.name} telah kami terima`,
    };

    await this.notificationService.sendToTokens(
      [order.customer?.fcm!],
      notifPayload
    );
  }

  private async orderIsActive(orderId: string): Promise<void> {
    const order = await this.orderRepository.getOrderDetail(orderId);

    if (order == null) {
      throw new ResourceNotFound("Order not found");
    }

    const chatModel: ChatModel = {
      session: order._id,
    };

    await this.chatRepository.upsertChatSession(
      order._id!.toString(),
      chatModel
    );

    const courierNotifPayload: NotificationOption = {
      title: "Orderan Baru",
      body: `Antar ke ${order.shipping?.destination.address} atas nama ${
        order.shipping!.destination.name
      }`,
    };

    const customerNotifPayload: NotificationOption = {
      title: "Orderan Diterima",
      body: "Orderan anda sudah terkonfirmasi, tunggu kurir kami antarkan orderannya ke tujuan ya",
    };

    await this.notificationService.sendToTopic(
      "new_order",
      courierNotifPayload
    );

    await this.notificationService.sendToTokens(
      [order.customer?.fcm!],
      customerNotifPayload
    );
  }
}

export default OrderUsecase;
