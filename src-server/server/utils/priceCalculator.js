import { DEFAULT_COMMISSION } from '../controllers/CommissionController';

export const VAT = '7.5';

export const priceCalculatorHelper = (
  askingPrice,
  commission = null,
  hireType = 'Auction'
) => {
  const commissionToUse = commission || DEFAULT_COMMISSION;
  let baseCommission;

  const {
    bidsCommission,
    directHireCommission,
    recommendationsCommission,
    handlingPercent,
    handlingPlus,
  } = commissionToUse;

  switch (hireType) {
    case 'Search':
      baseCommission = directHireCommission;
      break;
    case 'Recommendation':
      baseCommission = recommendationsCommission;
      break;
    default:
      baseCommission = bidsCommission;
      break;
  }

  const price = isNaN(parseFloat(askingPrice)) ? 0 : parseFloat(askingPrice);

  const calcCommission = getPercentage(baseCommission) * price;
  const calcVat = getPercentage(VAT) * calcCommission;
  const handling =
    getPercentage(handlingPercent) * price + parseInt(handlingPlus, 10);
  const amountToPay = price - (calcCommission + calcVat + handling);
  const entertainerFee = amountToPay > 0 ? amountToPay : 0;

  return {
    baseCommission,
    calcCommission,
    calcVat,
    entertainerFee,
    handling,
    handlingPercent,
    handlingPlus,
  };
};

export const getPercentage = (value) => parseFloat(value) / 100;
