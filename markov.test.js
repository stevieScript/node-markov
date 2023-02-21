// const { describe } = require("node:test");
const {urlText, fileText, generateText} = require("./makeText");
const {MarkovMachine} = require("./markov");
const egg = require ("./eggs.txt");

describe("MarkovMachine", function () {

    test("can make chains", function () {
        let mm = new MarkovMachine("the cat in the hat");
        expect(mm.chains).toEqual(new Map([
            ["the", ["cat", "hat"]],
            ["cat", ["in"]],
            ["in", ["the"]],
            ["hat", [null]]
        ]));
    });
});



