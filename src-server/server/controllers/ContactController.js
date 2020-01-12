import { Contact, User } from '../models';
import { validString, updateUser } from '../utils';
import { request } from 'http';

const ContactController = {
  /**
   * create Contact
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  updateUserContact(req, res) {
    const { userId } = req.decoded;
    const { firstName, lastName, email, phoneNumber, relationship, contactId } = req.body;

    const error = {...validString(firstName),
      ...validString(lastName),
      ...validString(email),
      ...validString(phoneNumber),
      ...validString(relationship),
    };
    if(Object.keys(error).length > 1 ) {
      return res.status(400).json({ message: error.message.join('')});
    }
    if(!contactId) {
      return Contact.create({ firstName, lastName, email, phoneNumber, relationship, userId: req.user.id })
      .then((contact) => {
        return req.user.addContact(contact)
      })
      .then(contact => {
        return res.status(200).json({
          message: 'Contact added successfully',
          contact,
      }).catch(e => {
        console.log(e.message)
      })
    })
  }
    return req.user.getContacts({ where: {id: contactId }})
    .then((contacts) => {
      if(contacts && contacts.length > 0) {
        return contacts[0].update({ firstName, lastName, email, phoneNumber, relationship })
      }
     throw `No contact with id ${contactId}`;
    })
    .then((contact) => {
      return res.status(200).json({
        message: 'Contact updated successfully',
        contact,
    });
  })
  .catch((error) => {
    const status = error.status || 500;
    const errorMessage = error.message || error;
    return res.status(status).json({ message: errorMessage});
  });
},
  /**
   * get Contact
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  getUserContact(req,res) {
    req.user.getContacts()
    .then((contact) => {
      if(!contact || contact.length === 0) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      return res.status(200).json({ contact});
    })
  },
};

export default ContactController;
