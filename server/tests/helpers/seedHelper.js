import db from '../../models';

/**
 * SeedData class to populate database with default data
 */
class SeedHelper {

  /**
   * Perform the sequential population of the db
   * @return {Void} - Returns Void
   */
  static init() {
    return db.sequelize.sync({ force: true })
    .then(() => Promise.all([
      SeedHelper.populateUserTable()]), err =>
      console.log(err, 'this is our error'),
    );
  }

  /**
   * Populates db with default user
   * @returns {object} - A Promise object
   */
  static populateUserTable() {
    const user =
      {
        firstName: 'admin',
        lastName: 'admin',
        email: 'admin@gmail.com',
        password: 'password',
        phoneNumber1: '08000000000',
        type: 3,
        isActive: false,
      };
    return db.User.create(user);
  }
}

export default SeedHelper;
