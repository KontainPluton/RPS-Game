const express = require('express')

const router = express.Router()

const objects = [
    "Air",
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
    "Woman",]

router.get('/', (req, res) => {
    res.send(JSON.stringify(objects));
});

module.exports = router;