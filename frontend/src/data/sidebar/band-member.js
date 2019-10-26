export default [
  {
    name: 'Navigation',
    menus: [
      {
        title: 'Dashboard',
        to: '/band-member/dashboard',
        icon: 'gauge'
      },
      {
        title: 'Notifications',
        to: '/band-member/notifications',
        icon: 'megaphone'
      },
      {
        title: 'Upcoming Events',
        to: '/band-member/events',
        icon: 'events'
      },
      {
        title: 'Payment History',
        to: '/band-member/payments',
        icon: 'credit-card'
      }
    ]
  },
  {
    name: 'Gems',
    menus: [
      {
        title: 'Badges',
        to: '/band-member/badges',
        icon: 'badge'
      },
      {
        title: 'Gallery',
        to: '/band-member/gallery',
        icon: 'gallery'
      },
      {
        title: 'Videos',
        to: '/band-member/videos',
        icon: 'video'
      },
      {
        title: 'Band Members',
        to: '/band-member/band-members',
        icon: 'band-members'
      }
    ]
  },
  {
    name: 'Others',
    menus: [
      {
        title: 'Edit Profile',
        to: '/band-member/edit-profile',
        icon: 'user-circle'
      },
      {
        title: 'Invite Friends',
        to: '/band-member/invite-friends',
        icon: 'invite-friend'
      },
      {
        title: 'Switch to User Account',
        to: '/user/dashboard',
        icon: 'loop'
      },
      {
        title: 'Help',
        to: '/band-member/help',
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
