const db = require('../server/models');

(async () => {
  try {
    await db.GoogleToken.sync({ alter: true }); 
    console.log(' GoogleToken table is ready');
  } catch (err) {
    console.error(' Failed to create GoogleToken table:', err);
    process.exit(1);
  }
})();
