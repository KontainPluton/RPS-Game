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
afterAll(() => {
    server.close();
});<<<<<<<<

let objects = ["Air","Airplane","Alien","Axe","Baby","Beer","Bicycle","Bird","Blood","Book","Bowl","Brain","Butter","Cage","Camera","Car","Castle","Cat","Chain","Chainsaw","Church","Cloud","Cockroach","Community","Computer","Cross","Cup","Death","Devil","Diamond","Dragon","Duck","Dynamite","Electricity","Fence","Film","Fire","Fish","Gold","Grass","Guitar","Gun","Heart","Helicopter","Home","King","Laser","Law","Lightning","Man","Math","Medusa","Nuke","Platimum","Poison","Police","Porcupine","Power","Prayer","Prince","Princess","Queen","Quicksand","Rain","Rainbow","Robot","Rock","Satan","School","Scissors","Sky","Snake","Spider","Sponge","Sun","Sword","T.V.","Tank","Toilet","Tornado","Train","Tree","Turnip","U.F.O.","Vampire","Video Game","Vulture","Wall","Water","Whip","Wolf","Woman"]
let reasons = [["poisons","Sky"],["incinerates","Tank"],["incinerates","Helicopter"],["outclasses","Dynamite"],["outclasses","Tornado"],["incinerates","Quicksand"],["emerges from","Pit"],["starts reaction","Chain"],["outclasses","Gun"],["breaks","Law"],["incinerates","Whip"],["incinerates","Sword"],["incinerates","Rock"],["causes","Death"],["incinerates","Wall"],["has power of","Sun"],["incinerates","Camera"],["starts","Fire"],["incinerates","Chainsaw"],["incinerates","School"],["incinerates","Scissors"],["incinerates","Poison"],["incinerates","Cage"],["incinerates","Axe"],["breaks","Peace"],["incinerates","Computer"],["incinerates","Castle"],["incinerates","Snake"],["incinerates","Blood"],["incinerates","Porcupine"],["incinerates","Vulture"],["incinerates","Monkey"],["incinerates","King"],["incinerates","Queen"],["incinerates","Prince"],["incinerates","Princess"],["incinerates","Police"],["incinerates","Woman"],["incinerates","Baby"],["incinerates","Man"],["incinerates","Home"],["incinerates","Train"],["incinerates","Car"],["makes","Noise"],["incinerates","Bicycle"],["incinerates","Tree"],["incinerates","Turnip"],["incinerates","Duck"],["incinerates","Wolf"],["incinerates","Cat"]]

describe("Test of different api route of object", () => {
    it("Get all the list of objects", async () => {
        let savedGroup = await fetch("http://localhost:3000/api/objects", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        expect(savedGroup.status).toBe(200);

        let savedGroupData = await savedGroup.json();

        for(let object of savedGroupData) {
            expect(objects).toContain(object)
        }
    });

    it("Get description of nuke", async () => {
        let savedGroup = await fetch("http://localhost:3000/api/objects/nuke", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        expect(savedGroup.status).toBe(200);

        let savedGroupData = await savedGroup.json();

        expect(savedGroupData.object).toBe("nuke");
        for(let outcome of savedGroupData['winning outcomes']) {
            expect(reasons).toContainEqual(outcome);
        }
    });

    it("Get description of an object that didn't exist", async () => {
        let savedGroup = await fetch("http://localhost:3000/api/objects/test", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        expect(savedGroup.status).toBe(400);
    });

    it("Api objects call under a second", async () => {
        let timeBefore = Date.now();
        let savedGroup = await fetch("http://localhost:3000/api/objects", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        let timeAfter = Date.now();

        expect(timeAfter - timeBefore).toBeLessThanOrEqual(1000);
        expect(savedGroup.status).toBe(200);
    });

    it("Api objects/object under a second", async () => {
        let timeBefore = Date.now();
        let savedGroup = await fetch("http://localhost:3000/api/objects/nuke", {
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

