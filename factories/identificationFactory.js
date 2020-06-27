const Factory = require('rosie').Factory;
const randomItem = (items) => items[Math.floor(Math.random() * items.length)];
const twoDigitNumber = (number) =>
  number > 0 && number < 10 ? '0' + number : number;

const ID_NUMBER_PREFIX = '12345678';
const ID_TYPE = [
  'International Passport',
  'Driver Licence',
  'National ID Card',
];

const ISSUE_DATE = ['30-11-2015', '17-03-2016', '5-1-2018', '18-5-2019'];
const EXPIRY_DATE = ['30-11-2025', '17-03-2026', '5-1-2028', '18-5-2029'];

module.exports = new Factory()
  .sequence('idNumber', function (id) {
    return `${ID_NUMBER_PREFIX}${twoDigitNumber(id)}`;
  })
  .attr('idType', function () {
    return randomItem(ID_TYPE);
  })
  .sequence('issueDate', function (id) {
    return ISSUE_DATE[id % 4];
  })
  .sequence('expiryDate', function (id) {
    return EXPIRY_DATE[id % 4];
  })
  .attrs({
    createdAt: new Date(),
    updatedAt: new Date(),
  });
