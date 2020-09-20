import * as yup from 'yup';
import {
  minDateValidation,
  required,
  stringValidation,
} from './schema-helpers';
import {
  email,
  password,
  strongPassword,
  confirmPassword,
  phoneNumber,
  OptionalPhoneNumber,
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
  agreement,
};

const changePasswordObject = {
  oldPassword: strongPassword,
  password: strongPassword,
  confirmPassword: confirmPassword,
};

const resetPasswordObject = {
  password: strongPassword,
  confirmPassword: confirmPassword,
};

const personalInfoObject = {
  firstName: stringValidation('First Name'),
  lastName: stringValidation('Last Name'),
  phoneNumber,
  phoneNumber2: OptionalPhoneNumber,
};

const referralObject = {
  email,
  recommendAs: stringValidation('Recommend As'),
};

const completeRegistrationObject = {
  phoneNumber,
  password: strongPassword,
  agreement,
};

const newBandMemberObject = {
  firstName: stringValidation('First Name'),
  lastName: stringValidation('Last Name'),
  email,
  bandRole: stringValidation('Band Role'),
};

const bandMemberRegistrationObject = {
  phoneNumber,
  phoneNumber2: OptionalPhoneNumber,
  password: strongPassword,
  confirmPassword: confirmPassword,
  agreement,
};

/////////////////////////
// Schema
////////////////////////
const loginSchema = yup.object().shape({
  email,
  password,
});

const registerSchema = yup.object().shape(registerObject);
const forgotPasswordSchema = yup.object().shape({ email });

export const addGlobalNotificationObject = {
  color: stringValidation('Colour'),
  // entertainerType: required('Entertainer Type'),
  endTime: minDateValidation('Notification End Date', new Date()),
  message: stringValidation('Message'),
  startTime: minDateValidation('Notification Start Date', new Date()),
  userType: required('User Type'),
};

export {
  newBandMemberObject,
  bandMemberRegistrationObject,
  completeRegistrationObject,
  loginSchema,
  registerSchema,
  registerObject,
  forgotPasswordSchema,
  changePasswordObject,
  resetPasswordObject,
  personalInfoObject,
  referralObject,
};
