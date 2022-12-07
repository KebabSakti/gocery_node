import Joi from "joi";

const CategoryValidator = Joi.object({
  name: Joi.string().alphanum().min(1).required(),
}).unknown();

export default CategoryValidator;
