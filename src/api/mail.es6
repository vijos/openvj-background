let nodemailer = require('nodemailer');
let wellknown = require('nodemailer-wellknown');
let express = require('express');
let router = express.Router();

let mailing = {};

for (let sender in CONFIG.mail) {
    let options = CONFIG.mail[sender];
    mailing[sender] = {
        options: options,
        transporter: nodemailer.createTransport(options)
    };
}

router.post('/send/:transporter', (req, res) => {
    let m = mailing[req.params.transporter];
    if (m === undefined) {
        throw new Error('Transporter not found');
    }
    m.transporter.sendMail({
        from: `${m.options.nick} <${m.options.auth.user}>`,
        to: req.body.to,
        subject: req.body.subject,
        html: req.body.html
    });
    res.json({});
    info(`${req.url} ${req.body.to.join(', ')}`);
});

module.exports = router;