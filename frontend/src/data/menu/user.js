const navigation = {
  name: 'Navigation',
  menus: [
    {
      title: 'Dashboard',
      to: '/user/dashboard',
      icon: 'gauge'
    },
    {
      title: 'Auctions',
      to: '/user/auctions',
      icon: 'auction'
    },
    {
      title: 'My Events',
      to: '/user/events',
      icon: 'events'
    },
    {
      title: 'Notifications',
      to: '/user/notifications',
      icon: 'megaphone'
    },
    {
      title: 'Hire Entertainers',
      to: '/user/hire-entertainer',
      icon: 'hire-entertainers'
    },
    {
      title: 'Payments History',
      to: '/user/payments-history',
      icon: 'credit-card'
    }
  ]
};
const others = entertainerMenu => ({
  name: 'Others',
  menus: [
    {
      title: 'Edit Profile',
      to: '/user/edit-profile',
      icon: 'user-circle'
    },

    {
      title: 'Invite Friends',
      to: '/entertainer/invite-friends',
      icon: 'invite-friend'
    },
    { ...entertainerMenu },
    {
      title: 'Help',
      to: '/user/help',
      icon: 'help'
    },
    {
      title: 'Logout',
      to: '/logout',
      icon: 'logout'
    }
  ]
});

const registerAsEntertainer = {
  title: 'Register as Entertainer',
  to: '/user/register-as-entertainer',
  icon: 'paper-plane'
};

const backToEntertainer = {
  title: 'Switch to Entertainer',
  to: '/entertainer/dashboard',
  icon: 'loop'
};

export const userSideMenu = [navigation, others(registerAsEntertainer)];

export const pseudoEntertainerUserSideMenu = [
  navigation,
  others(backToEntertainer)
];

export const userTopMenu = [
  {
    title: 'Auctions',
    to: '/user/auctions'
  },
  {
    title: 'Payment History',
    to: '/user/payments-history'
  },
  {
    title: 'Change Password',
    to: '/user/change-password'
  }
];
