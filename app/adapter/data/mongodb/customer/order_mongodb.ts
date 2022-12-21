import mongoose from "mongoose";
import OrderModel from "../../../../entity/customer/order_model";
import OrderOption from "../../../../entity/customer/order_option";
import OrderContract from "../../../../port/repository/customer/order_contract";
import OrderItemScheme from "./order_item_scheme";
import OrderScheme from "./order_scheme";

class OrderMongodb implements OrderContract {
  async index(customer: string, option: OrderOption): Promise<OrderModel[]> {
    const query = OrderScheme.find({ "customer._id": customer })
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

  async show(_id: string): Promise<OrderModel | null> {
    if (mongoose.isValidObjectId(_id)) {
      const results = await OrderScheme.findOne({ _id: _id })
        .select("-created_at -updated_at -__v -customer")
        .populate("items")
        .lean();

      return results;
    }

    return null;
  }

  async update(_id: string, orderModel: OrderModel): Promise<void> {
    await OrderScheme.findByIdAndUpdate(_id, orderModel);
  }

  async upsert(customer: string, orderModel: OrderModel): Promise<void> {
    const items = orderModel.items!.map((e, _) => {
      return { ...e, _id: new mongoose.Types.ObjectId() };
    });

    const order = await OrderScheme.findOneAndUpdate(
      { "customer._id": customer, status: null },
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

  async showByCustomer(
    customer: string,
    option: OrderOption
  ): Promise<OrderModel | null> {
    const query = OrderScheme.findOne({
      "customer._id": customer,
      status: option.status,
    })
      .select("-created_at -updated_at -__v")
      .populate("items");

    if (option.payment != undefined) {
      query.where({ "payment.status": option.payment });
    }

    const results = query.exec();

    return results;
  }

  async showLastOrder(customer: string): Promise<OrderModel | null> {
    const results = await OrderScheme.findOne({
      "customer._id": customer,
      status: { $ne: null },
    }).sort({ created_at: "desc" });

    return results;
  }

  async updateByCustomer(
    customer: string,
    orderModel: OrderModel
  ): Promise<void> {
    await OrderScheme.findOneAndUpdate(
      { "customer._id": customer },
      orderModel
    );
  }
}

export default OrderMongodb;
