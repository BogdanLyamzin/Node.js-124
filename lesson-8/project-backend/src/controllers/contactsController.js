import createHttpError from 'http-errors';

import Contact from '../db/models/Contact.js';

export const getContacts = async (req, res) => {
  const { _id: userId } = req.user;
  const {
    page = 1,
    perPage = 10,
    sortBy = '_id',
    sortOrder = 'asc',
    type,
    search,
  } = req.query;
  const skip = (page - 1) * perPage;
  const contactsQuery = Contact.find();
  if (userId) {
    contactsQuery.where('userId').equals(userId);
  }
  if (type) {
    contactsQuery.where('type').equals(type);
  }
  if (search) {
    contactsQuery.where({
      $or: [
        {
          name: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          email: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          phone: {
            $regex: search,
            $options: 'i',
          },
        },
      ],
    });
  }

  const [contacts, totalItems] = await Promise.all([
    contactsQuery
      .clone()
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder }),
    contactsQuery.countDocuments(),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  res.json({
    contacts,
    totalItems,
    totalPages,
    page,
    perPage,
  });
};

export const getContactById = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const contact = await Contact.findOne({ _id: id, userId });
  if (!contact) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }
  res.json(contact);
};

export const addContact = async (req, res) => {
  const { _id: userId } = req.user;
  const newContact = await Contact.create({ ...req.body, userId });
  res.status(201).json(newContact);
};

export const updateContactById = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const updateContact = await Contact.findOneAndUpdate(
    { _id: id, userId },
    req.body,
  );
  if (!updateContact) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }
  res.json(updateContact);
};

export const deleteContactById = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const deleteContact = await Contact.findOneAndDelete({ _id: id, userId });
  if (!deleteContact) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.status(204).send();
  // res.json({
  //   message: "Delete successfully"
  // })
};
