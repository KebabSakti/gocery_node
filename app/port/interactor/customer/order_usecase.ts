import ChatItemModel from "../../../entity/chat_item_model";
import ChatModel from "../../../entity/chat_model";
import BillModel from "../../../entity/customer/bill_model";
import DistanceRequest from "../../../entity/customer/distance_request";
import {
  OrderStatus,
  PaymentStatus,
} from "../../../entity/customer/order_enum";
import OrderModel from "../../../entity/customer/order_model";
import OrderPayload from "../../../entity/customer/order_payload";
import NotificationOption from "../../../entity/notification_option";
import ChatContract from "../../repository/chat_contract";
import AppConfigContract from "../../repository/customer/app_config_contract";
import BillContract from "../../repository/customer/bill_contract";
import CartContract from "../../repository/customer/cart_contract";
import CustomerContract from "../../repository/customer/customer_contract";
import DeductorContract from "../../repository/customer/deductor_contract";
import OrderContract from "../../repository/customer/order_contract";
import PaymentContract from "../../repository/customer/payment_contract";
import ProductContract from "../../repository/customer/product_contract";
import DistanceContract from "../../service/customer/distance_contract";
import NotificationContract from "../../service/customer/notification_contract";
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
    distanceService: DistanceUsecase
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
  }

  async getOrderDetail(orderId: string): Promise<OrderModel | null> {
    return await this.orderRepository.getOrderDetail(orderId);
  }

  async updateOrderSummary(orderPayload: OrderPayload): Promise<void> {
    const customer = await this.customerRepository.show(orderPayload.customer);
    const lastOrder = await this.orderRepository.getLatestOrder(
      orderPayload.customer
    );

    let point = 0;
    let shipping: any = orderPayload.shipping;
    let delivery: any = orderPayload.delivery;
    let payment: any = orderPayload.payment;
    let items: any = [];
    let bills: BillModel[] = [];
    let deductors: BillModel[] = [];
    let qtyTotal = 0;
    let shopTotal = 0;
    let deliveryFeeTotal = 0;
    let paymentFeeTotal = 0;
    let payTotal = 0;

    if (customer != null && orderPayload.point == true) {
      point = customer.point!;
    }

    if (shipping == undefined) {
      if (lastOrder != null) {
        shipping = lastOrder.shipping;
      } else {
        shipping = null;
      }
    }

    for (const item of orderPayload.items) {
      const product = await this.productRepository.getProductById(item._id);
      const total = product!.price!.final! * item.qty;
      shopTotal += total;
      qtyTotal += item.qty;

      items = [
        ...items,
        {
          ...product,
          product: product?._id?.toString(),
          qty: item.qty,
          total: total,
        },
      ];
    }

    if (delivery != undefined) {
      const app = await this.appConfigRepository.show();
      const distanceResponse = await this.distanceService.getDistance(
        delivery.destination
      );

      delivery = {
        time: delivery.time,
        fee: app.fee.delivery,
        distanceText: distanceResponse.distance.text,
      };
    } else {
      delivery = null;
    }

    if (payment._id != undefined) {
      const paymentMethod = await this.paymentRepository.show(payment._id);
      paymentFeeTotal = paymentMethod?.fee!;

      payment = { ...paymentMethod, note: orderPayload.payment.note };
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
      customer: {
        _id: customer!._id!,
        name: customer!.name!,
        fcm: customer!.fcm!,
        email: customer!.email,
        image: customer!.image,
        phone: customer!.phone,
        point: customer!.point,
      },
      point: point,
      shipping: shipping,
      delivery: delivery,
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

    if (order != null) {
      // if (order.status == null && order.payment!.status == null) {
      let orderStatus = OrderStatus.PENDING;
      let paymentStatus = PaymentStatus.PENDING;

      if (order.payment!.cash) {
        orderStatus = OrderStatus.ACTIVE;
      }

      const orderModel: OrderModel = {
        ...order,
        status: orderStatus,
        payment: { ...order.payment!, status: paymentStatus },
        updated_at: Date.now().toString(),
      };

      await this.orderRepository.updateOrder(orderId, orderModel);

      if (orderStatus == OrderStatus.ACTIVE) {
        const chatModel: ChatModel = {
          session: order._id,
        };

        await this.chatRepository.upsertChatSession(
          order._id!.toString(),
          chatModel
        );

        const notifPayload: NotificationOption = {
          title: "Orderan Baru",
          body: `Antar ke ${orderModel.shipping?.address} atas nama ${
            orderModel.shipping!.name
          }`,
        };

        await this.notificationService.sendToTopic("new_order", notifPayload);
      }
      // }

      if (order.clearCart) {
        await this.cartRepository.clearCart(order.customer!._id);
      }
    }
  }
}

export default OrderUsecase;
