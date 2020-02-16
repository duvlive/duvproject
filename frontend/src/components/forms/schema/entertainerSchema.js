import {
  required,
  stringValidation,
  autocompleteValidation,
  optionalValidation,
  urlValidation,
  multiSelectValidation,
  email,
  phoneNumber
} from './schema-helpers';

/////////////////////////
// Schema
////////////////////////
export const entertainerDetailsSchema = {
  about: optionalValidation(stringValidation('About', 20)),
  stageName: stringValidation('Stage Name'),
  location: stringValidation('Location'),
  entertainerType: stringValidation('Entertainer Type'),
  city: required('City'),
  baseCharges: required('Base Charges'),
  preferredCharges: required('Preferred Charges'),
  yearStarted: required('Started Year'),
  willingToTravel: stringValidation('Willing to travel'),
  availableFor: optionalValidation(autocompleteValidation('Available for'))
};

export const bankDetailsSchema = {
  accountName: stringValidation('Account Name'),
  bankName: stringValidation('Bank Name'),
  accountNumber: stringValidation('Account Number')
};

export const addEntertainerSchema = {
  type: stringValidation('Entertainer Type'),
  event_type: stringValidation('Event Type'),
  genre: multiSelectValidation('Genre'),
  language: multiSelectValidation('Language'),
  audience: stringValidation('audience'),
  age_group: stringValidation('Age Group'),
  base_budget: stringValidation('Lowest Budget'),
  highest_budget: stringValidation('Highest Budget'),
  place: stringValidation('Place of Event'),
  special_events: optionalValidation(stringValidation('Special Events', 20))
};

export const videoSchema = {
  youtubeID: urlValidation('Youtube URL'),
  title: stringValidation('Title')
};

export const youtubeChannelSchema = {
  youTubeChannel: urlValidation('Youtube Channel URL')
};

export const emergencyContactSchema = {
  firstName: stringValidation('First Name'),
  lastName: stringValidation('Last Name'),
  phoneNumber,
  email,
  relationship: stringValidation('Relationship')
};

export const identificationSchema = {
  idType: required('ID Type'),
  idNumber: stringValidation('ID Number'),
  issueDate: required('Issue Date'),
  expiryDate: required('Expiry Date')
};
