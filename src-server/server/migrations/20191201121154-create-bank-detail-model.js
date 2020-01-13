module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("BankDetails", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			accountName: {
				type: Sequelize.STRING,
				allowNull: false
			},
			bankName: {
				type: Sequelize.STRING,
				allowNull: false
			},
			accountNumber: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface /*Sequelize*/) => {
		return queryInterface.dropTable("BankDetails");
	}
};
