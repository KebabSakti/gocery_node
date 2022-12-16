import AppConfigContract from "../../app_conf/entity/contract/app_config_contract";
import NotificationContract from "../../notification/entity/contract/notification_contract";
import ProductContract from "../../product/entity/contract/product_contract";
import OrderContract from "../entity/contract/order_contract";
import CustomerContract from "../../user/entity/contract/customer_contract";
import OrderModel from "../entity/model/order_model";
import OrderPayload from "./model/order_payload";

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

    const model: OrderModel = {
      point: point,
      shipping: shipping,
      delivery: delivery,
      items: orderPayload.items,
    };

    console.log(model);

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
