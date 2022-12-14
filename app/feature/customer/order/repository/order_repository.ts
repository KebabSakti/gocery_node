import PagingOption from "../../../../core/model/paging_option";
import { OrderModel } from "../model/order_model";
import OrderOption from "../model/order_option";

abstract class OrderRepository {
  abstract index(
    orderOption: OrderOption,
    pagingOption: PagingOption
  ): Promise<OrderModel[]>;

  abstract show(id: string): Promise<OrderModel | null>;

  abstract upsert(orderModel: OrderModel): Promise<void>;

  abstract update(orderModel: OrderModel): Promise<void>;
}

export default OrderRepository;
