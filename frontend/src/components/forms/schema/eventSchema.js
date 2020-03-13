// import * as yup from 'yup';
import {
  required,
  requiredDate,
  stringValidation,
  optionalValidation
} from './schema-helpers';
import { isAfter } from 'date-fns';

/////////////////////////
// Schemas
////////////////////////
export const eventDetailsSchema = {
  eventType: required('Event Type'),
  eventDate: requiredDate('Event Date'),
  startTime: requiredDate('Start Time'),
  eventDuration: required('Event Duration'),
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
