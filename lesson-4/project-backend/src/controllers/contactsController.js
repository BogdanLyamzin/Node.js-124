import createHttpError from 'http-errors';

import Contact from '../db/models/Contact.js';

export const getContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

export const getContactById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findOne(id);
  if (!contact) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }
  res.json(contact);
};

export const addContact = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

export const updateContactById = async (req, res) => {
  const { id } = req.params;
  const updateContact = await Contact.findOneAndUpdate({ _id: id }, req.body, {
    returnDocument: 'after',
  });
  if (!updateContact) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }
  res.json(updateContact);
};

export const deleteContactById = async (req, res) => {
  const { id } = req.params;
  const deleteContact = await Contact.findOneAndDelete({ _id: id });
  if (!deleteContact) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

    res.status(204).send();
  // res.json({
  //   message: "Delete successfully"
  // })
};
