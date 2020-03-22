import UserValidation from './userValidation';
import { updateUser } from './modelHelper';

const validString = data => {
  if (data === null || data === undefined || data.length <= 0) {
    return {
      message: 'field cannot be empty'
    };
  }
  return {};
};

export const moneyFormat = number =>
  number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

export { updateUser, UserValidation, validString };
