const express = require('express');

const objectRoute = require('./objects');
const gameRoute = require('./game')

const router = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.use('/game', gameRoute);
router.use('/objects', objectRoute);

router.get('/', (req, res) => {
    res.send('Hello Api World !');
});

module.exports = router;
