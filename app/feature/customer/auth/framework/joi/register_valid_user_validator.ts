import Joi from "joi";

const RegisterValidUserValidator = Joi.object({
  _id: Joi.required(),
  name: Joi.string().required(),
  fcm: Joi.string().required(),
});

export default RegisterValidUserValidator;
