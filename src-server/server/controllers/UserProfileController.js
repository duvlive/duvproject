import { updateUser } from '../utils';

const UserProfileController = {
	updateUserAndUserProfile(req, res) {
		const {
			about,
			location,
			stageName,
			yearStarted,
			willingToTravel,
			eventType,
			entertainerType,
			youTubeChannel
		} = req.body;
		const userProfileData = {
			about,
			location,
			stageName,
			yearStarted,
			willingToTravel,
			eventType,
			entertainerType,
			youTubeChannel
		};

		updateUser(req.user, userProfileData, 'Profile')
			.then(userProfile => {
				return res
					.status(200)
					.json({ userProfile, message: 'User profile update is succesful' });
			})
			.catch(error => {
				return res.status(error.status || 400).json(error.message);
			});
	}
};

export default UserProfileController;
