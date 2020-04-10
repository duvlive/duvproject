const Factory = require('rosie').Factory;
const addDays = require('date-fns').addDays;
const LoremIpsum = require('lorem-ipsum').LoremIpsum;
const randomItem = (items) => items[Math.floor(Math.random() * items.length)];

const ENTERTAINER_TYPE = ['MC', 'DJ', 'Liveband'];

const PLACE_OF_EVENTS = [
  'Event Center',
  'School',
  'Place of Worship',
  'Village hall',
  'Outside a House',
];

const GENRE = [
  ['Children', 'Country', 'International', 'Folk'],
  ['Classical', 'Variety', 'Golden Oldies', 'Rap', 'Blues'],
  ['Foreign', 'Raggae', 'The Eighties', 'Pop', 'Latin'],
  ['Indian', 'Hip-hop', 'International', 'Raggae', 'Rap'],
  ['Any'],
  [],
];

const LANGUAGE = [
  ['English', 'Yoruba'],
  ['English', 'Igbo'],
  ['English', 'Hausa'],
  ['Hausa'],
  ['Yoruba'],
];

const AUDIENCE_SIZE = ['0 - 20 Guests', '21 - 50 Guests', '51 - 100 Guests'];

const AGE_GROUP = [
  ['Children (Below 12 years)', 'Teens (12 - 17 years)'],
  ['All Ages'],
  ['All Ages'],
  ['Adults (18 - 50 years)'],
  ['Adults (18 - 50 years)'],
];

const HIRE_TYPE = ['Search', 'Auction', 'Recommendation'];

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

module.exports = new Factory()
  .option('type', 0)
  .attr('entertainerType', function () {
    return randomItem(ENTERTAINER_TYPE);
  })
  .sequence('placeOfEvent', function (id) {
    return PLACE_OF_EVENTS[id % 5];
  })
  .sequence('genre', function (id) {
    return JSON.stringify(GENRE[id % 5]);
  })
  .sequence('language', function (id) {
    return JSON.stringify(LANGUAGE[id % 5]);
  })
  .sequence('expectedAudienceSize', function (id) {
    return AUDIENCE_SIZE[id % 3];
  })
  .sequence('ageGroup', function (id) {
    return JSON.stringify(AGE_GROUP[id % 5]);
  })
  .sequence('lowestBudget', function (id) {
    return HIRE_TYPE[id % 3] === 'Auction'
      ? Math.floor(Math.random() * 100) * 1000
      : null;
  })
  .sequence('highestBudget', function (id) {
    return HIRE_TYPE[id % 3] === 'Auction'
      ? Math.floor(Math.random() * 100) * 10000
      : null;
  })
  .sequence('specialRequest', function (id) {
    return id % 3 === 1 ? lorem.generateSentences(1) : null;
  })
  .sequence('hireType', function (id) {
    return HIRE_TYPE[id % 3];
  })
  .sequence('auctionStartDate', function (id) {
    return HIRE_TYPE[id % 3] === 'Auction' ? new Date() : null;
  })
  .sequence('auctionEndDate', function (id) {
    return HIRE_TYPE[id % 3] === 'Auction' ? addDays(new Date(), 14) : null;
  })
  .attrs({
    eventId: 1,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
