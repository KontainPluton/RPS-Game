const fetch = require('node-fetch');

const express = require('express');
const app = express();

const apiRoute = require('../../routes/api');

const jsonParser = express.json();
app.use("/api", jsonParser, apiRoute);

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config();

let server = null;



beforeAll(() => {
    server = app.listen(3000);
});
afterEach(async () => {
    await timeout(500);
})

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let object = ["Air","Airplane","Alien","Axe","Baby","Beer","Bicycle","Bird","Blood","Book","Bowl","Brain","Butter","Cage","Camera","Car","Castle","Cat","Chain","Chainsaw","Church","Cloud","Cockroach","Community","Computer","Cross","Cup","Death","Devil","Diamond","Dragon","Duck","Dynamite","Electricity","Fence","Film","Fire","Fish","Gold","Grass","Guitar","Gun","Heart","Helicopter","Home","King","Laser","Law","Lightning","Man","Math","Medusa","Nuke","Platimum","Poison","Police","Porcupine","Power","Prayer","Prince","Princess","Queen","Quicksand","Rain","Rainbow","Robot","Rock","Satan","School","Scissors","Sky","Snake","Spider","Sponge","Sun","Sword","T.V.","Tank","Toilet","Tornado","Train","Tree","Turnip","U.F.O.","Vampire","Video Game","Vulture","Wall","Water","Whip","Wolf","Woman"]

describe("Test of different api route of game", () => {
    it("Game make nuke win", async () => {
        let savedGroup = await fetch("http://localhost:3000/api/game?object_one=nuke&object_two=tank", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        expect(savedGroup.status).toBe(200);

        let savedGroupData = await savedGroup.json();
        expect(savedGroupData.winner).toBe("Nuke");
        expect(savedGroupData.outcome).toBe("incinerates");
        expect(savedGroupData.loser).toBe("Tank");
    });

    it("Game agains't 'AI'", async () => {
        let savedGroup = await fetch("http://localhost:3000/api/game?object_one=nuke", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        expect(savedGroup.status).toBe(200);

        let savedGroupData = await savedGroup.json();

        expect(object).toContain(savedGroupData.winner);
        expect(object).toContain(savedGroupData.loser);
    });

    it("Crash game", async () => {
        let savedGroup = await fetch("http://localhost:3000/api/game", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        expect(savedGroup.status).toBe(400);
    });

    it("Api game with two parameters call under a second", async () => {
        let timeBefore = Date.now();
        let savedGroup = await fetch("http://localhost:3000/api/game?object_one=nuke&object_two=tank", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        let timeAfter = Date.now();

        expect(timeAfter - timeBefore).toBeLessThanOrEqual(1000);
        expect(savedGroup.status).toBe(200);
    });

    it("Api call with one parameter under a second", async () => {
        let timeBefore = Date.now();
        let savedGroup = await fetch("http://localhost:3000/api/game?object_one=nuke", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        let timeAfter = Date.now();

        expect(timeAfter - timeBefore).toBeLessThanOrEqual(1000);
        expect(savedGroup.status).toBe(200);
    });
});
