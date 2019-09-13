import model from '../../models';
import testHelper from '../helpers/testHelper';
import SeedHelper from '../helpers/seedHelper';


const regularUser = testHelper.regularUser;
const User = model.User;
let newUser;


describe('User Model Unit Test', () => {
  beforeAll((done) => {
    SeedHelper
      .init()
      .then(() => {
        done();
      });
  });
  afterAll((done) => {
    model
      .sequelize
      .sync({ force: true })
      .then(() => done());
  });

  describe('Create User', () => {
    it('ensures a new user is created', (done) => {
      User
        .create(regularUser)
        .then((user) => {
          newUser = user;
          expect(newUser.firstname).toBe(regularUser.firstname);
          expect(newUser.lastname).toBe(regularUser.lastname);
          expect(newUser.username).toBe(regularUser.username);
          expect(newUser.email).toBe(regularUser.email);
          expect(newUser.phoneNumber1).toBe(regularUser.phoneNumber1);
          done();
        });
    });
    it('ensures password is hashed', () => {
      expect(newUser.password)
        .not
        .toBe(regularUser.password);
    });
  });
});