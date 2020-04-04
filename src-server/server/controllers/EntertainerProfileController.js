import { updateUser } from '../utils';
import { User, EntertainerProfile } from '../models';
import { USER_TYPES } from '../constant';

export const userAssociatedModels = [
  {
    model: EntertainerProfile,
    as: 'profile'
  }
];

export const entertainerProfileAssociatedModels = [
  {
    model: User,
    as: 'personalDetails'
  }
];

const EntertainerProfileController = {
  /**
   * update User And Entertainer Profile
   * @function
   * @param {object} req is req object
   * @param {object} res is res object
   * @return {object} returns res object
   */
  updateUserAndEntertainerProfile(req, res) {
    const {
      about,
      city,
      baseCharges,
      preferredCharges,
      availableFor,
      location,
      stageName,
      yearStarted,
      willingToTravel,
      eventType,
      entertainerType,
      youTubeChannel
    } = req.body;
    const entertainerProfileData = {
      about,
      city,
      baseCharges,
      preferredCharges,
      availableFor,
      location,
      stageName,
      yearStarted,
      willingToTravel,
      eventType,
      entertainerType,
      youTubeChannel,
      slug: stageName
        ? `${stageName}-${req.user.dataValues.id}`
        : `${req.user.dataValues.id}`
    };

    updateUser(req.user, entertainerProfileData, 'Profile')
      .then(entertainerProfile => {
        return res.status(200).json({
          message: 'User profile update is succesful',
          entertainerProfile
        });
      })
      .catch(error => {
        return res.status(error.status || 400).json({ message: error.message });
      });
  },

  transformEntertainers(entertainer, updatedValues = {}) {
    const transformEntertainer = {
      id: entertainer.id,
      firstName: entertainer.firstName,
      lastName: entertainer.lastName,
      type: entertainer.type,
      profileImg: entertainer.profileImageURL,
      stageName: entertainer.profile.stageName,
      entertainerType: entertainer.profile.entertainerType,
      slug: entertainer.profile.slug
    };

    return { ...transformEntertainer, ...updatedValues };
  },

  getEntertainers(req, res) {
    console.log('I got here hahaha yyy');
    User.findAll({
      where: { type: USER_TYPES.ENTERTAINER },
      include: userAssociatedModels
    })
      .then(entertainers => {
        return res.status(200).json({
          message: 'Entertainers List',
          entertainers: entertainers.map(entertainer =>
            EntertainerProfileController.transformEntertainers(entertainer)
          )
        });
      })
      .catch(error => {
        console.log(error);
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  transformEntertainer(entertainer, updatedValues = {}) {
    const transformEntertainer = {
      id: entertainer.personalDetails.id,
      firstName: entertainer.personalDetails.firstName,
      lastName: entertainer.personalDetails.lastName,
      type: entertainer.personalDetails.type,
      about: entertainer.about,
      profileImg: entertainer.personalDetails.profileImageURL,
      stageName: entertainer.stageName,
      entertainerType: entertainer.entertainerType,
      slug: entertainer.slug
    };

    return { ...transformEntertainer, ...updatedValues };
  },

  getEntertainerBySlug(req, res) {
    const { slug } = req.params;
    EntertainerProfile.findOne({
      where: { slug },
      include: entertainerProfileAssociatedModels
    })
      .then(entertainer => {
        return res.status(200).json({
          message: 'Entertainer detail',
          entertainer: EntertainerProfileController.transformEntertainer(
            entertainer
          )
        });
      })
      .catch(error => {
        console.log(error);
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  searchForEntertainer(req, res) {
    const { entertainerType, searchTerm } = req.params;
    EntertainerProfile.findOne({
      where: { entertainerType, searchTerm },
      include: entertainerProfileAssociatedModels
    })
      .then(entertainer => {
        return res.status(200).json({
          message: 'Entertainer detail',
          entertainer: EntertainerProfileController.transformEntertainer(
            entertainer
          )
        });
      })
      .catch(error => {
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  },

  getTotalEntertainers(req, res) {
    EntertainerProfile.findAll()
      .then(entertainers => {
        return res.status(200).json({
          message: 'Total Entertainers',
          entertainers: entertainers.reduce(
            (acc, entertainer) => {
              if (entertainer.entertainerType === 'MC') {
                acc['mc'] += 1;
              }
              if (entertainer.entertainerType === 'DJ') {
                acc['dj'] += 1;
              }
              if (entertainer.entertainerType === 'Liveband') {
                acc['liveband'] += 1;
              }
              return acc;
            },
            { mc: 0, dj: 0, liveband: 0 }
          )
        });
      })
      .catch(error => {
        console.log(error);
        const status = error.status || 500;
        const errorMessage = error.message || error;
        return res.status(status).json({ message: errorMessage });
      });
  }
};

export default EntertainerProfileController;
