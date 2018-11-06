const util = require('util');
const glob = util.promisify(require('glob'));
const { getTokens } = require('./utils');
const { expect } = require('chai');
const strictTokens = require('./tokens-en-snapshot.json');
const laxedTokens = require('./tokens-laxed.json');


(async () => {
  // Create a unique referential for all tokens, strict and laxed
  const referenceTokens = mergeTokens(strictTokens, laxedTokens);
  for (const [filename, expectedTokens] of Object.entries(referenceTokens)) {
    const regFilename = filename.replace('en_US', '*');
    const translatedFiles = await glob(regFilename);
    describe(`should have the same content/interpolation for ${filename}`, () => {
      for (const translatedFile of translatedFiles) {
        it(` for translation ${translatedFile}`, async () => {
          const translatedTokens = await getTokens(translatedFile);
          // We need to exclude keys which are missing from the current but are present in whitelist
          for (token of translatedTokens) {
            expect(expectedTokens).to.deep.include(token);
          }
        });
      }
    });
  }
  run();

  function mergeTokens(strictTokens, laxedTokens) {
    const tokens = { ...strictTokens };
    Object.entries(laxedTokens).forEach(([key, laxedEntries]) => {
      tokens[key] = tokens[key].concat(laxedEntries);
    });
    return tokens; 
  } 
})();
