const util = require('util');
const glob = util.promisify(require('glob'));
const { getTokens } = require('./utils');
const { expect } = require('chai');
const strictTokens = require('./tokens-en-snapshot.json');
const laxTokens = require('./tokens-lax.json');


(async () => {
  // Create a unique referential for all tokens, strict and lax
  const referenceTokens = mergeTokens(strictTokens, laxTokens);
  const entries = Object.entries(referenceTokens);
  for (const [filename, expectedTokens] of entries) {
    const regFilename = filename.replace('en_US', '+([a-z])_+([A-Z])');
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

  function mergeTokens(strictTokens, laxTokens) {
    const tokens = { ...strictTokens };
    Object.entries(laxTokens).forEach(([key, laxEntries]) => {
      tokens[key] = tokens[key].concat(laxEntries);
    });
    return tokens; 
  } 
})();
