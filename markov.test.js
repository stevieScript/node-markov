const { describe } = require("node:test");

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
    
    test("can make text", function () {
        let mm = new MarkovMachine("the cat in the hat");
        let text = mm.makeText();
        expect(text.length).toBeGreaterThan(0);
    });

    test("can take an optional maxWords", function () {
        let mm = new MarkovMachine("the cat in the hat");
        let text = mm.makeText(5);
        expect(text.split(" ").length).toEqual(5);
    });
});