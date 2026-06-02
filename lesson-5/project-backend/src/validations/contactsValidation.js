import {Joi, Segments} from "celebrate";
import { isValidObjectId } from "mongoose";

import { emailRegexp, contactTypes } from "../constants/contactConstants.js";

export const objectIdValidator = (value, helpers)=> {
  return isValidObjectId(value) ? value : helpers.message("Invalid id format");
}

export const contactIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().custom(objectIdValidator).required()
  })
}

export const createContactSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).required().messages({
      "any.required": "name must be exist",
      "base.string": "name must be string"
    }),
    email: Joi.string().pattern(emailRegexp).required(),
    phone: Joi.string().allow("").required(),
    type: Joi.string().valid(...contactTypes)
  })
}

export const updateContactSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).messages({
      "base.string": "name must be string"
    }),
    email: Joi.string().pattern(emailRegexp),
    phone: Joi.string(),
    type: Joi.string().valid(...contactTypes)
  }).min(1)
}


