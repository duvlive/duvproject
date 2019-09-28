import * as yup from 'yup';

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

/////////////////////////
// Functions
////////////////////////
const defaultNameValidation = label =>
  yup
    .string()
    .label(label)
    .min(2, `${label} should be more than 2 characters`)
    .required(`${label} is really required`);

const optionalValidation = validation =>
  yup.lazy(value => {
    if (value) {
      return validation;
    }
    return yup.mixed().notRequired();
  });

/////////////////////////
// Objects
////////////////////////
const registerObject = {
  first_name: defaultNameValidation('First Name'),
  last_name: defaultNameValidation('Last Name'),
  phone,
  email,
  password: strongPassword,
  confirm_password: confirmPassword
};

const profileObject = {
  first_name: defaultNameValidation('First Name'),
  last_name: defaultNameValidation('Last Name'),
  phone,
  email,
  location: defaultNameValidation('Location'),
  address: defaultNameValidation('Address')
};

const changePasswordObject = {
  old_password: strongPassword,
  password: strongPassword,
  confirm_password: confirmPassword
};

const personalInfo = {
  first_name: defaultNameValidation('First Name'),
  last_name: defaultNameValidation('Last Name'),
  email,
  phone,
  about: optionalValidation(defaultNameValidation('About'))
};

const registerAsEntertainerObject = {
  ...personalInfo
};

/////////////////////////
// Schema
////////////////////////
export const createSchema = object => {
  return yup.object().shape(object);
};

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
  profileObject,
  profileSchema,
  registerAsEntertainerObject
};
