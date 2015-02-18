let express = require('express');
let bodyParser = require('body-parser');
let compression = require('compression');
let https = require('https');
let path = require('path');
let fs = require('fs');
let routes = require('./api/index.js');

class Server {
    constructor() {
        this.app = express();
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(compression());
        this.app.use('/', routes);
        this.app.use((req, res, next) => {
            let err = new Error('Not Found');
            err.status = 404;
            next(err);
        });
        this.app.use((err, req, res, next) => {
            res.status(err.status || 500);
            res.json({
                error: err.message
            });
        });
    }
    start(callback) {
        https.createServer({
            key: fs.readFileSync(path.join(WEB_CONFIG_DIRECTORY, 'cert-bg-server.key')),
            cert: fs.readFileSync(path.join(WEB_CONFIG_DIRECTORY, 'cert-bg-server.crt')),
            ca: fs.readFileSync(path.join(WEB_CONFIG_DIRECTORY, 'cert-ca.crt')),
            requestCert: true,
            rejectUnauthorized: true,
        }, this.app).listen(CONFIG.background.listen_port, CONFIG.background.listen_addr, () => {
            info(`Background service listening at https://${CONFIG.background.listen_addr}:${CONFIG.background.listen_port}`);
        });
    }
}

module.exports = (...args) => new Server(...args);