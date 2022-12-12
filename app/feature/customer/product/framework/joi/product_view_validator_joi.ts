import Joi from "joi";
import ProductViewModel from "../../entity/model/product_view_model";
import ProductViewValidator from "../../entity/validator/product_view_validator";
import { BadRequest } from "../../../../../core/config/errors";

class ProductViewValidatorJoi implements ProductViewValidator {
  store(productViewModel: ProductViewModel): void {
    const scheme = Joi.object({
      customer: Joi.string().required(),
      product: Joi.string().required(),
    });

    const { error } = scheme.validate(productViewModel);

    if (error != undefined) {
      throw new BadRequest(error.message);
    }
  }
}

export default ProductViewValidatorJoi;
