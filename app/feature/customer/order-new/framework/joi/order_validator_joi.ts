import Joi from "joi";
import { BadRequest } from "../../../../../core/config/errors";
import OrderModel from "../../entity/model/order_model";
import OrderValidator from "../../entity/validator/order_validator";

class OrderValidatorJoi implements OrderValidator {
  upsert(orderModel: OrderModel): void {
    const scheme = Joi.object({
      payment: Joi.object().required(),
      items: Joi.array().min(1),
    }).unknown();

    const { error } = scheme.validate(orderModel);

    if (error != undefined) {
      throw new BadRequest(error.message);
    }
  }
}

export default OrderValidatorJoi;
