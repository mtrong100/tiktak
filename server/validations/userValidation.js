import Joi from "joi";

export const userValidation = Joi.object({
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
  email: Joi.string().email().required().messages({
    "any.required": "Email is required.",
    "string.base": "Email must be a string.",
    "string.email": "Email must be a valid email address.",
  }),
  gender: Joi.string().min(1).max(20).messages({
    "string.base": "Gender must be a string.",
    "string.min": "Gender must be at least {#limit} character long.",
    "string.max": "Gender must be at most {#limit} characters long.",
  }),
  city: Joi.string().min(1).max(50).messages({
    "string.base": "City must be a string.",
    "string.min": "City must be at least {#limit} character long.",
    "string.max": "City must be at most {#limit} characters long.",
  }),
  country: Joi.string().min(1).max(50).messages({
    "string.base": "Country must be a string.",
    "string.min": "Country must be at least {#limit} character long.",
    "string.max": "Country must be at most {#limit} characters long.",
  }),
  password: Joi.string().min(6).max(30).required().messages({
    "any.required": "Password is required.",
    "string.base": "Password must be a string.",
    "string.min": "Password must be at least {#limit} characters long.",
    "string.max": "Password must be at most {#limit} characters long.",
  }),
  following: Joi.array().items(Joi.string()).messages({
    "array.base": "Following must be an array.",
  }),
  followers: Joi.array().items(Joi.string()).messages({
    "array.base": "Followers must be an array.",
  }),
}).options({ abortEarly: false });

export const updateUserValidation = Joi.object({
  username: Joi.string().min(3).max(30).messages({
    "string.base": "Username must be a string.",
    "string.min": "Username must be at least {#limit} characters long.",
    "string.max": "Username must be at most {#limit} characters long.",
  }),
  avatar: Joi.string().messages({
    "string.base": "Avatar must be a string.",
  }),
  gender: Joi.string().min(1).max(20).messages({
    "string.base": "Gender must be a string.",
    "string.min": "Gender must be at least {#limit} character long.",
    "string.max": "Gender must be at most {#limit} characters long.",
  }),
  city: Joi.string().min(1).max(50).messages({
    "string.base": "City must be a string.",
    "string.min": "City must be at least {#limit} character long.",
    "string.max": "City must be at most {#limit} characters long.",
  }),
  country: Joi.string().min(1).max(50).messages({
    "string.base": "Country must be a string.",
    "string.min": "Country must be at least {#limit} character long.",
    "string.max": "Country must be at most {#limit} characters long.",
  }),
}).options({ abortEarly: false });
