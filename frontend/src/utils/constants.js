export const OUR_PHONE_NUMBER = '+234 708 7821 561';
export const VAT = '7.5';

export const ENTERTAINER = {
  MC: 'MC',
  DJ: 'DJ',
  LIVEBAND: 'Liveband',
};

export const COLOR_STYLE = [
  'primary',
  'secondary',
  'success',
  'danger',
  'error',
  'warning',
  'info',
  'light',
  'dark',
];

export const ONBOARDING_STEPS = {
  entertainerProfile: { title: 'Entertainer Profile' },
  bankAccount: { title: 'Bank Account Details' },
  contact: { title: 'Emergency Contact' },
  youTube: { title: 'Youtube Channel' },
  identification: { title: 'Valid Identification' },
};

export const STEPS_REQUIREMENT = {
  entertainerProfile: ['Profile Image', 'Entertainers Information'],
  bankAccount: [
    'Bank Account details',
    'Account Name must contain at least your stage name, first name or last name',
  ],
  contact: [
    'Your Next of Kin OR',
    'A Professional Contact (mentor, colleague etc)',
  ],
  youTube: [
    'Your Youtube Channel',
    'This must contain some of your previous performance',
  ],
  identification: [
    'Valid Identification',
    'International Passport or Drivers License or National ID Card',
  ],
};

export const USER_TYPES = {
  admin: 0,
  user: 1,
  entertainer: 2,
  bandMember: 3,
  unknown: 999,
};

export const HIRE_ENTERTAINERS_TYPE = {
  search: {
    title: 'Search',
    description:
      'Search for your favorite Entertainer and select them for your event',
    color: 'blue',
  },
  auction: {
    title: 'Auction',
    description:
      'Select the best Entertainer for your Event based on bids from Entertainers',
    color: 'red',
  },
  recommend: {
    title: 'Recommend',
    description: 'Lets suggest the best Entertainer for your event',
    color: 'green',
  },
};

export const ENTERTAINER_TYPE = {
  MC: 'MC',
  DJ: 'DJ',
  Liveband: 'Live Band',
};

export const DASHBOARD_PAGE = {
  [USER_TYPES.user]: 'user',
  [USER_TYPES.entertainer]: 'entertainer',
  [USER_TYPES.admin]: 'admin',
  [USER_TYPES.bandMember]: 'band-member',
  [USER_TYPES.unknown]: 'unknown',
};

export const SLIDESHOW_TYPE = {
  image: 'image',
  entertainers: 'entertainers',
  events: 'events',
  testimonials: 'testimonials',
  welcome: 'welcome',
};

export const HIRE_ENTERTAINERS = {
  search: 'Search',
  auction: 'Auction',
  recommend: 'Recommendation',
};

export const SELECT_ENTERTAINERS_TYPE = [
  {
    label: 'DJ',
    value: 'DJ',
  },
  {
    label: 'MC',
    value: 'MC',
  },
  {
    label: 'Live Bands',
    value: 'Liveband',
  },
];

export const EVENT_AGE_GROUP = [
  {
    label: 'All Ages',
    value: 'All Ages',
  },
  {
    label: 'Children (Below 12 years)',
    value: 'Children (Below 12 years)',
  },
  {
    label: 'Teens (12 - 17 years)',
    value: 'Teens (12 - 17 years)',
  },
  {
    label: 'Adults (18 - 50 years)',
    value: 'Adults (18 - 50 years)',
  },
  {
    label: '51 years old or over',
    value: 'Old People (51 years old or over)',
  },
];

export const OCCASSION_TYPE = [
  {
    label: 'Aniversary',
    value: 'Aniversary',
  },
  {
    label: 'Ball',
    value: 'Ball',
  },
  {
    label: 'Birthday Party',
    value: 'Birthday Party',
  },
  {
    label: 'Corporate Event',
    value: 'Corporate Event',
  },
  {
    label: 'Celebration',
    value: 'Celebration',
  },
  {
    label: 'Engagement Party',
    value: 'Engagement Party',
  },
  {
    label: 'Entertainment',
    value: 'Entertainment',
  },
  {
    label: 'Family Get-Together',
    value: 'Family Get-Together',
  },
  {
    label: 'Formal Event',
    value: 'Formal Event',
  },
  {
    label: 'Graduation Party',
    value: 'Graduation Party',
  },
  {
    label: 'Naming Ceremony',
    value: 'Naming Ceremony',
  },
  {
    label: 'Party',
    value: 'party',
  },
  {
    label: 'Summer Party',
    value: 'Summer Party',
  },
  {
    label: 'Wedding',
    value: 'wedding',
  },
];
export const AUDIENCE_SIZE = [
  {
    label: 'Fewer than 20 guests',
    value: '0 - 20 Guests',
  },
  {
    label: 'Between 20 and 50 guests',
    value: '21 - 50 Guests',
  },
  {
    label: 'Between 51 and 100 guests',
    value: '51 - 100 Guests',
  },
  {
    label: 'Between 101 and 250 guests',
    value: '101 - 250 Guests',
  },
  {
    label: 'Between 251 and 1000 guests',
    value: '251 - 1000 Guests',
  },
  {
    label: 'Above 1000 guests',
    value: '1,000+ Guests',
  },
];

export const GENRE = [
  { label: 'Any', value: 'Any' },
  { label: 'Blues', value: 'Blues' },
  { label: 'Children', value: 'Children' },
  { label: 'Classical', value: 'Classical' },
  { label: 'Country', value: 'Country' },
  { label: 'Folk', value: 'Folk' },
  { label: 'Foreign', value: 'Foreign' },
  { label: 'Funk or Disco', value: 'Funk' },
  { label: 'Golden Oldies', value: 'Golden Oldies' },
  { label: 'Hip-hop', value: 'Hip Hop' },
  { label: 'Indian', value: 'Indian' },
  { label: 'International', value: 'International' },
  { label: 'Latin', value: 'Latin' },
  { label: 'Local', value: 'Local' },
  { label: 'Pop', value: 'Pop' },
  { label: 'Pop/Rock', value: 'Pop/Rock' },
  { label: 'R&B', value: 'R&B' },
  { label: 'Rap', value: 'Rap' },
  { label: 'Raggae', value: 'Raggae' },
  { label: 'Religious', value: 'Religious' },
  { label: 'Rock', value: 'Rock' },
  { label: 'The Eighties', value: 'The Eighties' },
  { label: 'Variety', value: 'Variety' },
];

export const RATINGS = [
  { label: 'One Star and above', value: '1star+' },
  { label: 'Two Stars and above', value: '2stars+' },
  { label: 'Three Stars and above', value: '3stars+' },
  { label: 'Four Stars and above', value: '4stars+' },
  { label: 'Five Stars', value: '5stars' },
];

export const PLACE_OF_EVENTS = [
  { label: 'Outside a House' },
  { label: 'Outdoors' },
  { label: 'In a House' },
  { label: 'Inside a Room' },
  { label: 'Hall' },
  { label: 'Event Center' },
  { label: 'Office' },
  { label: 'School' },
  { label: 'Concert Hall' },
  { label: 'Village hall' },
  { label: 'Place of Worship' },
  { label: 'Mosque' },
  { label: 'Church' },
  { label: 'Conference Centry' },
  { label: 'Country' },
  { label: 'Community Centry' },
  { label: 'Barn' },
];

export const BUDGET = [
  { label: '10 Thousand Naira', value: '10000' },
  { label: '20 Thousand Naira', value: '20000' },
  { label: '30 Thousand Naira', value: '30000' },
  { label: '40 Thousand Naira', value: '40000' },
  { label: '50 Thousand Naira', value: '50000' },
  { label: '60 Thousand Naira', value: '60000' },
  { label: '70 Thousand Naira', value: '70000' },
  { label: '80 Thousand Naira', value: '80000' },
  { label: '90 Thousand Naira', value: '90000' },
  { label: '100 Thousand Naira', value: '100000' },
  { label: '200 Thousand Naira', value: '200000' },
  { label: '300 Thousand Naira', value: '300000' },
  { label: '400 Thousand Naira', value: '400000' },
  { label: '500 Thousand Naira', value: '500000' },
  { label: '600 Thousand Naira', value: '600000' },
  { label: '700 Thousand Naira', value: '700000' },
  { label: '800 Thousand Naira', value: '800000' },
  { label: '900 Thousand Naira', value: '900000' },
  { label: '1 Million Naira ', value: '1000000' },
  { label: 'Over 1 Million Naira ', value: '1000000000' },
];

export const LANGUAGE = [
  { label: 'English', value: 'English' },
  { label: 'Yoruba', value: 'Yoruba' },
  { label: 'Igbo', value: 'Igbo' },
  { label: 'Hausa', value: 'Hausa' },
];

export const DEFAULT_COMMISSION = {
  title: 'Default Commission',
  recommendationsCommission: '15',
  directHireCommission: '6',
  bidsCommission: '10',
  handlingPercent: '2',
  handlingPlus: '40',
};

export const REQUEST_ACTION = {
  APPROVED: 'Approved',
  EXPIRED: 'Expired',
  INCREMENT: 'Increment',
  PAID: 'Paid',
  PENDING: 'Pending',
  REJECTED: 'Rejected',
};

export const START_TIME = [
  { label: '9:00 AM', value: 9 },
  { label: '10:00 AM', value: 10 },
  { label: '11:00 AM', value: 11 },
  { label: '12:00 PM', value: 12 },
  { label: '1:00 PM', value: 13 },
  { label: '2:00 PM', value: 14 },
  { label: '3:00 PM', value: 15 },
  { label: '4:00 PM', value: 16 },
  { label: '5:00 PM', value: 17 },
  { label: '6:00 PM', value: 18 },
  { label: '7:00 PM', value: 19 },
  { label: '8:00 PM', value: 20 },
  { label: '9:00 PM', value: 21 },
  { label: '10:00 PM', value: 22 },
  { label: '11:00 PM', value: 23 },
  { label: '12:00 AM', value: 0 },
  { label: '1:00 AM', value: 1 },
  { label: '2:00 AM', value: 2 },
  { label: '3:00 AM', value: 3 },
  { label: '4:00 AM', value: 4 },
  { label: '5:00 AM', value: 5 },
  { label: '6:00 AM', value: 6 },
  { label: '7:00 AM', value: 7 },
  { label: '8:00 AM', value: 8 },
];

// get event time with startof day
// add start time to eventtime to get actual start time
// add event duration to starttime to get if the event is ongoing
// add hours (string) to everywhere event duration is used
