// const userFactory = require('./factories/userFactory');
// const entertainerFactory = require('./factories/entertainerProfileFactory');
// const eventFactory = require('./factories/eventFactory');
const eventEntertainerFactory = require('./factories/eventEntertainerFactory');

// var user = userFactory.buildList(2);
// var entertainer = userFactory.buildList(18, {}, { type: 2, offset: 2 });
// var admin = userFactory.buildList(2, {}, { type: 0, offset: 20 });
// var bandMembers = userFactory.buildList(2, {}, { type: 3, offset: 22 });

// console.log('[...user, ...entertainer]', [
//   ...user,
//   ...entertainer,
//   ...admin,
//   ...bandMembers,
// ]);

// var entertainers = entertainerFactory.buildList(18, {}, { offset: 3 });
// var events = eventFactory.build();
var eventEntertainer = eventEntertainerFactory.buildList(5);

console.log(eventEntertainer);
