import Joi from "joi";
import SearchModel from "../../entity/model/search_model";
import SearchValidator from "../../entity/validator/search_validator";
import { BadRequest } from "./../../../../../core/config/errors";

class SearchValidatorJoi implements SearchValidator {
  store(searchModel: SearchModel): void {
    const scheme = Joi.object({
      customer: Joi.string().required(),
      keyword: Joi.string().min(1).required(),
    });

    const { error } = scheme.validate(searchModel);

    if (error != undefined) {
      throw new BadRequest(error.message);
    }
  }
}

export default SearchValidatorJoi;
