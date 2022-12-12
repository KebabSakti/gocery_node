import OrderModel from "../model/order_model";

abstract class OrderValidator {
  abstract upsert(orderModel: OrderModel): void;
}

export default OrderValidator;
