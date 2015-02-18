let express = require('express');
let https = require('https');
let path = require('path');
let fs = require('fs');
let routes = require('./api/index.js');

class Server {
    constructor(config) {
        this.config = config;
        this.app = express();
        this.app.use('/', routes);
    }
    start(callback) {
        https.createServer({
            key: fs.readFileSync(path.join(WEB_CONFIG_DIRECTORY, 'cert-bg-server.key')),
            cert: fs.readFileSync(path.join(WEB_CONFIG_DIRECTORY, 'cert-bg-server.crt')),
            ca: fs.readFileSync(path.join(WEB_CONFIG_DIRECTORY, 'cert-ca.crt')),
            requestCert: true,
            rejectUnauthorized: true,
        }, this.app).listen(this.config.listen_port, this.config.listen_addr, () => {
            info(`Background service listening at https://${this.config.listen_addr}:${this.config.listen_port}`);
        });
    }
}

module.exports = (...args) => new Server(...args);