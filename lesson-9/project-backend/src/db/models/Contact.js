import { Schema, model } from 'mongoose';

import { contactTypes } from '../../constants/contactConstants.js';
import { emailRegexp } from '../../constants/index.js';

import { handleMongooseError, setUpdateOptions } from '../hooks.js';

const contactSchema = new Schema(
  {
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
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

contactSchema.post('save', handleMongooseError);

contactSchema.pre('findOneAndUpdate', setUpdateOptions);

contactSchema.post('findOneAndUpdate', handleMongooseError);

export const contactSortFields = [
  'name',
  'email',
  'phone',
  'type',
  'createdAt',
  'updatedAt',
];

const Contact = model('contact', contactSchema);

export default Contact;
