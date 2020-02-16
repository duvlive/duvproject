import { Contact } from '../models';
import { validString } from '../utils';

const ContactController = {
  /**
   * create Contact
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  updateUserContact(req, res) {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      type,
      relationship,
      contactId
    } = req.body;

    const error = {
      ...validString(firstName),
      ...validString(lastName),
      ...validString(email),
      ...validString(phoneNumber),
      ...validString(relationship)
    };
    if (Object.keys(error).length > 1) {
      return res.status(400).json({ message: error.message.join('') });
    }
    let newContact = {};
    if (!contactId) {
      return Contact.create({
        firstName,
        lastName,
        email,
        type,
        phoneNumber,
        relationship,
        userId: req.user.id
      })
        .then(contact => {
          newContact = contact;
          return req.user.addContact(contact);
        })
        .then(() => {
          return res.status(200).json({
            message: 'Contact added successfully',
            contact: newContact
          });
        })
        .catch(error => {
          const status = error.status || 500;
          const errorMessage =
            (error.parent && error.parent.detail) || error.message || error;
          return res.status(status).json({ message: errorMessage });
        });
    }
    return req.user
      .getContacts({ where: { id: contactId } })
      .then(contacts => {
        if (contacts && contacts.length > 0) {
          return contacts[0].update({
            firstName,
            lastName,
            email,
            phoneNumber,
            relationship
          });
        }
        throw `No contact with id ${contactId}`;
      })
      .then(contact => {
        return res.status(200).json({
          message: 'Contact updated successfully',
          contact
        });
      })
      .catch(error => {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  /**
   * get Contact
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getUserContacts(req, res) {
    req.user.getContacts().then(contacts => {
      if (!contacts || contacts.length === 0) {
        return res.status(404).json({ message: 'Contacts not found' });
      }
      return res.status(200).json({ contacts });
    });
  }
};

export default ContactController;
