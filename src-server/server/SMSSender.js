/* eslint-disable no-console */
import axios from 'axios';
export const KUDI_SMS_API = 'https://account.kudisms.net/api/';
export const SENDER = 'DUV LIVE';

export const convertToValidSMSPhoneNumber = (phone) => {
  // remove all spaces
  // remove +
  let convertedPhoneNumber = phone.replace(/[^0-9]/g, '');
  // convert 07 and 08 to 234
  const phoneFirstTwoChars = convertedPhoneNumber.substring(0, 2);
  if (phoneFirstTwoChars === '07' || phoneFirstTwoChars === '08') {
    convertedPhoneNumber = convertedPhoneNumber.replace(/^.{1}/g, '234');
  }
  // return valid number
  return convertedPhoneNumber.length === 13 ? convertedPhoneNumber : phone;
};

export const sendSMS = async ({ message, phone }) => {
  const phoneNumber = convertToValidSMSPhoneNumber(phone);

  await axios.post(
    `${KUDI_SMS_API}?username=${process.env.REACT_APP_SMS_USERNAME}&password=${process.env.REACT_APP_SMS_PASSWORD}&message=${message}&sender=${SENDER}&mobiles=${phoneNumber}`
  );
};

// SMS CONTENT CAN BE FOUND HERE
// https://docs.google.com/spreadsheets/d/1qV1qHePqdJbG5DI8-REKXZGvF4-YHuk3cU_vjjRtXMY/edit#gid=0
