// src-server/scripts/fixSmsBalance.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: { ssl: process.env.DB_SSL === 'true' },
  logging: false,
});

(async () => {
  try {
    console.log('Checking for SmsBalances table/type conflicts...');

    // Drop table first if it exists
    console.log('🗑 Attempting to drop table "SmsBalances"...');
    await sequelize.query('DROP TABLE IF EXISTS "SmsBalances" CASCADE;');

    // Then drop any leftover type definition
    console.log(' Attempting to drop type "SmsBalances"...');
    await sequelize.query('DROP TYPE IF EXISTS "SmsBalances" CASCADE;');

    console.log(' SmsBalances table and type cleanup completed successfully.');
  } catch (err) {
    console.error(' Failed to fix SmsBalances:', err);
  } finally {
    await sequelize.close();
  }
})();
