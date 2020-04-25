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
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter(function (file) {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach(function (file) {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.User.hasOne(db.EntertainerProfile, {
  foreignKey: 'userId',
  as: 'profile',
});

db.User.hasOne(db.BankDetail, {
  foreignKey: 'userId',
  as: 'bankDetail',
});

db.User.hasOne(db.Identification, {
  foreignKey: 'userId',
  as: 'identification',
  targetKey: 'identification',
});

db.User.hasOne(db.ApprovalComment, {
  foreignKey: 'userId',
  as: 'approvalComment',
  targetKey: 'approvalComment',
});

db.Event.hasOne(db.Auction, {
  foreignKey: 'eventId',
  as: 'auction',
  targetKey: 'auction',
});

db.User.hasMany(db.User, {
  foreignKey: 'userId',
  as: 'bandMembers',
});

db.User.hasMany(db.Event, {
  foreignKey: 'userId',
  as: 'events',
});

db.User.hasMany(db.Contact, {
  foreignKey: 'userId',
  as: 'contacts',
  targetKey: 'contacts',
});

db.User.hasMany(db.Gallery, {
  foreignKey: 'userId',
  as: 'galleries',
  onDelete: 'CASCADE',
  hooks: true,
});

db.User.hasMany(db.Application, {
  foreignKey: 'userId',
  as: 'applications',
  targetKey: 'applications',
});

db.User.hasMany(db.Badge, {
  foreignKey: 'userId',
  as: 'badges',
  targetKey: 'badges',
});

db.User.hasMany(db.Video, {
  foreignKey: 'userId',
  as: 'videos',
  onDelete: 'CASCADE',
  hooks: true,
});

db.User.hasMany(db.Notification, {
  foreignKey: 'userId',
  as: 'notifications',
  onDelete: 'CASCADE',
  hooks: true,
});

db.Event.hasMany(db.EventEntertainer, {
  foreignKey: 'eventId',
  as: 'entertainers',
  targetKey: 'entertainers',
});

db.Event.hasMany(db.Application, {
  foreignKey: 'eventId',
  as: 'applications',
  targetKey: 'applications',
});

db.Application.belongsTo(db.User, {
  foreignKey: 'userId',
  as: 'user',
});

db.Application.belongsTo(db.Event, {
  foreignKey: 'eventId',
  as: 'event',
});

db.Application.belongsTo(db.EventEntertainer, {
  foreignKey: 'eventEntertainerId',
  as: 'eventEntertainerInfo',
});

db.Application.belongsTo(db.Commission, {
  foreignKey: 'commissionId',
  as: 'commission',
});

db.EventEntertainer.hasMany(db.Application, {
  foreignKey: 'eventEntertainerId',
  as: 'applications',
});

db.Event.belongsTo(db.User, {
  foreignKey: 'userId',
  as: 'owner',
});

db.EventEntertainer.belongsTo(db.EntertainerProfile, {
  foreignKey: 'hiredEntertainer',
  as: 'entertainer',
});

db.EventEntertainer.belongsTo(db.User, {
  foreignKey: 'userId',
  as: 'user',
});

db.EventEntertainer.belongsTo(db.Event, {
  foreignKey: 'eventId',
  as: 'event',
});

db.EntertainerProfile.belongsTo(db.User, {
  foreignKey: 'userId',
  as: 'personalDetails',
});

db.Rating.belongsTo(db.User, {
  foreignKey: 'userId',
  as: 'rater',
});

db.User.hasMany(db.Rating, {
  foreignKey: 'userId',
  as: 'ratings',
});

db.Review.belongsTo(db.Rating, {
  foreignKey: 'ratingId',
  as: 'rating',
});

db.Rating.hasMany(db.Review, {
  foreignKey: 'ratingId',
  as: 'reviews',
});

db.Review.belongsTo(db.User, {
  foreignKey: 'userId',
  as: 'reviewer',
});

db.User.hasMany(db.Review, {
  foreignKey: 'userId',
  as: 'reviews',
});

db.EntertainerProfile.hasMany(db.Review, {
  foreignKey: 'entertainerId',
  as: 'reviewed',
});

db.Review.belongsTo(db.EntertainerProfile, {
  foreignKey: 'entertainerId',
  as: 'entertainerDetail',
});

db.EntertainerProfile.hasMany(db.Rating, {
  foreignKey: 'entertainerId',
  as: 'ratings',
});

db.Rating.belongsTo(db.EntertainerProfile, {
  foreignKey: 'entertainerId',
  as: 'rated',
});

db.EventEntertainer.hasOne(db.Rating, {
  foreignKey: 'eventEntertainerId',
  as: 'eventRating',
});

db.Rating.belongsTo(db.EventEntertainer, {
  foreignKey: 'eventEntertainerId',
  as: 'ratedEvent',
});

db.Event.hasOne(db.Review, {
  foreignKey: 'eventId',
  as: 'eventReview',
});

db.Review.belongsTo(db.Event, {
  foreignKey: 'eventId',
  as: 'reviewedEvent',
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
