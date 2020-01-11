import * as yup from 'yup';
import { stringValidation, optionalValidation } from './schema-helpers';
// import { entertainerDetailsObject } from './entertainerSchema';
/////////////////////////
// Fields
////////////////////////

const email = yup
  .string()
  .label('Email')
  .email('Seems like an invalid email address')
  .required('Email is required');

const password = yup
  .string()
  .label('Password')
  .required('Password is required');

const strongPassword = password.min(6, 'Seems a bit short...');

const confirmPassword = yup
  .string()
  .label('Confirm Password')
  .required('Enter your password again')
  .oneOf([yup.ref('password')], 'Passwords must match');

const phone = yup
  .string()
  .label('Phone')
  .required('Phone is required');

const agreement = yup
  .bool()
  .required('You must agree with our terms and policy to proceed')
  .oneOf([true], 'You must agree with our terms and policy to proceed');

/////////////////////////
// Objects
////////////////////////
const registerObject = {
  firstName: stringValidation('First Name'),
  lastName: stringValidation('Last Name'),
  phone,
  email,
  password: strongPassword,
  confirmPassword: confirmPassword,
  agreement
};

const profileObject = {
  first_name: stringValidation('First Name'),
  last_name: stringValidation('Last Name'),
  phone,
  email,
  location: stringValidation('Location'),
  address: stringValidation('Address')
};

const changePasswordObject = {
  old_password: strongPassword,
  password: strongPassword,
  confirm_password: confirmPassword
};

const changePasswordByEmailObject = {
  password: strongPassword,
  confirm_password: confirmPassword
};

const personalInfoObject = {
  first_name: stringValidation('First Name'),
  last_name: stringValidation('Last Name'),
  email,
  phone,
  about: optionalValidation(stringValidation('About', 20))
};

/////////////////////////
// Schema
////////////////////////
const loginSchema = yup.object().shape({
  email,
  password
});

const registerSchema = yup.object().shape(registerObject);
const profileSchema = yup.object().shape(profileObject);
const forgotPasswordSchema = yup.object().shape({ email });

export {
  loginSchema,
  registerSchema,
  registerObject,
  forgotPasswordSchema,
  changePasswordObject,
  changePasswordByEmailObject,
  profileObject,
  profileSchema,
  personalInfoObject
};
