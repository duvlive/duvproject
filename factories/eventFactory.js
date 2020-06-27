const Factory = require('rosie').Factory;
const subDays = require('date-fns').subDays;
const addDays = require('date-fns').addDays;
const LoremIpsum = require('lorem-ipsum').LoremIpsum;
const ngFaker = require('ng-faker');

const EVENT_TYPE = [
  'Aniversary',
  'Ball',
  'Birthday Party',
  'Corporate Event',
  'Just Flexing',
];

const EVENT_DATE = [
  subDays(new Date(), 14),
  subDays(new Date(), 7),
  new Date(),
  addDays(new Date(), 30),
  addDays(new Date(), 60),
];

const EVENT_DURATION = ['1 hour', '5 hours', '9 hours', '14 hours', '20 hours'];

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

const STATE = ['Lagos', 'Abuja', 'Rivers', 'Kano', 'Delta'];
const LGA = ['Apapa', 'Abaji', 'Bonny', 'Bichi', 'Isoko-North'];

module.exports = new Factory()
  .sequence('eventType', function (id) {
    return EVENT_TYPE[id % 5];
  })
  .sequence('eventDate', function (id) {
    return EVENT_DATE[id % 5];
  })
  .sequence('startTime', function (id) {
    return EVENT_DATE[id % 5];
  })
  .attr('eventDuration', function () {
    return `${Math.floor(Math.random() * 20)} hours`;
  })
  .sequence('moreInformation', function (id) {
    return id % 2 === 1 ? lorem.generateParagraphs(1) : null;
  })
  .sequence('description', function (id) {
    return id % 2 === 1 ? lorem.generateParagraphs(2) : null;
  })
  .sequence('eventDuration', function (id) {
    return EVENT_DURATION[id % 5];
  })
  .attr('streetLine1', function () {
    const streetNo = Math.floor(Math.random() * 200);
    const streetName = ngFaker.lorem.word() + ' ' + ngFaker.lorem.word();
    return `${streetNo} ${streetName} street`;
  })
  .sequence('streetLine2', function (id) {
    const streetName = ngFaker.lorem.word() + ' ' + ngFaker.lorem.word();
    return id % 2 === 1 ? `${streetName} close` : null;
  })
  .sequence('landmark', function (id) {
    const landmark = ngFaker.lorem.word() + ' ' + ngFaker.lorem.word();
    return id % 2 === 1 ? null : landmark;
  })
  .sequence('lga', function (id) {
    return LGA[id % 5];
  })
  .sequence('state', function (id) {
    return STATE[id % 5];
  })
  .sequence('city', function (id) {
    return STATE[id % 5];
  })
  .sequence('landmark', function (id) {
    const landmark = ngFaker.lorem.word() + ' ' + ngFaker.lorem.word();
    return id % 2 === 1 ? null : landmark;
  })
  .attrs({
    userId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
