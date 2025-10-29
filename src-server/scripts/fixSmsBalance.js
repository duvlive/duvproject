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

    // Check if the type or table exists
    const [typeCheck] = await sequelize.query(`
      SELECT typname FROM pg_type WHERE typname = 'SmsBalances';
    `);

    const [tableCheck] = await sequelize.query(`
      SELECT tablename FROM pg_tables WHERE tablename = 'SmsBalances';
    `);

    if (typeCheck.length === 0 && tableCheck.length === 0) {
      console.log(' No conflicts found. Skipping fix.');
      return;
    }

    console.log(' Conflict detected — cleaning up SmsBalances...');

    if (tableCheck.length > 0) {
      console.log('🗑 Dropping table "SmsBalances"...');
      await sequelize.query('DROP TABLE IF EXISTS "SmsBalances" CASCADE;');
    }

    if (typeCheck.length > 0) {
      console.log('🗑 Dropping type "SmsBalances"...');
      await sequelize.query('DROP TYPE IF EXISTS "SmsBalances" CASCADE;');
    }

    console.log('SmsBalances fix complete');
  } catch (err) {
    console.error('SmsBalances fix failed (ignored):', err.message);
  } finally {
    await sequelize.close();
  }
})();
