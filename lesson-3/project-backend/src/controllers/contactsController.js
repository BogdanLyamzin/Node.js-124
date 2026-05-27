import createHttpError from 'http-errors';

import Contact from '../db/models/Contact.js';

export const getContacts = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

export const getContactById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  // const contact = await Contact.findOne({_id: id});
  if (!contact) {
    throw createHttpError(404, `Contact with id=${id} not found`);
    // const error = new Error(`Contact with id=${id} not found`);
    // error.status = 404;
    // throw error;
    // return res.status(404).json({
    //   message: `Contact with id=${id} not found`
    // });
  }
  res.json(contact);
};
