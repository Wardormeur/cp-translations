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
    const rawTokens = ejs.parse(file.toString());
    const filePath = fileName.split('/');
    const fileNameKey = filePath[filePath.length - 1].replace('.html.ejs', '').replace('-en_US', '');
    files[fileNameKey] = [];
    rawTokens.forEach((token) => {
      traverse(fileNameKey, token);
    })
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
      // Group under a generic key : 'templateName instead of ./path/to/template.html.ejs'
      if (node.type.indexOf('ejs') > -1) files[filename].push(node);
    }
  }
  // TODO : exclude includes of footer/header
  console.log('grabbing email-templates for en_us');
  const fileNames = getFileName("./email-templates/**-en_US/*.html.ejs");
  fileNames.forEach((fileName) => getStringsFromFiles(fileName));
  console.log('writing snapshot/variables');
  fs.writeFileSync('snapshot/variables.js', 'module.exports = ' + JSON.stringify(files));

  return files;
})()
