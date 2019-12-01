import UserValidation from './userValidation';
import { userProfileUpdateHelper } from './modelHelper';

const validString = (data) => {
  if(data === null || data === undefined || data.length <= 0) {
    return {
      message: 'field cannot be empty'
    };
  }
  return {}
}

export {
  userProfileUpdateHelper,
  UserValidation,
  validString,
};