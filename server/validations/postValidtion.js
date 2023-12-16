import Joi from "joi";

export const postValidation = Joi.object({
  content: Joi.string().required().min(5).max(150).messages({
    "any.required": "Content is required.",
    "string.base": "Content must be a string.",
    "string.min": "Content must be at least {#limit} characters long.",
    "string.max": "Content must be at most {#limit} characters long.",
  }),
  video: Joi.string().required().messages({
    "any.required": "Video is required.",
    "string.base": "Video must be a string.",
  }),
  user: Joi.string().required().messages({
    "any.required": "User ID is required.",
    "string.base": "User ID must be a string.",
  }),
}).options({ abortEarly: false });
