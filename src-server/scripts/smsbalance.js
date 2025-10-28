const db = require('../server/models');

(async () => {
  try {
    

    await db.sequelize.query('DROP TABLE IF EXISTS "SmsBalances";');
    console.log('Dropped old SmsBalances table');

    
    // await db.SmsBalance.sync({ force: true }); 


    console.log(' SmsBalance table recreated successfully');
  } catch (err) {
    console.error('Failed to recreate SmsBalance table:', err);
    process.exit(1);
  }
})();
