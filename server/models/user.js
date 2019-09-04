module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 3,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 3,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 8,
      },
    },
    phoneNumber1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [11, 14],
      }
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: { isIn: [[1, 2, 3]] },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    classMethods: {
      associate: (/*models*/) => {
        // associations can be defined here
      }
    }
  });
  return User;
};