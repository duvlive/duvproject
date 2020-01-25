export const USER_TYPES = {
  admin: 0,
  user: 1,
  entertainer: 2,
  bandMember: 3
};

export const DASHBOARD_PAGE = {
  [USER_TYPES.user]: 'user',
  [USER_TYPES.entertainer]: 'entertainer',
  [USER_TYPES.admin]: 'admin',
  [USER_TYPES.bandMember]: 'band-member'
};

export const SLIDESHOW_TYPE = {
  image: 'image',
  entertainers: 'entertainers',
  events: 'events',
  testimonials: 'testimonials'
};

export const HIRE_ENTERTAINERS = {
  search: 'Search',
  auction: 'Auction',
  recommend: 'Recommendation'
};

export const SELECT_ENTERTAINERS_TYPE = [
  {
    label: 'DJ',
    value: 'dj'
  },
  {
    label: 'MC',
    value: 'mc'
  },
  {
    label: 'Live Bands',
    value: 'live-bands'
  }
];

export const EVENT_AGE_GROUP = [
  {
    label: 'All Ages',
    value: 'All Ages'
  },
  {
    label: 'Children (Below 12 years)',
    value: 'children'
  },
  {
    label: 'Teen (12 - 17 years)',
    value: 'teens'
  },
  {
    label: 'Adults (18 - 50 years)',
    value: 'adults'
  },
  {
    label: '51 years old or over',
    value: 'old-people'
  }
];

export const OCCASSION_TYPE = [
  {
    label: 'Wedding',
    value: 'wedding'
  },
  {
    label: 'Birthday Party',
    value: 'birthday-party'
  },
  {
    label: 'Corporate Event',
    value: 'corporate-event'
  },
  {
    label: 'Formal Event',
    value: 'formal-event'
  },
  {
    label: 'Ball',
    value: 'ball'
  },
  {
    label: 'Graduation Party',
    value: 'graduation-party'
  },
  {
    label: 'Summer Party',
    value: 'summer-party'
  },
  {
    label: 'Family Get-Together',
    value: 'family-get-together'
  },
  {
    label: 'Engagement Party',
    value: 'engagement-party'
  },
  {
    label: 'Naming Ceremony',
    value: 'naming-ceremony'
  },
  {
    label: 'Party',
    value: 'party'
  }
];
export const AUDIENCE_SIZE = [
  {
    label: 'Fewer than 20 guests',
    value: '0-20'
  },
  {
    label: 'Between 20 and 50 guests',
    value: '21-50'
  },
  {
    label: 'Between 51 and 100 guests',
    value: '51-100'
  },
  {
    label: 'Between 101 and 250 guests',
    value: '101-250'
  },
  {
    label: 'Between 251 and 1000 guests',
    value: '251-1000'
  },
  {
    label: 'Above 1000 guests',
    value: '1000+'
  }
];

export const GENRE = [
  { label: 'Local', value: 'local' },
  { label: 'Pop', value: 'pop' },
  { label: 'Hip-hop', value: 'hip-hop' },
  { label: 'Rap', value: 'rap' },
  { label: 'Variety', value: 'variety' },
  { label: 'Country', value: 'country' },
  { label: 'Golden Oldies', value: 'golden-oldies' },
  { label: 'Rock', value: 'rock' },
  { label: 'The Eighties', value: 'the-eighties' },
  { label: 'Funk or Disco', value: 'funk' },
  { label: 'Indian', value: 'indian' }
];

export const RATINGS = [
  { label: 'One Star and above', value: '1star+' },
  { label: 'Two Stars and above', value: '2stars+' },
  { label: 'Three Stars and above', value: '3stars+' },
  { label: 'Four Stars and above', value: '4stars+' },
  { label: 'Five Stars', value: '5stars' }
];

export const PLACE_OF_EVENTS = [
  { label: 'Village hall' },
  { label: 'Conference Centry' },
  { label: 'Concert Hall' },
  { label: 'Outdoors' },
  { label: 'Country' },
  { label: 'Office' },
  { label: 'School' },
  { label: 'In a House' },
  { label: 'Community Centry' },
  { label: 'Place of Worship' },
  { label: 'Barn' }
];

export const BUDGET = [
  { label: '50 thousand naira', value: '50K' },
  { label: '100 thousand naira', value: '100K' },
  { label: '200 thousand naira', value: '200K' },
  { label: '300 thousand naira', value: '300K' },
  { label: '400 thousand naira', value: '400K' },
  { label: '500 thousand naira', value: '500K' },
  { label: '600 thousand naira', value: '600K' },
  { label: '700 thousand naira', value: '700K' },
  { label: '800 thousand naira', value: '800K' },
  { label: '900 thousand naira', value: '900K' },
  { label: 'Over 1 million naira ', value: '1M+' }
];

export const LANGUAGE = [
  { label: 'Any', value: 'any' },
  { label: 'English', value: 'english' },
  { label: 'Yoruba', value: 'yoruba' },
  { label: 'Igbo', value: 'igbo' },
  { label: 'Hausa', value: 'hausa' }
];
