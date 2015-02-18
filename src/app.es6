// locate web directory
let path = require('path');
GLOBAL.WEB_ROOT_DIRECTORY = require('./config.json').webDirectory;
GLOBAL.WEB_CONFIG_DIRECTORY = path.join(WEB_ROOT_DIRECTORY, 'app/config');

// load configure file
let yaml = require('js-yaml');
let fs = require('fs');
GLOBAL.CONFIG = yaml.safeLoad(fs.readFileSync(path.join(WEB_CONFIG_DIRECTORY, 'config.yml')));

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
require('./api.js')().start();
