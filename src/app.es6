// load configure file
let config = require('./config.json');

// initialize logger
let winston = require('winston');
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
    colorize: true,
    timestamp: true
});
winston.add(winston.transports.File, {
    filename: 'debug.log'
});

// expose those methods to GLOBAL
for (let method of ['debug', 'info', 'warn', 'error']) {
    GLOBAL[method] = winston[method];
}

// start our API server
require('./api.js')(config.API).start();
