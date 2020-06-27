'use strict';
const bankDetailsFactory = require('../../../factories/bankDetailsFactory');
const identificationFactory = require('../../../factories/identificationFactory');
const contactFactory = require('../../../factories/contactFactory');

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

    await queryInterface.bulkInsert('BankDetails', allBankDetails, {});
    await queryInterface.bulkInsert('Contacts', allContacts, {});
    await queryInterface.bulkInsert(
      'ApprovalComments',
      allApprovalComments,
      {}
    );
    return queryInterface.bulkInsert('Identifications', allIdentifications, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('BankDetails', null, {});
    await queryInterface.bulkDelete('Contacts', null, {});
    await queryInterface.bulkDelete('ApprovalComments', null, {});
    return queryInterface.bulkDelete('Identifications', null, {});
  },
};
