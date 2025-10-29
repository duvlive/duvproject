const db = require('../server/models');

(async () => {
  try {
    
    await db.sequelize.query('DROP TABLE IF EXISTS "SmsBalances" CASCADE;');
    console.log('Dropped old SmsBalances table from Railway DB');

    
    await db.sequelize.authenticate();
    console.log('Database connection verified');

    
    await db.SmsBalance.sync({ force: true });
    console.log('SmsBalance table recreated successfully');

    process.exit(0);
  } catch (err) {
    console.error(' Failed to drop SmsBalances table:', err);
    process.exit(1);
  }
})();
