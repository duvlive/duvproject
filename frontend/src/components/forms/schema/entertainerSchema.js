import * as yup from 'yup';
import {
  required,
  stringValidation,
  autocompleteValidation,
  optionalValidation,
  urlValidation,
  multiSelectValidation,
  email,
  phoneNumber,
  positiveNumberValidation,
  requiredDate,
} from './schema-helpers';
import { commaNumber } from 'utils/helpers';
import { isAfter } from 'date-fns';

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
  availableFor: optionalValidation(autocompleteValidation('Available for')),
};

export const bankDetailsSchema = {
  accountName: stringValidation('Account Name'),
  bankName: stringValidation('Bank Name'),
  accountNumber: stringValidation('Account Number'),
};

export const addEntertainerSchema = {
  entertainerType: stringValidation('Entertainer Type'),
  genre: multiSelectValidation('Genre'),
  language: multiSelectValidation('Language'),
  expectedAudienceSize: stringValidation('Audience Size'),
  ageGroup: stringValidation('Age Group'),
  lowestBudget: positiveNumberValidation('Base Budget', 'budget'),
  highestBudget: positiveNumberValidation('Highest Budget', 'budget').moreThan(
    yup.ref('lowestBudget'),
    'Highest Budget should be greater or equal to Base Budget'
  ),
  placeOfEvent: stringValidation('Place of Event'),
  specialRequest: optionalValidation(stringValidation('Special Request', 20)),
  auctionStartDate: optionalValidation(requiredDate('Auction Start Date')),
  auctionEndDate: optionalValidation(
    requiredDate('Auction End Date').test(
      'is-greater',
      'End Date should be greater than Start Date',
      function (value) {
        const { auctionStartDate } = this.parent;
        return isAfter(value.date, auctionStartDate.date);
      }
    )
  ),
};

export const videoSchema = {
  youtubeID: urlValidation('Youtube URL'),
  title: stringValidation('Title'),
};

export const youtubeChannelSchema = {
  youTubeChannel: urlValidation('Youtube Channel URL'),
};

export const emergencyContactSchema = {
  firstName: stringValidation('First Name'),
  lastName: stringValidation('Last Name'),
  phoneNumber,
  email,
  relationship: stringValidation('Relationship'),
};

export const identificationSchema = {
  idType: required('ID Type'),
  idNumber: stringValidation('ID Number'),
  issueDate: required('Issue Date'),
  expiryDate: required('Expiry Date'),
};

export const bidSchema = (minAuctionPrice = 0, maxAuctionPrice = 0) => {
  return {
    askingPrice: positiveNumberValidation('Your Bid')
      .min(
        minAuctionPrice,
        `Your bid must be more than ${commaNumber(minAuctionPrice)}`
      )
      .max(
        maxAuctionPrice,
        `Your bid must be less than ${commaNumber(maxAuctionPrice)}`
      ),
  };
};
