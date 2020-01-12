const model = require('./src-server/server/models');

const repl = require('repl');
// const msg = 'message';

repl.start('> ').context.model = model;