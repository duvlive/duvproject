'use strict';

module.exports = {
	up: async function(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.addColumn(
				'UserProfiles',
				'about',
				{
					type: Sequelize.STRING,
					allowNull: true
				},
				{ transaction }
			);

			await queryInterface.addColumn(
				'UserProfiles',
				'stageName',
				{
					type: Sequelize.STRING,
					allowNull: true,
					unique: true
				},
				{ transaction }
			);

			await queryInterface.addColumn(
				'UserProfiles',
				'location',
				{
					type: Sequelize.STRING,
					allowNull: true
				},
				{ transaction }
			);

			await queryInterface.addColumn(
				'UserProfiles',
				'yearStarted',
				{
					type: Sequelize.STRING,
					allowNull: true
				},
				{ transaction }
			);

			await queryInterface.addColumn(
				'UserProfiles',
				'willingToTravel',
				{
					type: Sequelize.BOOLEAN,
					allowNull: false,
					defaultValue: false
				},
				{ transaction }
			);

			await queryInterface.addColumn(
				'UserProfiles',
				'eventType',
				{
					type: Sequelize.STRING,
					allowNull: true
				},
				{ transaction }
			);

			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	},

	down: async function(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.removeColumn('UserProfiles', 'about', {
				transaction
			});
			await queryInterface.removeColumn('UserProfiles', 'stageName', {
				transaction
			});
			await queryInterface.removeColumn('UserProfiles', 'location', {
				transaction
			});
			await queryInterface.removeColumn('UserProfiles', 'yearStarted', {
				transaction
			});
			await queryInterface.removeColumn('UserProfiles', 'willingToTravel', {
				transaction
			});
			await queryInterface.removeColumn('UserProfiles', 'eventType', {
				transaction
			});
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	}
};
