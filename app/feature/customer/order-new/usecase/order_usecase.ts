import AppConfigContract from "../../app_conf/entity/contract/app_config_contract";
import NotificationContract from "../../notification/entity/contract/notification_contract";
import ProductContract from "../../product/entity/contract/product_contract";
import OrderContract from "../entity/contract/order_contract";
import OrderModel from "../entity/model/order_model";

class OrderUsecase<T> {
  private orderRepository: OrderContract;
  private productRepository: ProductContract;
  private appConfigRepository: AppConfigContract;
  private notificationService: NotificationContract<T>;

  constructor(
    orderRepository: OrderContract,
    productRepository: ProductContract,
    appConfigRepository: AppConfigContract,
    notificationService: NotificationContract<T>
  ) {
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
    this.appConfigRepository = appConfigRepository;
    this.notificationService = notificationService;
  }

  async upsert(customer: string, orderModel: OrderModel): Promise<void> {
    const lastOrder = await this.orderRepository.showLastOrder(customer);

    let shipping: any = orderModel.shipping;
    let delivery: any = orderModel.delivery;

    if (orderModel.shipping == undefined && lastOrder != null) {
      shipping = lastOrder.shipping;
    }

    if (orderModel.delivery != undefined) {
      const app = await this.appConfigRepository.show();
      const fee = app.fee.delivery;

      delivery = { ...delivery, fee: fee };
    }

    const model: OrderModel = {
      ...orderModel,
      shipping: shipping,
      delivery: delivery,
    };

    console.log(model);

    await this.orderRepository.upsert(customer, model);
  }

  async update(
    _id: string,
    orderModel: OrderModel,
    notificationPayload: any
  ): Promise<void> {
    await this.notificationService.send(notificationPayload);
  }
}

export default OrderUsecase;
