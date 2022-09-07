const express = require('express');

const objectRoute = require('./objects');
const gameRoute = require('./game')

const router = express.Router();

router.use('/game', gameRoute);
router.use('/objects', objectRoute);

router.get('/', (req, res) => {
    res.send('Hello Api World !');
});

module.exports = router;
