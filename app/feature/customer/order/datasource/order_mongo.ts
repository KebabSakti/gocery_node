import mongoose from "mongoose";
import PagingOption from "../../../../core/model/paging_option";
import { OrderModel, OrderScheme } from "../model/order_model";
import OrderOption from "../model/order_option";
import OrderRepository from "../repository/order_repository";
import { OrderItemScheme } from "./../model/order_model";

class OrderMongo implements OrderRepository {
  async index(
    orderOption: OrderOption,
    pagingOption: PagingOption
  ): Promise<OrderModel[]> {
    const query = OrderScheme.find({ "customer._id": orderOption.customer })
      .select("-created_at -updated_at -__v")
      .populate("items");

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

  async upsert(orderModel: OrderModel): Promise<void> {
    const items = orderModel.items.map((e, _) => {
      return { ...e, _id: new mongoose.Types.ObjectId() };
    });

    const order: OrderModel | null = await OrderScheme.findOneAndUpdate(
      { customer: orderModel.customer, status: null },
      { ...orderModel, items: items },
      { upsert: true, returnDocument: "after" }
    );

    if (order != null) {
      await OrderItemScheme.deleteMany({ order: order._id });

      for (const item of items) {
        await OrderItemScheme.create({
          ...item,
          order: order._id,
        });
      }
    }
  }
}

export default OrderMongo;
