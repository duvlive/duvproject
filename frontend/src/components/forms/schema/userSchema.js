import * as yup from 'yup';

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
  .oneOf([yup.ref('password')], 'Passwords must match');

const phone = yup
  .string()
  .label('Phone')
  .required('Phone is required');

const defaultNameValidation = label =>
  yup
    .string()
    .label(label)
    .min(2, `${label} should be more than 2 characters`)
    .required(`${label} is really required`);

const loginSchema = yup.object().shape({
  email,
  password
});

const registerSchema = yup.object().shape({
  firstName: defaultNameValidation('First Name'),
  lastName: defaultNameValidation('Last Name'),
  phone,
  email,
  password: strongPassword,
  confirmPassword
});
export { loginSchema, registerSchema };
