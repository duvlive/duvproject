const Factory = require('rosie').Factory;
const ngfaker = require('ng-faker');
const bcrypt = require('bcrypt');

const USER_TYPE = ['admin', 'user', 'entertainer', 'band-member'];
const password = bcrypt.hashSync('123456', bcrypt.genSaltSync(10));

module.exports = new Factory()
  .option('type', 1)
  .option('offset', 0)
  .sequence('email', ['type', 'offset'], function (id, type, offset) {
    return `${USER_TYPE[type]}${id - offset}@gmail.com`;
  })
  .attr('type', ['type'], function (type) {
    return type;
  })
  .attr('referral', function () {
    return Math.random().toString(36).substr(2, 5);
  })
  .sequence('profileImageURL', function (id) {
    return `https://res.cloudinary.com/duvlive/image/upload/v1585938493/entertainers/${id}.jpg`;
  })
  .attrs({
    firstName: function () {
      return ngfaker.name.firstName();
    },
    lastName: function () {
      return ngfaker.name.lastName();
    },
    password: password,
    phoneNumber: '08012345678',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
