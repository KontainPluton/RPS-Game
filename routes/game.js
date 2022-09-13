const fetch = require('node-fetch');
const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', async (req, res) => {
    let object1 = req.query.object_one;
    let object2 = req.query.object_two;
    if (object1 == null) {
        res.status(400).send(new Error("Invalid signature"));
    }
    else if (object2 == null) {
        object2 = await generate();
    }
    let url = process.env.RPS_API_URL + "/match?object_one=" + object1 +"&object_two=" + object2;
    fetch(url)
        .then(function(response) {
            let contentType = response.headers.get("content-type");
            if(contentType && contentType.indexOf("application/json") !== -1) {
                response.json().then(function(json) {
                    res.send(json);
                });
            }
            else {
                res.status(400).send(new Error("No json provided"));
            }
        });
});

async function generate() {
    let url = "http://localhost:3000/api/objects/";
    let value;
    await fetch(url)
        .then(async function (response) {
            await response.json().then(function (tab) {
                value = tab[Math.floor(Math.random() * tab.length)];
            });
        })
        .catch(async function (error) {
            res.status(500).send(new Error("Internal server error : " + error));
        });

    return value;
}

module.exports = router;
