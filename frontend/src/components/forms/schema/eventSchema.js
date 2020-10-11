import {
  required,
  requiredDate,
  stringValidation,
  optionalValidation,
  minDateValidation,
} from './schema-helpers';

/////////////////////////
// Schemas
////////////////////////
export const eventDetailsSchema = {
  eventType: required('Event Type'),
  eventDate: requiredDate('Event Date'),
  startTime: required('Start Time'),
  eventDuration: required('Event Duration'),
  moreInformation: optionalValidation(stringValidation('More Information', 20)),
};
export const eventAddressSchema = {
  streetLine1: stringValidation('Street Line 1'),
  streetLine2: optionalValidation(stringValidation('Street Line 2', 2)),
  state: required('State'),
  lga: required('Local Government'),
  city: required('City'),
  landmark: optionalValidation(stringValidation('Landmark', 3)),
  description: optionalValidation(stringValidation('Description', 10)),
};

export const reviewSchema = {
  professionalism: required('Professionalism rating'),
  accommodating: required('Accommodating rating'),
  overallTalent: required('Overall Talent rating'),
  recommend: required('Recommend rating'),
  review: optionalValidation(stringValidation('Review', 10)),
};

export const cancelEventSchema = {
  cancelledReason: stringValidation('Reason', 5),
};

export const publicEventSchema = {
  title: stringValidation('Event Name'),
  startTime: minDateValidation('Event Start Date', new Date()),
  endTime: minDateValidation('Event End Date', new Date()),
  organizer: required('Event Organizer'),
  eventLink: required('Event Link'),
  venue: required('Event Venue'),
  location: optionalValidation(stringValidation('Event Address', 2)),
  description: optionalValidation(stringValidation('More Information', 20)),
  city: optionalValidation(stringValidation('City', 2)),
  state: optionalValidation(stringValidation('State', 2)),
};
