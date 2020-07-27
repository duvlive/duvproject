import {
  stringValidation,
  positiveNumberValidation,
  percentageValidation,
  required,
} from './schema-helpers';

export const addCommissionObject = {
  title: stringValidation('Title'),
  recommendationsCommission: percentageValidation('Recommendations Commission'),
  directHireCommission: percentageValidation('Direct Hire Commission'),
  bidsCommission: percentageValidation('Bids Commission'),
  handlingPercent: percentageValidation('Handling Percent'),
  handlingPlus: positiveNumberValidation('Handling Plus'),
};

export const assignCommissionObject = {
  commissionId: required('Commissions'),
};
