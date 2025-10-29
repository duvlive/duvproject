const db = require('../server/models');

(async () => {
  try {
    
    await db.sequelize.query('DROP TYPE IF EXISTS "SmsBalances" CASCADE;');
    console.log(' Dropped lingering Postgres type "SmsBalances"');

    
    await db.sequelize.query('DROP TABLE IF EXISTS "SmsBalances" CASCADE;');
    console.log('Dropped table "SmsBalances"');

    
    await db.SmsBalance.sync({ force: true });
    console.log(' SmsBalance table recreated successfully');

    process.exit(0);
  } catch (err) {
    console.error(' Failed to fix SmsBalances:', err);
    process.exit(1);
  }
})();
