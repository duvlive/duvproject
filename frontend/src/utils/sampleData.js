import { getCurrentUser } from 'utils/localStorage';
import UserAvatar from 'assets/img/avatar/user.png';
import EntertainerAvatar from 'assets/img/avatar/entertainer.jpg';
import BandMemberAvatar from 'assets/img/avatar/band-member.png';
import AdministratorAvatar from 'assets/img/avatar/administrator.png';

const SAMPLE_USERS = ['UV', 'Mariam Obi', 'DJ Cuppy', 'High Soul'];

const SAMPLE_AVATARS = [
  AdministratorAvatar,
  UserAvatar,
  EntertainerAvatar,
  BandMemberAvatar
];

export const getSampleUser = () => {
  const currentUser = getCurrentUser();
  return SAMPLE_USERS[currentUser.type];
};

export const getSampleAvatar = () => {
  const currentUser = getCurrentUser();
  return SAMPLE_AVATARS[currentUser.type];
};
