import faker from 'faker';

if (process.env.NODE_ENV !== 'test') {
  process.exit(1);
}

module.exports = {
  regularUser: {
    firstName: 'Seyi',
    lastName: 'Keye',
    email: 'a2@gmail.com',
    password: faker.internet.password(),
    phoneNumber1: '00000000000',
  },
};