export default [
  {
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
        title: 'Hire Entertainers',
        to: '/user/hire-entertainers',
        icon: 'hire-entertainers'
      }
    ]
  },
  {
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
        icon: 'credit-card-alt'
      },
      {
        title: 'Help',
        to: '/user/help',
        icon: 'help'
      },
      {
        title: 'Logout',
        to: '/user/logout',
        icon: 'logout'
      }
    ]
  }
];
