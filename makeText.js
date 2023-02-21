/** Command-line tool to generate Markov text. */
let axios = require("axios");
const fs = require("fs");
const { MarkovMachine } = require("./markov");
const process = require("process");

function generateText(text) {
    let mm = new MarkovMachine(text);
    console.log(mm.makeText());
}

async function urlText(url) {
    let res 
    try {
        res = await axios.get(url);
    }
    catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
    generateText(res.data);
}

function fileText(path) {
    fs.readFile(path, "utf8", function (err, data) {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
            generateText(data);
        }
    });
}

let [type, path] = process.argv.slice(2);


if (type === "file") {
    fileText(path);
} else if (type === "url") {
    urlText(path);
} else {
    console.error(`Unknown type: ${type}`);
    process.exit(1);
}


module.exports = {
    generateText,
    urlText,
    fileText,
};