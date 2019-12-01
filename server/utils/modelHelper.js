import { User, UserProfile } from '../models';
import { UserValidation } from './index';

export const userProfileUpdateHelper = (id, data) =>  {
  return UserProfile.findOne(
    { where: { userId: id }})
    .then( async (userProfile) => {
      if (!userProfile) {
        throw { status: 404, message:  'User profile not found' }
      }
    return userProfile
      .update(data)
      .then(() => userProfile);
  })
}