import * as yup from 'yup';
import { stringValidation } from './schema-helpers';
import {
  email,
  password,
  strongPassword,
  confirmPassword,
  phoneNumber,
  OptionalPhoneNumber
} from './schema-helpers';

/////////////////////////
// Fields
////////////////////////

const agreement = yup
  .array()
  .of(yup.boolean())
  .required('You must agree with our terms and policy to proceed');

/////////////////////////
// Objects
////////////////////////
const registerObject = {
  firstName: stringValidation('First Name'),
  lastName: stringValidation('Last Name'),
  phoneNumber,
  email,
  password: strongPassword,
  confirmPassword: confirmPassword,
  agreement
};

const profileObject = {
  firstName: stringValidation('First Name'),
  lastName: stringValidation('Last Name'),
  phoneNumber
};

const changePasswordObject = {
  oldPassword: strongPassword,
  password: strongPassword,
  confirmPassword: confirmPassword
};

const resetPasswordObject = {
  password: strongPassword,
  confirmPassword: confirmPassword
};

const personalInfoObject = {
  firstName: stringValidation('First Name'),
  lastName: stringValidation('Last Name'),
  phoneNumber,
  phoneNumber2: OptionalPhoneNumber
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
  resetPasswordObject,
  profileObject,
  profileSchema,
  personalInfoObject
};
