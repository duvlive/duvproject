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
  .required('Enter your password again')
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

const registerObject = {
  first_name: defaultNameValidation('First Name'),
  last_name: defaultNameValidation('Last Name'),
  phone,
  email,
  password: strongPassword,
  confirm_password: confirmPassword
};

const registerSchema = yup.object().shape(registerObject);
const forgotPasswordSchema = yup.object().shape({ email });

export { loginSchema, registerSchema, registerObject, forgotPasswordSchema };
