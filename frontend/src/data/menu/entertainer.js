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
    name: 'Gems',
    menus: [
      {
        title: 'Badges',
        to: '/entertainer/badges',
        icon: 'badge'
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
        title: 'Edit Profile',
        to: '/entertainer/edit-profile',
        icon: 'user-circle'
      },
      {
        title: 'Invite Friends',
        to: '/entertainer/invite-friends',
        icon: 'invite-friend'
      },
      {
        title: 'Switch to User Account',
        to: '/user/dashboard',
        icon: 'loop'
      },
      {
        title: 'Help',
        to: '/entertainer/help',
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

export const entertainerTopMenu = [
  {
    title: 'My Bids',
    to: '/entertainer/bids'
  },
  {
    title: 'Payment History',
    to: '/entertainer/payments-history'
  },
  {
    title: 'Login as User',
    to: '/user/dashboard'
  },
  {
    title: 'Change Password',
    to: '/entertainer/change-password'
  }
];
