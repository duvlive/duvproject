module.exports = {
	up: async function(queryInterface, Sequelize) {
		const transaction = await queryInterface.sequelize.transaction();
		try {
			await queryInterface.addColumn(
				"UserProfiles",
				"youTubeChannel",
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
			await queryInterface.removeColumn("UserProfiles", "youTubeChannel", {
				transaction
			});
			await transaction.commit();
		} catch (err) {
			await transaction.rollback();
			throw err;
		}
	}
};
