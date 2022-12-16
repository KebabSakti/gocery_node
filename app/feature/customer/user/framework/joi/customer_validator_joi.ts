import Joi from "joi";
import { BadRequest } from "../../../../../core/config/errors";
import CustomerModel from "../../entity/model/customer_model";
import CustomerValidator from "../../entity/validator/customer_validator";

class CustomerValidatorJoi implements CustomerValidator {
  store(customerModel: CustomerModel): void {
    const scheme = Joi.object({
      _id: Joi.required(),
      name: Joi.string().required(),
      fcm: Joi.string().required(),
    }).unknown();

    const { error } = scheme.validate(customerModel);

    if (error != undefined) {
      throw new BadRequest(error.message);
    }
  }
}

export default CustomerValidatorJoi;
