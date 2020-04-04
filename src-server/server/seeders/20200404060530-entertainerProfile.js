'use strict';
const entertainerFactory = require('../../../factories/entertainerProfileFactory');

module.exports = {
  up: async (queryInterface) => {
    const userId = await queryInterface.sequelize.query(
      'SELECT id FROM "Users" WHERE email = ? ',
      {
        replacements: ['entertainer1@gmail.com'],
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );
    const entertainers = entertainerFactory.buildList(
      18,
      {},
      { offset: userId[0].id }
    );
    return queryInterface.bulkInsert('EntertainerProfiles', entertainers, {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('EntertainerProfiles', null, {});
  },
};
