import OrderItemModel from "../../../entity/customer/order_item_model";

abstract class OrderItemContract {
  abstract addOrderItem(model: OrderItemModel): Promise<void>;

  abstract updateOrderItem(
    orderItemId: string,
    model: OrderItemModel
  ): Promise<void>;
}

export default OrderItemContract;
