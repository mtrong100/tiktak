import Joi from "joi";

export const authValidation = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "any.required": "Username is required.",
    "string.base": "Username must be a string.",
    "string.min": "Username must be at least {#limit} characters long.",
    "string.max": "Username must be at most {#limit} characters long.",
  }),
  avatar: Joi.string().required().messages({
    "any.required": "Avatar is required.",
    "string.base": "Avatar must be a string.",
  }),
  provider: Joi.string().required().messages({
    "any.required": "Provider is required.",
    "string.base": "Provider must be a string.",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required.",
    "string.base": "Email must be a string.",
    "string.email": "Email must be a valid email address.",
  }),
  password: Joi.string().min(6).max(30).messages({
    "string.base": "Password must be a string.",
    "string.min": "Password must be at least {#limit} characters long.",
    "string.max": "Password must be at most {#limit} characters long.",
  }),
}).options({ abortEarly: false });

export const emailValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required.",
    "string.base": "Email must be a string.",
    "string.email": "Email must be a valid email address.",
  }),
}).options({ abortEarly: false });
