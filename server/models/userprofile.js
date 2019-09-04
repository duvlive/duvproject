module.exports = (sequelize, DataTypes) => {
  const UserProfile = sequelize.define('UserProfile', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stageName: DataTypes.STRING,
    location: DataTypes.TEXT,
    yearsOfExperience: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    funFact: DataTypes.TEXT,
    phoneNumber2: DataTypes.STRING,
    travelAvailability: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    eventInterest: DataTypes.STRING,
    accountName: DataTypes.STRING,
    accountNumber: DataTypes.STRING,
    bank: DataTypes.STRING,
    verifiedEntertainer: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    address: DataTypes.TEXT,
    about: DataTypes.TEXT
  }, {
    classMethods: {
      associate: (models) => {
        UserProfile.belongsTo(models.User, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return UserProfile;
};