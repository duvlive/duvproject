import {
  stringValidation,
  email,
  phoneNumber,
  optionalValidation
} from './schema-helpers';

export const contactUsSchema = {
  fullName: stringValidation('Full Name'),
  phoneNumber: optionalValidation(phoneNumber),
  email,
  subject: stringValidation('Subject', 10),
  message: stringValidation('Message', 20)
};
