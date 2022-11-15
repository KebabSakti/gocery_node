import {
  OrderModel,
  OrderOption,
  OrderShippingModel,
} from "../model/order_model";

export abstract class OrderRepository {
  abstract show(orderOption: OrderOption): Promise<OrderModel>;
}

export abstract class OrderCustomerRepository {
  abstract show(order_uid: string): Promise<OrderShippingModel>;
}
