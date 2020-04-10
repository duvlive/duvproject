'use strict';
const userFactory = require('../../../factories/userFactory');
const NUMBER = require('../seed.constants');

var user = userFactory.buildList(NUMBER.USERS);
var entertainer = userFactory.buildList(
  NUMBER.ENTERTAINERS,
  {},
  { type: 2, offset: NUMBER.USERS }
);
var admin = userFactory.buildList(
  NUMBER.ADMINS,
  {},
  { type: 0, offset: NUMBER.USERS + NUMBER.ENTERTAINERS }
);
var bandMembers = userFactory.buildList(
  NUMBER.BAND_MEMBERS,
  {},
  { type: 3, offset: NUMBER.USERS + NUMBER.ENTERTAINERS + NUMBER.ADMINS }
);

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'Users',
      [...user, ...entertainer, ...admin, ...bandMembers],
      {}
    );
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
