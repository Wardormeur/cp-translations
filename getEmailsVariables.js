// Build translations references
const ejs = require('ejs-html');
const glob = require('glob');
const fs = require('fs');
module.exports = (() => {
  let files = {};
  function getFileName (directory) {
    return glob.sync(directory);
  }
  function getStringsFromFiles (fileName) {
    const file = fs.readFileSync(fileName);
    console.log(fileName, file.toString())
    const rawTokens = ejs.parse(file.toString());
    files[fileName] = [];
    rawTokens.forEach((token) => {
      traverse(fileName, token);
    })
    console.log(files[fileName]);
  }
  // refactor to take the first level in
  function traverse (filename, node) {
    if (node.type.indexOf('ejs') < 0) {
      if (node.children) {
        node.children.forEach((_child) => {
          traverse(filename, _child);
        });
      }
      if(node.attributes) {
        node.attributes.forEach((_child) => {
          traverse(filename, _child);
        });
      }
      if(node.parts) {
        node.parts.forEach((_child) => {
          traverse(filename, _child);
        });
      }
    } else {
      if (node.type.indexOf('ejs') > -1) files[filename].push(node);
    }
  }
  const fileNames = getFileName("./email-templates/**-en_US/*.html.ejs");
  fileNames.forEach((fileName) => getStringsFromFiles(fileName));

  return files;
})()
