import OrderModel from "../../../entity/customer/order_model";
import OrderOption from "../../../entity/customer/order_option";

abstract class OrderContract {
  abstract getAllOrder(
    customerId: string,
    option: OrderOption
  ): Promise<OrderModel[]>;

  abstract getOrderDetail(orderId: string): Promise<OrderModel | null>;

  abstract updateOrder(orderId: string, orderModel: OrderModel): Promise<void>;

  abstract upsertOrder(customer: string, orderModel: OrderModel): Promise<void>;

  abstract getLatestOrder(customer: string): Promise<OrderModel | null>;

  abstract addOrder(orderModel: OrderModel): Promise<OrderModel>;
}

export default OrderContract;
