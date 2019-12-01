import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, UserProfile } from '../models';
import Authentication from '../middleware/authentication';
import { UserValidation,  userProfileUpdateHelper } from '../utils';

const UserProfileController = {
  updateUserAndUserProfile(req, res) {
    const { decoded: { userId},  body} = req;
    const { about, location, stageName, yearStarted, willingToTravel, eventType, entertainerType } = body;
    userProfileUpdateHelper( userId, { about,
      location, stageName, yearStarted, willingToTravel, eventType, entertainerType })
      .then((userProfile) => {
        return res.status(200).json({ userProfile, message: 'User profile update is succesful' });
      })
      .catch((error) => {
        return res.status(error.status || 400).json(error.message)
      })
  },
};

export default UserProfileController;
