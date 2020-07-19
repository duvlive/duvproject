const Factory = require('rosie').Factory;
// const LoremIpsum = require('lorem-ipsum').LoremIpsum;
const randomItem = (items) => items[Math.floor(Math.random() * items.length)];

// const lorem = new LoremIpsum({
//   sentencesPerParagraph: {
//     max: 8,
//     min: 4,
//   },
//   wordsPerSentence: {
//     max: 16,
//     min: 4,
//   },
// });

const ENTERTAINER_TYPE = ['MC', 'DJ', 'Liveband'];
const TYPE_IN_FULL = [
  'Master of Ceremonies (MC)',
  'Disc Jockey (DJ)',
  'Liveband',
];
const YEAR_STARTED = ['2015', '2016', '2017', '2018', '2019'];
const BASE_CHARGES = [0, 10000, 50000, 100000];
const PREFERRED_CHARGES = [100000, 200000, 400000, 500000, 10000000];
const STAGE_NAME = [
  'Woro',
  'Ellyzhi',
  'Precious',
  'High Def',
  'Twister',
  'D Best',
  'Burtis Flow',
  'Anoda Day',
  'World Best',
  'Spinach',
  'Tantelke',
  'Shilabo',
  'Limitless',
  'Enimoney',
  'Fira Crown',
  'Winas',
  'Zebrah',
  'Osky',
];

const LOCATION = ['Lagos', 'Abuja', 'Rivers', 'Kano', 'Delta'];
const PREFERRED_LANGUAGE = [
  ['English'],
  ['English', 'Yoruba'],
  ['English', 'Igbo'],
  ['English', 'Hausa'],
  ['Yoruba'],
];

function generateSlug(text, entertainerType) {
  const textSlug = text.toString().replace(/\s+/g, '-').toLowerCase();
  return `${entertainerType}-${textSlug}`;
}

module.exports = new Factory()
  .option('offset', 0)
  .sequence('userId', ['offset'], function (id, offset) {
    return offset + id - 1;
  })
  .sequence('approved', ['offset'], function (id, offset) {
    const userId = offset + id - 1;
    return userId <= 16 ? true : false;
  })
  .sequence('stageName', function (id) {
    return STAGE_NAME[id % 18];
  })
  .sequence('slug', function (id) {
    return generateSlug(
      STAGE_NAME[id % 18],
      ENTERTAINER_TYPE[id % 3].toLowerCase()
    );
  })
  .sequence('youTubeChannel', function (id) {
    return `https://youtube.com/${generateSlug(STAGE_NAME[id % 18])}`;
  })
  .sequence('entertainerType', function (id) {
    return ENTERTAINER_TYPE[id % 3];
  })
  .sequence('yearStarted', function (id) {
    return YEAR_STARTED[id % 5];
  })
  .attr('location', function () {
    return randomItem(LOCATION);
  })
  .sequence('baseCharges', function (id) {
    return BASE_CHARGES[id % 4];
  })
  .sequence('preferredCharges', function (id) {
    return PREFERRED_CHARGES[id % 5];
  })
  .sequence('yearStarted', function (id) {
    return YEAR_STARTED[id % 5];
  })
  .sequence('preferredLanguage', function (id) {
    return JSON.stringify(PREFERRED_LANGUAGE[id % 5]);
  })
  .sequence('about', function (id) {
    const entertainerType = ENTERTAINER_TYPE[id % 3];
    const typeInFull = TYPE_IN_FULL[id % 3];
    const stageName = STAGE_NAME[id % 18];
    return `${entertainerType} ${stageName} is a professional ${typeInFull}.`;
  })
  .attrs({
    willingToTravel: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
