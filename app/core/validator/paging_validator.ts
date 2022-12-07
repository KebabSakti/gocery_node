import Joi from "joi";

const PagingValidator = Joi.object({
  page: Joi.number().min(1).required(),
  limit: Joi.number().min(1).required(),
}).unknown();

export default PagingValidator;
