'use strict';
const eventEntertainerFactory = require('../../../factories/eventEntertainerFactory');

module.exports = {
  up: async (queryInterface) => {
    const events = await queryInterface.sequelize.query(
      'SELECT * FROM "Events"',
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );

    const eventEntertainer0 = eventEntertainerFactory.buildList(3, {
      eventId: events[0].id,
      userId: events[0].userId,
    });

    const eventEntertainer1 = eventEntertainerFactory.buildList(2, {
      eventId: events[1].id,
      userId: events[1].userId,
    });

    const eventEntertainer2 = eventEntertainerFactory.buildList(1, {
      eventId: events[2].id,
      userId: events[2].userId,
    });
    const eventEntertainer3 = eventEntertainerFactory.buildList(2, {
      eventId: events[3].id,
      userId: events[3].userId,
    });

    const eventEntertainers = [
      ...eventEntertainer0,
      ...eventEntertainer1,
      ...eventEntertainer2,
      ...eventEntertainer3,
    ];
    return queryInterface.bulkInsert(
      'EventEntertainers',
      eventEntertainers,
      {}
    );
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('EventEntertainers', null, {});
  },
};
