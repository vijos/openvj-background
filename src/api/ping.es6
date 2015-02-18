let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    res.json({'pong': Date.now()});
});

module.exports = router;