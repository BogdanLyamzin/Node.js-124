import { Router } from 'express';
import { celebrate } from 'celebrate';

import authenticate from '../middlewares/authenticate.js';
import upload from '../middlewares/upload.js';

import {
  getContacts,
  getContactById,
  addContact,
  updateContactById,
  deleteContactById,
} from '../controllers/contactsController.js';

import {
  getContactsSchema,
  contactIdSchema,
  createContactSchema,
  updateContactSchema,
} from '../validations/contactsValidation.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', celebrate(getContactsSchema), getContacts);

contactsRouter.get('/:id', celebrate(contactIdSchema), getContactById);

// upload.fields([
//   {
//     name: "mainPhoto",
//     maxCount: 1
//   },
//     {
//     name: "additionalPhoto",
//     maxCount: 5
//   },
// ])
// upload.array("photo", 8);
contactsRouter.post(
  '/',
  upload.single("photo"),
  celebrate(createContactSchema, { abortEarly: false }),
  addContact,
);

contactsRouter.patch(
  '/:id',
  celebrate(contactIdSchema),
  celebrate(updateContactSchema, { abortEarly: false }),
  updateContactById,
);

contactsRouter.delete('/:id', celebrate(contactIdSchema), deleteContactById);

export default contactsRouter;
