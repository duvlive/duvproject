'use strict';
const entertainerFactory = require('../../../factories/entertainerProfileFactory');
const NUMBER = require('../seed.constants');

module.exports = {
  up: async (queryInterface) => {
    const entertainer = await queryInterface.sequelize.query(
      'SELECT id FROM "Users" WHERE email = ? ',
      {
        replacements: ['entertainer1@gmail.com'],
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );
    const entertainers = entertainerFactory.buildList(
      NUMBER.ENTERTAINERS,
      {},
      { offset: entertainer[0].id }
    );
    return queryInterface.bulkInsert('EntertainerProfiles', entertainers, {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('EntertainerProfiles', null, {});
  },
};
