'use strict';
const eventFactory = require('../../../factories/eventFactory');
const NUMBER = require('../seed.constants');

module.exports = {
  up: async (queryInterface) => {
    const user = await queryInterface.sequelize.query(
      'SELECT id FROM "Users" WHERE email = ? ',
      {
        replacements: ['user1@gmail.com'],
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );
    const events = eventFactory.buildList(NUMBER.EVENTS, {
      userId: user[0].id,
    });
    return queryInterface.bulkInsert('Events', events, {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Events', null, {});
  },
};
