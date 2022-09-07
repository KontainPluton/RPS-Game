const fetch = require('node-fetch');
const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    let object1 = req.query.object_one;
    let object2 = req.query.object_two;
    let url = process.env.RPS_API_URL + "/match?object_one=" + object1 +"&object_two=" + object2;
    fetch(url)
        .then(function(response) {
            let contentType = response.headers.get("content-type");
            if(contentType && contentType.indexOf("application/json") !== -1) {
                return response.json().then(function(json) {
                    res.send(json);
                });
            }
            else {
                res.status(400).send(new Error("No json provided"));
            }
        })
});

module.exports = router;
