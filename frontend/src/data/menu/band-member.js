export default [
  {
    name: 'Navigation',
    menus: [
      {
        title: 'Dashboard',
        to: '/band-member/dashboard',
        icon: 'gauge',
      },
      {
        title: 'Upcoming Events',
        to: '/band-member/events',
        icon: 'events',
      },
      {
        title: 'Payment History',
        to: '/band-member/payments',
        icon: 'credit-card',
      },
    ],
  },
  {
    name: 'Gems',
    menus: [
      {
        title: 'Badges',
        to: '/band-member/badges',
        icon: 'badge',
      },
      {
        title: 'Team Gallery',
        to: '/band-member/gallery',
        icon: 'gallery',
      },
      {
        title: 'Team Videos',
        to: '/band-member/videos',
        icon: 'video',
      },
      {
        title: 'Team Members',
        to: '/band-member/team-members',
        icon: 'band-members',
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
        title: 'Edit Profile',
        to: '/band-member/edit-profile',
        icon: 'user-circle',
      },
      {
        title: 'Invite Friends',
        to: '/band-member/invite-friends',
        icon: 'invite-friend',
      },
      {
        title: 'Logout',
        to: '/logout',
        icon: 'logout',
      },
    ],
  },
];

export const bandMemberTopMenu = [
  {
    title: 'Payment History',
    to: '/band-member/payments-history',
  },
  {
    title: 'Change Password',
    to: '/band-member/change-password',
  },
];
