import mongoose from "mongoose";
import OrderModel from "../../../../entity/customer/order_model";
import OrderOption from "../../../../entity/customer/order_option";
import OrderContract from "../../../../port/repository/customer/order_contract";
import OrderItemScheme from "./order_item_scheme";
import OrderScheme from "./order_scheme";

class OrderMongodb implements OrderContract {
  async getAllOrder(
    customerId: string,
    option: OrderOption
  ): Promise<OrderModel[]> {
    const query = OrderScheme.find({ "customer._id": customerId })
      .select("-created_at -updated_at -__v")
      .populate("items");

    if (option.status != undefined) {
      query.where({ status: option.status });
    }

    if (option.payment != undefined) {
      query.where({ "payment.status": option.payment });
    }

    if (option.pagination != undefined) {
      query.skip(option.pagination.offset).limit(option.pagination.limit);
    }

    const results = query.exec();

    return results;
  }

  async getOrderDetail(orderId: string): Promise<OrderModel | null> {
    if (mongoose.isValidObjectId(orderId)) {
      const results = await OrderScheme.findOne({
        _id: orderId,
      })
        .select("-created_at -updated_at -__v")
        .populate("items")
        .lean();

      return results;
    }

    return null;
  }

  async updateOrder(orderId: string, orderModel: OrderModel): Promise<void> {
    await OrderScheme.findByIdAndUpdate(orderId, orderModel);
  }

  async upsertOrder(customerId: string, orderModel: OrderModel): Promise<void> {
    const items = orderModel.items!.map((e, _) => {
      return { ...e, _id: new mongoose.Types.ObjectId() };
    });

    const order = await OrderScheme.findOneAndUpdate(
      { "customer._id": customerId, status: [] },
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

  async getLatestOrder(customerId: string): Promise<OrderModel | null> {
    const results = await OrderScheme.findOne({
      "customer._id": customerId,
      status: { $ne: null },
    }).sort({ created_at: "desc" });

    return results;
  }

  async addOrder(orderModel: OrderModel): Promise<OrderModel> {
    const order = await new OrderScheme(orderModel).save();

    return order;
  }
}

export default OrderMongodb;
