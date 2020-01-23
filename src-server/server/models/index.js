'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname + '/../config/config.json'))[env];
const db = {};
let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter(function(file) {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach(function(file) {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.User.hasOne(db.EntertainerProfile, { foreignKey: 'userId', as: 'profile' });
db.User.hasOne(db.BankDetail, { foreignKey: 'userId', as: 'bankDetail' });
db.User.hasOne(db.Identification, {
  foreignKey: 'userId',
  as: 'identification',
  targetKey: 'identification',
});

db.User.hasMany(db.User, { foreignKey: 'userId', as: 'bandMembers' });
db.User.hasMany(db.Event, { foreignKey: 'userId', as: 'events' });
db.User.hasMany(db.Contact, {
  foreignKey: 'userId',
  as: 'contacts',
  targetKey: 'contacts',
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
