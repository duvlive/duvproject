const Factory = require('rosie').Factory;
const ngfaker = require('ng-faker');

const randomItem = (items) => items[Math.floor(Math.random() * items.length)];

const CONTACTS = [1, 2];

const RELATIONSHIP = [
  'Aunt',
  'Brother',
  'Cousin',
  'Family',
  'Guardian',
  'Husband',
  'Parent',
  'Sibling',
  'Sister',
  'Spouse',
  'Uncle',
  'Wife',
];

module.exports = new Factory()
  .sequence('email', function (id) {
    return `emergency-contact-${id}@gmail.com`;
  })
  .attr('relationship', function () {
    return randomItem(RELATIONSHIP);
  })
  .attr('type', function () {
    return randomItem(CONTACTS);
  })
  .attrs({
    firstName: function () {
      return ngfaker.name.firstName();
    },
    lastName: function () {
      return ngfaker.name.lastName();
    },
    phoneNumber: '08012345678',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
