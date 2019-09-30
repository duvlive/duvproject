export default [
  {
    name: 'Navigation',
    menus: [
      {
        title: 'Dashboard',
        to: '/entertainer/dashboard',
        icon: 'gauge'
      },
      {
        title: 'Bids',
        to: '/entertainer/bids',
        icon: 'bid'
      },
      {
        title: 'Notifications',
        to: '/entertainer/notifications',
        icon: 'megaphone'
      },
      {
        title: 'Upcoming Events',
        to: '/entertainer/events',
        icon: 'events'
      },
      {
        title: 'Payment History',
        to: '/entertainer/payments',
        icon: 'credit-card'
      }
    ]
  },
  {
    name: 'Profile',
    menus: [
      {
        title: 'Edit Profile',
        to: '/entertainer/edit-profile',
        icon: 'user-circle'
      },
      {
        title: 'Gallery',
        to: '/entertainer/gallery',
        icon: 'gallery'
      },
      {
        title: 'Videos',
        to: '/entertainer/videos',
        icon: 'video'
      },
      {
        title: 'Band Members',
        to: '/entertainer/band-members',
        icon: 'band-members'
      },
      {
        title: 'Emergency Contacts',
        to: '/entertainer/emergency-contacts',
        icon: 'guest'
      }
    ]
  },
  {
    name: 'Others',
    menus: [
      {
        title: 'Badges',
        to: '/user/badges',
        icon: 'badge'
      },
      {
        title: 'Invite Friends',
        to: '/user/invite-friends',
        icon: 'invite-friend'
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
  }
];
