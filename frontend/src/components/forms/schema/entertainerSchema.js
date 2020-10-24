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
  moneyRange,
  requiredDate,
} from './schema-helpers';
import { commaNumber } from 'utils/helpers';
import { isAfter } from 'date-fns';
import { HIRE_ENTERTAINERS_TYPE, REQUEST_ACTION } from 'utils/constants';

/////////////////////////
// Schema
////////////////////////
export const entertainerDetailsSchema = {
  about: optionalValidation(stringValidation('About', 20)),
  stageName: stringValidation('Stage Name'),
  location: stringValidation('Location'),
  entertainerType: stringValidation('Entertainer Type'),
  city: required('City'),
  baseCharges: required('Minimum Charges'),
  preferredCharges: optionalValidation(required('Preferred Charge')),
  yearStarted: required('Started Year'),
  willingToTravel: stringValidation('Willing to travel'),
  availableFor: optionalValidation(autocompleteValidation('Available for')),
};

export const bankDetailsSchema = {
  accountName: stringValidation('Account Name'),
  bankName: stringValidation('Bank Name'),
  accountNumber: stringValidation('Account Number'),
};

export const addEntertainerSchema = (type, entertainer) => {
  const baseCharges =
    entertainer && entertainer.baseCharges ? entertainer.baseCharges : 10000;
  const preferredCharges =
    entertainer && entertainer.preferredCharges
      ? entertainer.preferredCharges
      : 1000000;

  let currentSchema = {
    genre: multiSelectValidation('Genre'),
    language: multiSelectValidation('Language'),
    expectedAudienceSize: stringValidation('Audience Size'),
    ageGroup: stringValidation('Age Group'),
    placeOfEvent: stringValidation('Place of Event'),
    specialRequest: optionalValidation(stringValidation('Special Request', 20)),
  };

  if (type !== HIRE_ENTERTAINERS_TYPE.auction.title.toLowerCase()) {
    currentSchema.askingPrice = moneyRange(
      'Your Offer',
      'offer',
      baseCharges,
      preferredCharges
    );
  } else {
    currentSchema = {
      ...currentSchema,
      entertainerType: stringValidation('Entertainer Type'),
      lowestBudget: positiveNumberValidation('Base Budget', 'budget'),
      highestBudget: positiveNumberValidation(
        'Highest Budget',
        'budget'
      ).moreThan(
        yup.ref('lowestBudget'),
        'Highest Budget should be greater than the Base Budget'
      ),
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
  }

  return currentSchema;
};

export const recommendEntertainerSchema = {
  approved: optionalValidation(stringValidation('Approved')),
  entertainerType: stringValidation('Entertainer Type'),
  language: multiSelectValidation('Language'),
  location: optionalValidation(stringValidation('Location')),
  lowestBudget: optionalValidation(
    positiveNumberValidation('Base Charge', 'budget')
  ),
  highestBudget: optionalValidation(
    positiveNumberValidation('Preferred Charges', 'budget').moreThan(
      yup.ref('lowestBudget'),
      'Highest Budget should be greater than the Base Budget'
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

export const entertainerCommentSchema = {
  comments: required('Comments'),
};

export const bidSchema = (minAuctionPrice = 0, maxAuctionPrice = 0) => {
  return {
    askingPrice: positiveNumberValidation('Your Bid')
      .min(
        minAuctionPrice,
        `Your bid must be more than ₦${commaNumber(minAuctionPrice)}`
      )
      .max(
        maxAuctionPrice,
        `Your bid must be less than ₦${commaNumber(maxAuctionPrice)}`
      ),
  };
};

export const requestSchema = (activeType, askingPrice = 0) => {
  let schema = {
    rejectionReason: optionalValidation(stringValidation('Reason')),
  };

  if (activeType === REQUEST_ACTION.INCREMENT) {
    schema['proposedPrice'] = moneyRange(
      'Your Proposed Fee',
      'number',
      askingPrice
    );
  }
  return schema;
};
