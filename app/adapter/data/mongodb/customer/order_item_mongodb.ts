import OrderItemModel from "../../../../entity/customer/order_item_model";
import OrderItemContract from "../../../../port/repository/customer/order_item_contract";
import OrderItemScheme from "./order_item_scheme";

class OrderItemMongodb implements OrderItemContract {
  async addOrderItem(model: OrderItemModel): Promise<void> {
    await new OrderItemScheme(model).save();
  }

  async updateOrderItem(
    orderItemId: string,
    model: OrderItemModel
  ): Promise<void> {
    await OrderItemScheme.findByIdAndUpdate(orderItemId, model);
  }
}

export default OrderItemMongodb;
