import mongoose from "mongoose";
import OrderContract from "../../entity/contract/order_contract";
import OrderModel from "../../entity/model/order_model";
import OrderOption from "../../entity/model/order_option";
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
      const results = await OrderScheme.findById(_id)
        .select("-created_at -updated_at -__v")
        .populate("items");

      return results;
    }

    return null;
  }

  async update(_id: string, orderModel: OrderModel): Promise<void> {
    await OrderScheme.findByIdAndUpdate(_id, orderModel);
  }

  async upsert(customer: string, orderModel: OrderModel): Promise<void> {
    await OrderScheme.findOneAndUpdate(
      { "customer._id": customer, status: null },
      { orderModel },
      { upsert: true }
    );
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
