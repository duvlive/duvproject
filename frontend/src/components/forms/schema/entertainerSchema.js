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
  entertainerType: stringValidation('Entertainer Type'),
  genre: multiSelectValidation('Genre'),
  language: multiSelectValidation('Language'),
  expectedAudienceSize: stringValidation('Audience Size'),
  ageGroup: stringValidation('Age Group'),
  lowestBudget: stringValidation('Base Budget'),
  highestBudget: stringValidation('Highest Budget'),
  placeOfEvent: stringValidation('Place of Event'),
  specialRequest: optionalValidation(stringValidation('Special Request', 20)),
  auctionStartDate: optionalValidation(required('Auction Start Date')),
  auctionEndDate: optionalValidation(required('Auction End Date'))
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
