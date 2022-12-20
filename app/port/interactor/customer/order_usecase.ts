import OrderModel from "../../../entity/customer/order_model";
import OrderPayload from "../../../entity/customer/order_payload";
import AppConfigContract from "../../repository/customer/app_config_contract";
import CustomerContract from "../../repository/customer/customer_contract";
import OrderContract from "../../repository/customer/order_contract";
import PaymentContract from "../../repository/customer/payment_contract";
import ProductContract from "../../repository/customer/product_contract";
import NotificationContract from "../../service/customer/notification_contract";

class OrderUsecase<T> {
  private orderRepository: OrderContract;
  private productRepository: ProductContract;
  private customerRepository: CustomerContract;
  private paymentRepository: PaymentContract;
  private appConfigRepository: AppConfigContract;
  private notificationService: NotificationContract<T>;

  constructor(
    orderRepository: OrderContract,
    productRepository: ProductContract,
    customerRepository: CustomerContract,
    paymentRepository: PaymentContract,
    appConfigRepository: AppConfigContract,
    notificationService: NotificationContract<T>
  ) {
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
    this.customerRepository = customerRepository;
    this.paymentRepository = paymentRepository;
    this.appConfigRepository = appConfigRepository;
    this.notificationService = notificationService;
  }

  async updateOrderSummary(orderPayload: OrderPayload): Promise<void> {
    const user = await this.customerRepository.show(orderPayload.customer);
    const lastOrder = await this.orderRepository.showLastOrder(
      orderPayload.customer
    );

    let point = 0;
    let shipping: any = orderPayload.shipping;
    let delivery: any = orderPayload.delivery;
    let payment: any = orderPayload.payment;
    let items: any = [];

    if (user != null && orderPayload.point == true) {
      point = user.point!;
    }

    if (orderPayload.shipping == undefined && lastOrder != null) {
      shipping = lastOrder.shipping;
    }

    if (orderPayload.delivery != undefined) {
      const app = await this.appConfigRepository.show();
      const fee = app.fee.delivery;

      delivery = { ...delivery, fee: fee };
    }

    if (payment._id != undefined) {
      const paymentMethod = await this.paymentRepository.show(payment._id);

      payment = paymentMethod;
    }

    for (const item of orderPayload.items) {
      const product = await this.productRepository.getProductById(item.product);
      const total = product!.price!.final! * item.qty;

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

    const model: OrderModel = {
      point: point,
      shipping: shipping,
      delivery: delivery,
      payment: payment,
      items: items,
    };

    // console.log(model);

    await this.orderRepository.upsert(orderPayload.customer, model);
  }

  async updateOrderStatus(
    _id: string,
    orderModel: OrderModel,
    notificationPayload: any
  ): Promise<void> {
    await this.notificationService.send(notificationPayload);
  }
}

export default OrderUsecase;
