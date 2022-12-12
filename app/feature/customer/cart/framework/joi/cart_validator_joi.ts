import Joi from "joi";
import CartItem from "../../entity/model/cart_item";
import CartValidator from "../../entity/validator/cart_validator";
import { BadRequest } from "../../../../../core/config/errors";

class CartValidatorJoi implements CartValidator {
  store(cartItem: CartItem): void {
    const scheme = Joi.object({
      customer: Joi.string().required(),
      product: Joi.string().required(),
      qty: Joi.number().required(),
    });

    const { error } = scheme.validate(cartItem);

    if (error != undefined) {
      throw new BadRequest(error.message);
    }
  }
}

export default CartValidatorJoi;
