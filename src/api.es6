let express = require('express');
let https = require('https');
let fs = require('fs');

class Server {
    constructor(config) {
        this.config = config;
        this.app = express();
    }
    start(callback) {
        https.createServer({
            key: fs.readFileSync(this.config.key),
            cert: fs.readFileSync(this.config.cert),
            ca: fs.readFileSync(this.config.ca),
            requestCert: true,
            rejectUnauthorized: true,
        }, this.app).listen(this.config.listen_port, this.config.listen_addr, () => {
            info(`API server listening at https://${this.config.listen_addr}:${this.config.listen_port}`);
        });
    }
}

module.exports = (...args) => new Server(...args);