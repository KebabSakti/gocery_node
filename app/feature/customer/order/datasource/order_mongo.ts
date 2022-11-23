import mongoose from "mongoose";
import PagingOption from "../../../../core/model/paging_option";
import { OrderModel, OrderScheme } from "../model/order_model";
import OrderOption from "../model/order_option";
import OrderRepository from "../repository/order_repository";

class OrderMongo implements OrderRepository {
  async index(
    orderOption: OrderOption,
    pagingOption: PagingOption
  ): Promise<OrderModel[]> {
    const query = OrderScheme.find({ customer: orderOption.customer })
      .select("-created_at -updated_at -__v")
      .populate("products");

    if (orderOption.status != undefined) {
      query.where({ status: orderOption.status });
    }

    query.skip(pagingOption.offset).limit(pagingOption.limit);

    const results = query.exec();

    return results;
  }

  async show(id: string): Promise<OrderModel | null> {
    let results: OrderModel | null = null;

    if (mongoose.isValidObjectId(id)) {
      results = await OrderScheme.findById(id)
        .select("-created_at -updated_at -__v")
        .populate("products");
    }

    return results;
  }

  async store(orderModel: OrderModel): Promise<void> {
    await OrderScheme.create(orderModel);
  }

  async update(orderModel: OrderModel): Promise<void> {
    if (mongoose.isValidObjectId(orderModel._id)) {
      await OrderScheme.findOneAndUpdate({ _id: orderModel._id }, orderModel);
    }
  }
}

export default OrderMongo;
