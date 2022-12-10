import Joi from "joi";
import { BadRequest } from "../../../../../core/config/errors";
import CustomerModel from "../../entity/model/customer_model";
import AuthValidator from "../../entity/validator/auth_validator";

class AuthValidatorJoi implements AuthValidator {
  access(customerModel: CustomerModel): void {
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

export default AuthValidatorJoi;
