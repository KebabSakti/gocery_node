import OrderModel from "../../../entity/customer/order_model";
import OrderPayload from "../../../entity/customer/order_payload";
import AppConfigContract from "../../repository/customer/app_config_contract";
import CustomerContract from "../../repository/customer/customer_contract";
import OrderContract from "../../repository/customer/order_contract";
import ProductContract from "../../repository/customer/product_contract";
import NotificationContract from "../../service/customer/notification_contract";

class OrderUsecase<T> {
  private orderRepository: OrderContract;
  private productRepository: ProductContract;
  private customerRepository: CustomerContract;
  private appConfigRepository: AppConfigContract;
  private notificationService: NotificationContract<T>;

  constructor(
    orderRepository: OrderContract,
    productRepository: ProductContract,
    customerRepository: CustomerContract,
    appConfigRepository: AppConfigContract,
    notificationService: NotificationContract<T>
  ) {
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
    this.customerRepository = customerRepository;
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
