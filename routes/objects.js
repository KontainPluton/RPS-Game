const express = require('express')
const fetch = require("node-fetch");

const router = express.Router()

let test = ["Air",
    "Airplane",
    "Alien",
    "Axe",
    "Baby",
    "Beer",
    "Bicycle",
    "Bird",
    "Blood",
    "Book",
    "Bowl",
    "Brain",
    "Butter",
    "Cage",
    "Camera",
    "Car",
    "Castle",
    "Cat",
    "Chain",
    "Chainsaw",
    "Church",
    "Cloud",
    "Cockroach",
    "Community",
    "Computer",
    "Cross",
    "Cup",
    "Death",
    "Devil",
    "Diamond",
    "Dragon",
    "Duck",
    "Dynamite",
    "Electricity",
    "Fence",
    "Film",
    "Fire",
    "Fish",
    "Gold",
    "Grass",
    "Guitar",
    "Gun",
    "Heart",
    "Helicopter",
    "Home",
    "King",
    "Laser",
    "Law",
    "Lightning",
    "Man",
    "Math",
    "Medusa",
    "Nuke",
    "Platimum",
    "Poison",
    "Police",
    "Porcupine",
    "Power",
    "Prayer",
    "Prince",
    "Princess",
    "Queen",
    "Quicksand",
    "Rain",
    "Rainbow",
    "Robot",
    "Rock",
    "Satan",
    "School",
    "Scissors",
    "Sky",
    "Snake",
    "Spider",
    "Sponge",
    "Sun",
    "Sword",
    "T.V.",
    "Tank",
    "Toilet",
    "Tornado",
    "Train",
    "Tree",
    "Turnip",
    "U.F.O.",
    "Vampire",
    "Video Game",
    "Vulture",
    "Wall",
    "Water",
    "Whip",
    "Wolf",
    "Woman"]


router.get('/', (req, res) => {
    res.json(test);
});

router.get('/:object', async (req, res) => {
    let url = process.env.RPS_API_URL + "/objects/" + req.params.object;
    await fetch(url)
        .then(function (response) {
            let contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                response.json().then(function (json) {
                    res.send(json);
                });
            } else {
                res.status(400).send(new Error("No json provided"));
            }
        });
});

module.exports = router;
