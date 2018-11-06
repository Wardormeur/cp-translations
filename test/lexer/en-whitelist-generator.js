const util = require('util');
const glob = util.promisify(require('glob'));
const fs = require('fs');
const { getTokens } = require('./utils');
const writeFile = util.promisify(fs.writeFile);

(async () => {
  const originals = await glob('email-templates/*-en_US/*.ejs');
  let tokenTree = {};
  for (original of originals) {
    const referenceTokens = await getTokens(original);
    tokenTree[original] = referenceTokens;
  }
  const fileString = JSON.stringify(tokenTree);
  await writeFile('test/lexer/tokens-en-snapshot.json', fileString);

})();

