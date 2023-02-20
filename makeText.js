/** Command-line tool to generate Markov text. */
let axios = require("axios");
const fs = require("fs");
const { MarkovMachine } = require("./markov");

function generateText(text) {
    let mm = new MarkovMachine(text);
    console.log(mm.makeText());
    return mm.makeText();
}

function cat(type, path) {
    if(type === 'url'){
        axios.get(path).then(function (res) {
            generateText(res.data);
        }).catch(function (err) {
            console.error(`Error fetching ${path}: ${err}`);
            process.exit(1);
        });
    } else {

    fs.readFile(path, "utf8", function (err, data) {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
            generateText(data);
        }
    });
}}

let type = process.argv[2];
let path = process.argv[3];

if (path === undefined) {
    console.error(`Usage: node ${process.argv[1]} FILE`);
    process.exit(1);
}

cat(type, path);

