import { Schema, model } from 'mongoose';

import { emailRegexp, contactTypes } from '../../constants/contactConstants.js';

import { handleMongooseError, setUpdateOptions } from '../hooks.js';

const contactSchema = new Schema({
  name: {
    type: String,
    minLength: 2,
    required: true,
  },
  email: {
    type: String,
    match: emailRegexp,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: contactTypes,
    default: 'other',
    required: true,
  },
}, {versionKey: false, timestamps: true});

contactSchema.post("save", handleMongooseError);

contactSchema.pre("findOneAndUpdate", setUpdateOptions);

contactSchema.post("findOneAndUpdate", handleMongooseError);

const Contact = model('contact', contactSchema);

export default Contact;
