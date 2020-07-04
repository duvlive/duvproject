const Factory = require('rosie').Factory;
const randomItem = (items) => items[Math.floor(Math.random() * items.length)];
const twoDigitNumber = (number) =>
  number > 0 && number < 10 ? '0' + number : number;

const ACCOUNT_NUMBER_PREFIX = '12345678';
const BANK_NAME = [
  'Access Bank',
  'GTBank',
  'Diamond Bank',
  'Polaris',
  'Stanbic IBTC',
  'First Bank',
  'Zenith',
  'FCMB',
];

module.exports = new Factory()
  .sequence('accountNumber', function (id) {
    return `${ACCOUNT_NUMBER_PREFIX}${twoDigitNumber(id)}`;
  })
  .sequence('bankName', function () {
    return randomItem(BANK_NAME);
  })
  .attr('accountName', ['accountName'], function (accountName) {
    return accountName;
  })
  .attrs({
    createdAt: new Date(),
    updatedAt: new Date(),
  });
