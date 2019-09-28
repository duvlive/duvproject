import * as yup from 'yup';

export const stringValidation = (label, length = 2) =>
  yup
    .string()
    .trim()
    .label(label)
    .min(length, `${label} should be more than ${length} characters`)
    .required(`${label} is required`);

export const positiveNumberValidation = label =>
  yup
    .number()
    .positive(`${label} must be a positive number`)
    .integer(`${label} must be a number`);

export const yearValidation = label =>
  yup
    .number()
    .positive(`${label} must be a a valid year`)
    .integer(`${label} must be a valid year`);

export const autocompleteValidation = label =>
  yup
    .array()
    .min(3, 'must be more than 2')
    .of(
      yup.object().shape({
        id: yup.number(),
        name: yup.string().required()
      })
    );

export const optionalValidation = validation =>
  yup.lazy(value => {
    if (value) {
      return validation;
    }
    return yup.mixed().notRequired();
  });

export const createSchema = object => {
  return yup.object().shape(object);
};
