let express = require('express');
let router = express.Router();

router.use('/ping', require('./ping.js'));

module.exports = router;