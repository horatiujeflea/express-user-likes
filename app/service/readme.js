const showdown = require('showdown');
const fs = require('fs');
const path = require('path');

getReadmeHtml = () => {
    const readmePath = '/../../README.md';
    const readmeFile = fs.readFileSync(path.join(__dirname + readmePath), 'utf8');
    const readmeText = readmeFile.toString();
    const converter = new showdown.Converter();
    return converter.makeHtml(readmeText);
};

module.exports = {
    getReadmeHtml
};