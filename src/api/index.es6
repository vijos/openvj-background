let express = require('express');
let router = express.Router();

router.use('/ping', require('./ping.js'));
router.use('/mail', require('./mail.js'));

module.exports = router;