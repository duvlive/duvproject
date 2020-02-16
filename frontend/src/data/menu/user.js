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
    }
  ]
};
const others = {
  name: 'Others',
  menus: [
    {
      title: 'Edit Profile',
      to: '/user/edit-profile',
      icon: 'user-circle'
    },
    {
      title: 'Payments History',
      to: '/user/payments-history',
      icon: 'credit-card'
    },
    {
      title: 'Register as Entertainer',
      to: '/user/register-as-entertainer',
      icon: 'paper-plane'
    },
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
};

const backToEntertainer = {
  title: 'Switch to Entertainer',
  to: '/entertainer/dashboard',
  icon: 'loop'
};

export const userSideMenu = [navigation, others];

let entertainerOthers = { ...others };
entertainerOthers.menus[2] = backToEntertainer;

export const pseudoEntertainerUserSideMenu = [navigation, entertainerOthers];

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
