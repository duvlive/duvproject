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
  eventDate: required('Event Date'),
  startTime: required('Start Time'),
  endTime: required('End Time'),
  moreInformation: optionalValidation(stringValidation('More Information', 20))
};

export const eventAddressSchema = {
  streetLine1: stringValidation('Street Line 1'),
  streetLine2: optionalValidation(stringValidation('Street Line 2', 2)),
  state: required('State'),
  lga: required('Local Government'),
  city: required('City'),
  landmark: optionalValidation(stringValidation('Landmark', 3)),
  description: optionalValidation(stringValidation('Description', 10))
};
