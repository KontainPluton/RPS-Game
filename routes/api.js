const express = require('express');

const gameRoute = require('./game');

const router = express.Router();

router.use('/game', gameRoute);

router.get('/', (req, res) => {
    res.send('Hello Api World !');
});

module.exports = router;
