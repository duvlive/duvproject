import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import emailSender from '../MailSender';

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
    username: {
      type: DataTypes.STRING,
      unique: true,
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
    token: {
      type: DataTypes.STRING,
    },
  }, {
    hooks: {
      beforeCreate: (user) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
        user.token = jwt.sign({
          userId: user.id,
          type: user.type,
        }, process.env.SECRET, { expiresIn: 120 });
      },
      afterCreate: (user) => {
        const { email, token } = user;
        emailSender(email, token).catch(console.error);
      },
      beforeUpdate: (user) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
      }
    }
  }, {
    classMethods: {
      associate: (/*models*/) => {
        // associations can be defined here
      }
    }
  });
  return User;
};