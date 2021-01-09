export default [
  {
    name: 'Navigation',
    menus: [
      {
        title: 'Dashboard',
        to: '/admin/dashboard',
        icon: 'gauge',
      },
      {
        title: 'Entertainers',
        to: '/admin/entertainers',
        icon: 'entertainers',
      },
      {
        title: 'Entertainers Payment',
        to: '/admin/entertainers-payment',
        icon: 'credit-card',
      },
      {
        title: 'Commissions',
        to: '/admin/commission',
        icon: 'wallet',
      },
      {
        title: 'Events Refund',
        to: '/admin/resolved-events',
        icon: 'money',
      },
    ],
  },
  {
    name: 'Users',
    menus: [
      {
        title: 'Registered Users',
        to: '/admin/registered-users',
        icon: 'badge',
      },
      {
        title: 'Auctions',
        to: '/admin/auctions',
        icon: 'auction',
      },
      {
        title: 'Requests',
        to: '/admin/requests',
        icon: 'vcard',
      },
      {
        title: 'Users Payment',
        to: '/admin/users-payment',
        icon: 'credit-card',
      },
      {
        title: 'Upcoming events',
        to: '/admin/upcoming-events',
        icon: 'calendar',
      },
      {
        title: 'Public Events',
        to: '/admin/public-events',
        icon: 'calendar',
      },
      {
        title: 'Gallery',
        to: '/admin/gallery',
        icon: 'gallery',
      },
      {
        title: 'Videos',
        to: '/admin/videos',
        icon: 'video',
      },
    ],
  },
  {
    name: 'Miscelleneous',
    menus: [
      {
        title: 'Global Notifications',
        to: '/admin/global-notifications',
        icon: 'circle',
      },
      {
        title: 'Badges',
        to: '/admin/badges',
        icon: 'badge',
      },
      {
        title: 'Cron Job',
        to: '/admin/cron',
        icon: 'usb',
      },
      {
        title: 'SMS Reports',
        to: '/admin/sms-reports',
        icon: 'message',
      },
    ],
  },
  {
    name: 'Others',
    menus: [
      {
        title: 'Switch to User Account',
        to: '/user/dashboard',
        icon: 'loop',
      },
      {
        title: 'Invite Friends',
        to: '/admin/invite-friends',
        icon: 'invite-friend',
      },
      {
        title: 'Edit Profile',
        to: '/admin/edit-profile',
        icon: 'user-circle',
      },
      {
        title: 'Logout',
        to: '/logout',
        icon: 'logout',
      },
    ],
  },
];

export const administratorTopMenu = [
  {
    title: "Recent Entertainers'  Payment",
    to: '/entertainer/entertainer-payment',
  },
  {
    title: 'Login as User',
    to: '/user/dashboard',
  },
  {
    title: 'Change Password',
    to: '/admin/change-password',
  },
];
