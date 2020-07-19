import {
  stringValidation,
  optionalValidation,
  required,
} from './schema-helpers';

export const addBadgeObject = {
  title: stringValidation('Title'),
  color: stringValidation('Colour'),
  description: optionalValidation(stringValidation('Description')),
};
export const assignBadgeObject = {
  badgeId: required('Badges'),
};
