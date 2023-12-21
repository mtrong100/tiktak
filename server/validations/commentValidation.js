import Joi from "joi";

export const commentValidation = Joi.object({
  content: Joi.string().required().min(1).max(500).messages({
    "any.required": "Content is required.",
    "string.base": "Content must be a string.",
    "string.min": "Content must be at least {#limit} characters long.",
    "string.max": "Content must be at most {#limit} characters long.",
  }),
  image: Joi.string().messages({
    "string.base": "Image must be a string.",
  }),
  user: Joi.string().required().messages({
    "any.required": "User ID is required.",
    "string.base": "User ID must be a string.",
  }),
  post: Joi.string().required().messages({
    "any.required": "Post ID is required.",
    "string.base": "Post ID must be a string.",
  }),
}).options({ abortEarly: false });

export const updateCommmentValidation = Joi.object({
  content: Joi.string().required().min(1).max(500).messages({
    "any.required": "Content is required.",
    "string.base": "Content must be a string.",
    "string.min": "Content must be at least {#limit} characters long.",
    "string.max": "Content must be at most {#limit} characters long.",
  }),
  image: Joi.string().messages({
    "string.base": "Image must be a string.",
  }),
}).options({ abortEarly: false });
