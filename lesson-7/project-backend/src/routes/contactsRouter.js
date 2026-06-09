import { Router } from 'express';
import { celebrate } from 'celebrate';

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

contactsRouter.get('/', celebrate(getContactsSchema), getContacts);

contactsRouter.get('/:id', celebrate(contactIdSchema), getContactById);

contactsRouter.post(
  '/',
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
