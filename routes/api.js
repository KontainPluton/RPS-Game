const express = require('express');

const gameRoute = require('./object');

const router = express.Router();

router.use('/game', gameRoute);

router.get('/', (req, res) => {
    res.send('Hello Api World !');
});

module.exports = router;
