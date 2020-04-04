'use strict';
const userFactory = require('../../../factories/userFactory');

var user = userFactory.buildList(2);
var entertainer = userFactory.buildList(18, {}, { type: 2, offset: 2 });
var admin = userFactory.buildList(2, {}, { type: 0, offset: 20 });
var bandMembers = userFactory.buildList(2, {}, { type: 3, offset: 22 });

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
