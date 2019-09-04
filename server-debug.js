const model = require('./server/models');

const repl = require('repl');
// const msg = 'message';

repl.start('> ').context.model = model;