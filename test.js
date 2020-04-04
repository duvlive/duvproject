const userFactory = require('./factories/userFactory');
const entertainerFactory = require('./factories/entertainerProfileFactory');

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

var entertainers = entertainerFactory.buildList(18, {}, { offset: 3 });

console.log('entertainer', entertainers);
