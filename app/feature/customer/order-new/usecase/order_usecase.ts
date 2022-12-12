import OrderContract from "../entity/contract/order_contract";
import ProductContract from "../../product/entity/contract/product_contract";
import NotificationContract from "../../notification/entity/contract/notification_contract";
import OrderModel from "../entity/model/order_model";
import OrderValidator from "../entity/validator/order_validator";

class OrderUsecase<T> {
  private orderRepository: OrderContract;
  private productRepository: ProductContract;
  private notificationService: NotificationContract<T>;
  private orderValidator: OrderValidator;

  constructor(
    orderRepository: OrderContract,
    productRepository: ProductContract,
    notificationService: NotificationContract<T>,
    orderValidator: OrderValidator
  ) {
    this.orderRepository = orderRepository;
    this.productRepository = productRepository;
    this.notificationService = notificationService;
    this.orderValidator = orderValidator;
  }

  async upsert(customer: string, orderModel: OrderModel): Promise<void> {
    this.orderValidator.upsert(orderModel);

    const lastOrder = await this.orderRepository.showLastOrder(customer);

    let shipping: any = orderModel.shipping;

    if (orderModel.shipping == undefined && lastOrder != null) {
      shipping = lastOrder.shipping;
    }

    const model: OrderModel = {
      ...orderModel,
      shipping: shipping,
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
