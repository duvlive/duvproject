import React from 'react';
import { ENTERTAINER_TYPE, REQUEST_ACTION } from './constants';
import Humanize from 'humanize-plus';
import { VAT, DEFAULT_COMMISSION } from 'utils/constants';

/**
 * Carousel Chunk
 * @param {*} array
 * @param {*} size
 */
export const chunk = (array, size) => {
  const chunked_arr = [];
  let index = 0;
  while (index < array.length) {
    chunked_arr.push(array.slice(index, size + index));
    index += size;
  }
  return chunked_arr;
};

export const commaNumber = (value, prependCurrency = false) => {
  const number = parseInt(value, 10);
  const currency = prependCurrency ? '₦' : '';
  return currency + Humanize.intComma(number);
};

export const moneyFormat = (value) => Humanize.formatNumber(value, 2);
export const moneyFormatInNaira = (value) => commaNumber(value, true);

export const getBudgetRange = (minBudget, maxBudget) => {
  const MAX_BUDGET_OUTPUT = 1000000;
  const suffix = maxBudget > MAX_BUDGET_OUTPUT ? '+' : '';
  const range = `₦${commaNumber(minBudget)} - ₦${commaNumber(
    Humanize.boundedNumber(maxBudget, MAX_BUDGET_OUTPUT)
  )}`;
  return range + suffix;
};

export const twoDigitNumber = (number) =>
  number > 0 && number < 10 ? '0' + number : number;

export const listJsonItems = (items, defaultValue = null) => {
  try {
    const parsedItems = JSON.parse(items);
    if (!parsedItems) return defaultValue;
    if (parsedItems.length <= 1) return parsedItems;
    return parsedItems.join(', ');
  } catch (error) {
    console.log('error', error);
    return defaultValue;
  }
};

/**
 * Item Selection
 * @param {*} items
 */
export const randomItem = (items) =>
  items[Math.floor(Math.random() * items.length)];

export const getItems = (items, end) => {
  if (items == null) return items;
  // The slice() method returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included). The original array will not be modified.
  return items.slice(0, end);
};

export const shuffleItems = (items) => {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
};

/**
 * Slugs
 * @param {*} items
 * @param {*} slug
 */

export const getSlug = (items, slug) =>
  items.filter((item) => item.slug === slug)[0];

export const getOtherSlugs = (items, slug) =>
  items.filter((item) => item.slug !== slug);

export const getRelatedEntertainers = (items, slug, type) =>
  items.filter((item) => item.slug !== slug && item.type === type);

export const range = (start, stop, step = 1) => {
  const len = Math.floor((stop - start) / step) + 1;
  return Array(len)
    .fill()
    .map((_, idx) => start + idx * step);
};
/**
 * Create HTML Markup
 * @param {*} text
 */
export const createMarkup = (text) => ({ __html: text });

export const dashedLowerCase = (text) =>
  text && text.toString().replace(/\s+/g, '-').toLowerCase();

export const selectEntertainerType = () => {
  const select = [];
  for (const property in ENTERTAINER_TYPE) {
    select.push({ value: property, label: ENTERTAINER_TYPE[property] });
  }
  return select;
};

export const getProfileName = ({ firstName, lastName, stageName }) =>
  stageName || firstName + ' ' + lastName;

export const countOccurences = (arr) => {
  const items = arr.reduce((acc, val) => {
    acc[val] = acc[val] === undefined ? 1 : (acc[val] += 1);
    return acc;
  }, {});
  return Object.keys(items).map(
    (name) => items[name] + ' ' + Humanize.pluralize(items[name], name)
  );
};

export const getPercentage = (value) => parseFloat(value) / 100;
export const getNairaSymbol = () => <>&#8358;</>;

export const isDevEnvironment = () =>
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const getProxy = () =>
  isDevEnvironment() ? 'http://localhost:8080' : '';

export const getRequestStatusIcon = (status, rejectedText = null) => {
  switch (status) {
    case REQUEST_ACTION.APPROVED:
    case REQUEST_ACTION.PAID:
      return (
        <div className="text-green">
          <span className="icon icon-ok-circled"></span>
          {status}
        </div>
      );

    case REQUEST_ACTION.INCREMENT:
      return (
        <div className="text-white">
          <span className="icon icon-up-big"></span>
          {status}
        </div>
      );

    case REQUEST_ACTION.EXPIRED:
      return (
        <div className="text-warning">
          <span className="icon icon-dot-circled"></span>
          {status}
        </div>
      );

    case REQUEST_ACTION.REJECTED:
      return (
        <div className="text-red">
          <span className="icon icon-cancel-circled"></span>
          {rejectedText || status}
        </div>
      );

    default:
      return (
        <div className="text-yellow">
          <span className=" text-pending icon icon icon-hourglass"></span>
          {status}
        </div>
      );
  }
};

export const getAverageRatings = (ratings) => {
  if (!ratings || ratings.length === 0) {
    return 0;
  }

  const output = ratings.reduce(
    (acc, rating) => {
      acc.professionalism += rating.professionalism;
      acc.accommodating += rating.accommodating;
      acc.overallTalent += rating.overallTalent;
      acc.recommend += rating.recommend;
      return acc;
    },
    { professionalism: 0, accommodating: 0, overallTalent: 0, recommend: 0 }
  );

  const length = ratings.length;
  return (
    (output.professionalism / length +
      output.accommodating / length +
      output.overallTalent / length +
      output.recommend / length) /
    4
  );
};

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

export const isValidURL = (str) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return !!pattern.test(str);
};

export const generateLink = (link) => {
  if (!link) {
    return '';
  }
  return isValidURL(link) ? (
    <a
      href={link.indexOf('://') === -1 ? `http://${link}` : link}
      rel="noopener noreferrer"
      target="_blank"
      title={link}
    >
      {link}
    </a>
  ) : (
    <>{link}</>
  );
};
