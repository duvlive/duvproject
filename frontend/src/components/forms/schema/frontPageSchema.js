import { stringValidation, email, OptionalPhoneNumber } from './schema-helpers';

export const contactUsSchema = {
  fullName: stringValidation('Full Name'),
  phone: OptionalPhoneNumber,
  userEmail: email,
  userSubject: stringValidation('Subject', 10),
  userMessage: stringValidation('Message', 20),
};

export const faqSchema = {
  userEmail: email,
  userSubject: stringValidation('Subject', 10),
  userMessage: stringValidation('Your Question', 20),
};
