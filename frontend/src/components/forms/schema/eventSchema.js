// import * as yup from 'yup';
import {
  required,
  stringValidation,
  optionalValidation
} from './schema-helpers';

/////////////////////////
// Schemas
////////////////////////
export const eventDetailsSchema = {
  type: required('Event Type'),
  date: stringValidation('Event Date'),
  start_time: required('Start Time'),
  end_time: required('End Time'),
  information: optionalValidation('Information', 20)
};

export const eventAddressSchema = {
  street_line_1: stringValidation('Street Line 1'),
  street_line_2: stringValidation('Street Line 2'),
  state: required('State'),
  lga: required('Local Government'),
  city: required('City'),
  landmark: optionalValidation('Landmark', 3),
  description: optionalValidation('Description', 20)
};
