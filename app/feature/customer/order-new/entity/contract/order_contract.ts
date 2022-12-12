import OrderModel from "../model/order_model";
import OrderOption from "../model/order_option";

abstract class OrderContract {
  abstract index(customer: string, option: OrderOption): Promise<OrderModel[]>;

  abstract show(_id: string): Promise<OrderModel | null>;

  abstract update(_id: string, orderModel: OrderModel): Promise<void>;

  abstract upsert(customer: string, orderModel: OrderModel): Promise<void>;

  abstract showByCustomer(
    customer: string,
    option: OrderOption
  ): Promise<OrderModel | null>;

  abstract showLastOrder(customer: string): Promise<OrderModel | null>;

  abstract updateByCustomer(
    customer: string,
    orderModel: OrderModel
  ): Promise<void>;
}

export default OrderContract;
