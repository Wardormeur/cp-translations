// Build translations references
const ejs = require('ejs-html');
const glob = require('glob');
const fs = require('fs');
const _ = require('lodash');
module.exports = (() => {
  let files = {};
  function getFileName (directory) {
    return glob.sync(directory);
  }
  function getStringsFromFiles (fileName) {
    const file = fs.readFileSync(fileName);
    const rawTokens = ejs.parse(file.toString());
    const filePath = fileName.split('/');
    let fileNameKey = filePath[filePath.length - 1].replace('.html.ejs', '');
    const language = filePath[filePath.length -2].substr(-5).replace('-', ''); // -5 = language -> -xx_XX
    if (!files[fileNameKey]) files[fileNameKey] = [];
    files[fileNameKey][language] = []
    rawTokens.forEach((token) => {
      traverse(fileNameKey, language, token);
    })
  }
  // refactor to take the first level in
  function traverse (filename, language, node) {
    if (node.type.indexOf('ejs') < 0) {
      if (node.children) {
        node.children.forEach((_child) => {
          traverse(filename, language, _child);
        });
      }
      if(node.attributes) {
        node.attributes.forEach((_child) => {
          traverse(filename, language, _child);
        });
      }
      if(node.parts) {
        node.parts.forEach((_child) => {
          traverse(filename, language, _child);
        });
      }
    } else {
      if (node.type.indexOf('ejs') > -1) files[filename][language].push(node);
    }
  }

  function checkVariables (languages, snapshot, fileNameKey) {
    const langKeys = Object.keys(languages);
    if (snapshot && langKeys.length > 0) {
      const snapshotVars = snapshot.map((o) => o.content).sort();
      langKeys.forEach((lang) => {
        const vars = languages[lang].map((o) => o.content).sort();
        if (!_.isEqual(vars, snapshotVars)) {
          console.log('invalid', vars, lang, _.difference(vars, snapshotVars));
        } else {
          // console.log('valid', fileNameKey)
        }
      });
    } else {
      console.log('non matching', fileNameKey);
    }
  }
  console.log('loading ./crowdin/email-templates/*.html.ejs')
  const fileNames = getFileName("./crowdin/email-templates/**/*.html.ejs");
  const snapshot = require('./snapshot/variables');
  fileNames.forEach((fileName) => getStringsFromFiles(fileName));
  console.log('Checking discrepency');
  Object.keys(files).forEach((fileNameKey) => checkVariables(files[fileNameKey], snapshot[fileNameKey], fileNameKey));

  return files;
})()
