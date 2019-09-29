// import * as yup from 'yup';
import {
  required,
  stringValidation,
  optionalValidation
} from './schema-helpers';

/////////////////////////
// Objects
////////////////////////
const eventDetailsObject = {
  type: stringValidation('Event Type'),
  date: stringValidation('Event Date'),
  start_time: required('Start Time'),
  end_time: required('End Time'),
  information: optionalValidation('Information', 20)
};

export { eventDetailsObject };
