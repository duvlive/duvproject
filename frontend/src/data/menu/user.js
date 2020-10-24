const navigation = {
  name: 'Navigation',
  menus: [
    {
      title: 'Dashboard',
      to: '/user/dashboard',
      icon: 'gauge',
    },
    {
      title: 'Auctions',
      to: '/user/auctions',
      icon: 'auction',
    },
    {
      title: 'Requests',
      to: '/user/requests',
      icon: 'vcard',
    },
    {
      title: 'My Events',
      to: '/user/events',
      icon: 'events',
    },
    {
      title: 'Notifications',
      to: '/user/notifications',
      icon: 'megaphone',
    },
    {
      title: 'Hire Entertainers',
      to: '/user/hire-entertainer',
      icon: 'hire-entertainers',
    },
    {
      title: 'Payments History',
      to: '/user/payments-history',
      icon: 'credit-card',
    },
    {
      title: 'Leave A Review',
      to: '/user/review',
      icon: 'star',
    },
    {
      title: 'Public Events',
      to: '/user/public-events',
      icon: 'events',
    },
  ],
};
const others = (entertainerMenu) => ({
  name: 'Others',
  menus: [
    { ...entertainerMenu },
    {
      title: 'Edit Profile',
      to: '/user/edit-profile',
      icon: 'user-circle',
    },
    {
      title: 'Invite Friends',
      to: '/user/invite-friends',
      icon: 'invite-friend',
    },
    {
      title: 'Logout',
      to: '/logout',
      icon: 'logout',
    },
  ],
});

const registerAsEntertainer = {
  title: 'Register as Entertainer',
  to: '/user/register-as-entertainer',
  icon: 'paper-plane',
};

const backToEntertainer = {
  title: 'Switch to Entertainer',
  to: '/entertainer/dashboard',
  icon: 'loop',
};

const backToBandMember = {
  title: 'Switch to Band Member',
  to: '/band-member/dashboard',
  icon: 'loop',
};

const backToAdministrator = {
  title: 'Switch to Admin',
  to: '/admin/dashboard',
  icon: 'loop',
};

export const userSideMenu = [navigation, others(registerAsEntertainer)];

export const pseudoEntertainerUserSideMenu = [
  navigation,
  others(backToEntertainer),
];

export const pseudoBandMemberUserSideMenu = [
  navigation,
  others(backToBandMember),
];

export const pseudoAdminUserSideMenu = [
  navigation,
  others(backToAdministrator),
];

export const userTopMenu = [
  {
    title: 'Auctions',
    to: '/user/auctions',
  },
  {
    title: 'Payment History',
    to: '/user/payments-history',
  },
  {
    title: 'Change Password',
    to: '/user/change-password',
  },
];
