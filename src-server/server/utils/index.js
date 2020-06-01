import { format, parse } from 'date-fns';
import { getAll, updateUser } from './modelHelper';
import UserValidation from './userValidation';

const validString = (data) => {
  if (data === null || data === undefined || data.length <= 0) {
    return {
      message: 'field cannot be empty',
    };
  }
  return {};
};

export const moneyFormat = (number) =>
  number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

/**
 * Date and Time
 * @param {*} date
 */
export const getEventDate = (date) => format(parse(date), 'MMM. D (ddd)');
export const getShortDate = (date) => format(parse(date), 'ddd, MMM D, YYYY');
export const getTinyDate = (date) => format(parse(date), 'MMM D, YYYY');
export const getLongDate = (date) => format(parse(date), 'dddd, Do MMMM YYYY');
export const getYear = (date) => format(parse(date), 'YYYY');
export const getTime = (date) => format(parse(date), 'h:mm A');

export { getAll, updateUser, UserValidation, validString };
