export default [
  {
    name: 'Navigation',
    menus: [
      {
        title: 'Dashboard',
        to: '/administrator/dashboard',
        icon: 'gauge'
      },
      {
        title: 'Notifications',
        to: '/administrator/notifications',
        icon: 'megaphone'
      },
      {
        title: 'Entertainers',
        to: '/administrator/entertainers',
        icon: 'entertainers'
      },
      {
        title: 'Entertainers Payment',
        to: '/administrator/entertainers-payment',
        icon: 'credit-card'
      }
    ]
  },
  {
    name: 'Users',
    menus: [
      {
        title: 'Registered Users',
        to: '/administrator/registered-users',
        icon: 'badge'
      },
      {
        title: 'Auctions',
        to: '/administrator/auctions',
        icon: 'auction'
      },
      {
        title: 'Auctions Payment',
        to: '/administrator/auctions-payment',
        icon: 'credit-card'
      },
      {
        title: 'Upcoming events',
        to: '/administrator/upcoming-events',
        icon: 'calendar'
      }
      // {
      //   title: 'Gallery',
      //   to: '/administrator/gallery',
      //   icon: 'gallery'
      // },
      // {
      //   title: 'Videos',
      //   to: '/administrator/videos',
      //   icon: 'video'
      // }
    ]
  },
  {
    name: 'Miscelleneous',
    menus: [
      {
        title: 'Events',
        to: '/administrator/events',
        icon: 'calendar'
      },
      {
        title: 'Badges',
        to: '/administrator/badges',
        icon: 'badge'
      }
    ]
  },
  {
    name: 'Others',
    menus: [
      {
        title: 'Edit Profile',
        to: '/administrator/edit-profile',
        icon: 'user-circle'
      },
      {
        title: 'Invite Friends',
        to: '/administrator/invite-friends',
        icon: 'invite-friend'
      },
      {
        title: 'Switch to User Account',
        to: '/user/dashboard',
        icon: 'loop'
      },
      {
        title: 'Help',
        to: '/administrator/help',
        icon: 'help'
      },
      {
        title: 'Logout',
        to: '/logout',
        icon: 'logout'
      }
    ]
  }
];
