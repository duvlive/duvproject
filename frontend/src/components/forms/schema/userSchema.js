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

const loginSchema = yup.object().shape({
  email,
  password
});

const registerSchema = yup.object().shape({
  email,
  password: strongPassword,
  confirmPassword
});
export { loginSchema, registerSchema };
