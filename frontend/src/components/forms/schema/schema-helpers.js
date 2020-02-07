import * as yup from 'yup';

export const required = label => yup.string().required(`${label} is required`);

export const optionalValidation = validation =>
  yup.lazy(value => {
    if (value) {
      return validation;
    }
    return yup.mixed().notRequired();
  });

export const stringValidation = (label, length = 2) =>
  yup
    .string()
    .trim()
    .label(label)
    .min(length, `${label} should be more than ${length} characters`)
    .required(`${label} is required`);

export const email = yup
  .string()
  .label('Email')
  .email('Seems like an invalid email address')
  .required('Email is required');

export const password = yup
  .string()
  .label('Password')
  .required('Password is required');

export const strongPassword = password.min(6, 'Seems a bit short...');

export const confirmPassword = yup
  .string()
  .label('Confirm Password')
  .required('Enter your password again')
  .oneOf([yup.ref('password')], 'Passwords must match');

export const phoneNumber = yup
  .string()
  .label('Phone')
  .required('Phone is required');

export const OptionalPhoneNumber = optionalValidation(phoneNumber);

export const positiveNumberValidation = label =>
  yup
    .number()
    .positive(`${label} must be a positive number`)
    .integer(`${label} must be a number`);

export const yearValidation = label =>
  yup
    .number(`${label} must be a number`)
    .positive(`${label} must be a valid year`)
    .integer(`${label} must be a valid year`);

export const minDateValidation = (label, minDate) =>
  yup
    .date(`${label} must be a a valid date`)
    .min(minDate, `${label} must be greater than ${minDate}`);

export const autocompleteValidation = (label, minSelection = 2) =>
  yup
    .array()
    .min(minSelection, `Kindly select ${minSelection} or more items`)
    .of(
      yup.object().shape({
        id: yup.number(),
        name: yup.string().required()
      })
    );

export const urlValidation = label =>
  yup
    .string()
    .label(label)
    .url('Must be a valid url')
    .required(`${label} is required`);

export const createSchema = object => {
  return yup.object().shape(object);
};

export const multiSelectValidation = label =>
  yup
    .array()
    .label(label)
    .min(1, 'Tip: you can select more than one state.')
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required()
      })
    );
