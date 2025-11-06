const models = require('../server/models');
const { USER_TYPES, ACCOUNT_STATUS } = require('../server/constant');

async function main() {
  const { User } = models;
  const email = process.env.NEW_ADMIN_EMAIL || 'admin@local.test';
  const password = process.env.NEW_ADMIN_PASSWORD || 'ChangeMe123!';
  const firstName = process.env.NEW_ADMIN_FIRSTNAME || 'Admin';
  const lastName = process.env.NEW_ADMIN_LASTNAME || 'User';

  try {
    const existing = await User.findOne({ where: { email } });

    if (existing) {
      console.log(`👤 Admin already exists: ${email}`);

      if (process.env.NEW_ADMIN_PASSWORD) {
        existing.password = password;
        await existing.save();
        console.log('🔑 Password updated successfully.');
      } else {
        console.log('ℹ️ No NEW_ADMIN_PASSWORD provided — password unchanged.');
      }

      process.exit(0);
    }

    // Create a new admin if not existing
    const admin = await User.create({
      firstName,
      lastName,
      email,
      password,
      phoneNumber: '08100000003',
      type: USER_TYPES.ADMINISTRATOR,
      isActive: true,
      activatedAt: new Date(),
      source: process.env.NEW_ADMIN_SOURCE || 'Script',
      accountStatus: ACCOUNT_STATUS.ACTIVE,
    });

    console.log(` Created new admin: ${admin.id} (${admin.email})`);
    process.exit(0);
  } catch (err) {
    console.error(' Error creating/updating admin:', err?.message || err);
    process.exit(1);
  }
}

main();
