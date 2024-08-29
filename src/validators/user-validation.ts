import Joi from "joi";

export const userValidation = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
