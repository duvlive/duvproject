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
  eventType: required('Event Type'),
  eventDate: stringValidation('Event Date'),
  startTime: required('Start Time'),
  endTime: required('End Time'),
  moreInformation: optionalValidation('Information', 20)
};

export const eventAddressSchema = {
  streetLine1: stringValidation('Street Line 1'),
  streetLine2: stringValidation('Street Line 2'),
  state: required('State'),
  lga: required('Local Government'),
  city: required('City'),
  landmark: optionalValidation('Landmark', 3),
  description: optionalValidation('Description', 20)
};
