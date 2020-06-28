'use strict';
const bankDetailsFactory = require('../../../factories/bankDetailsFactory');
const identificationFactory = require('../../../factories/identificationFactory');
const contactFactory = require('../../../factories/contactFactory');
const randomItem = (items) => items[Math.floor(Math.random() * items.length)];

const YOUTUBE_ID = [
  '-L8hLkg21MQ',
  'KErqMcZR0KA',
  'hYx5ukr_YWw',
  '_Q6Rixmvujc',
  'OC93pNSrRP8',
  'NlyzO7dJ0YY',
  'zUU1bIWpH5c',
  'Ecl8Aod0Tl0',
  'haA7DpK9Z4k',
  'SbHx9Ps7B4g',
];

module.exports = {
  up: async (queryInterface) => {
    const users = await queryInterface.sequelize.query(
      'SELECT * FROM "Users" WHERE type = 2',
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );

    const allBankDetails = [];
    const allIdentifications = [];
    const allContacts = [];
    const allApprovalComments = [];
    const allGalleries = [];
    const allVideos = [];

    users.forEach((user) => {
      allIdentifications.push(
        identificationFactory.build({
          userId: user.id,
        })
      );

      if (user.id <= 18) {
        allBankDetails.push(
          bankDetailsFactory.build({
            userId: user.id,
            accountName: user.firstName + ' ' + user.lastName,
          })
        );
      } else {
        allBankDetails.push({
          userId: user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      if (user.id <= 16) {
        allContacts.push(
          contactFactory.build({
            userId: user.id,
          })
        );
        allGalleries.push({
          userId: user.id,
          imageURL: user.profileImageURL,
          imageID: `linked-profile`,
          approved: user.id <= 7 ? true : null,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        allVideos.push({
          userId: user.id,
          approved: user.id <= 7 ? true : null,
          title: `${user.firstName} ${user.lastName} youtube video`,
          youtubeID: randomItem(YOUTUBE_ID),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      if (user.id <= 16) {
        allApprovalComments.push({
          userId: user.id,
          entertainerProfile: 'YES',
          bankAccount: 'YES',
          contact: 'YES',
          identification: 'YES',
          youTube: 'YES',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } else if (user.id <= 18) {
        allApprovalComments.push({
          userId: user.id,
          entertainerProfile: 'YES',
          bankAccount: 'Fill your bank account',
          contact: 'Fill your contact',
          identification: 'Fill your identification',
          youTube: 'YES',
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } else {
        allApprovalComments.push({
          userId: user.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    });

    await queryInterface.bulkInsert(
      'ApprovalComments',
      allApprovalComments,
      {}
    );
    await queryInterface.bulkInsert('BankDetails', allBankDetails, {});
    await queryInterface.bulkInsert('Contacts', allContacts, {});
    await queryInterface.bulkInsert('Galleries', allGalleries, {});
    await queryInterface.bulkInsert('Identifications', allIdentifications, {});
    return queryInterface.bulkInsert('Videos', allVideos, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('ApprovalComments', null, {});
    await queryInterface.bulkDelete('BankDetails', null, {});
    await queryInterface.bulkDelete('Contacts', null, {});
    await queryInterface.bulkDelete('Galleries', null, {});
    await queryInterface.bulkDelete('Identifications', null, {});
    return queryInterface.bulkDelete('Videos', null, {});
  },
};
