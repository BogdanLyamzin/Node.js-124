import {Joi, Segments} from "celebrate";
import { isValidObjectId } from "mongoose";

import { contactTypes } from "../constants/contactConstants.js";
import {emailRegexp} from "../constants/index.js";
import { contactSortFields } from "../db/models/Contact.js";

export const objectIdValidator = (value, helpers)=> {
  return isValidObjectId(value) ? value : helpers.message("Invalid id format");
}

export const contactIdSchema = {
  [Segments.PARAMS]: Joi.object({
    id: Joi.string().custom(objectIdValidator).required()
  })
}

export const getContactsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(1).default(10),
    sortBy: Joi.string().valid(...contactSortFields).default("_id"),
    sortOrder: Joi.string().valid("asc", "desc").default("asc"),
    type: Joi.string().valid(...contactTypes),
    search: Joi.string(),
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


