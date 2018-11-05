const util = require('util');
const lex = require('@buxlabs/ejs-lexer');
const glob = util.promisify(require('glob'));
const fs = require('fs');
const { expect } = require('chai');

const readFile = util.promisify(fs.readFile);

(async () => {
  const originals = await glob('email-templates/*-en_US/*.ejs');
  // const originals = await glob('email-templates/notify-all-members-*-en_US/*.ejs');
  for (const original of originals) {
    const referenceTokens = await getTokens(original);
    const filename = original.replace('en_US', '*');
    const translatedFiles = await glob(filename);
    describe(`should have the same content/interpolation for ${original}`, () => {
      for (const translatedFile of translatedFiles) {
        it(` for translation ${translatedFile}`, async () => {
          const translatedTokens = await getTokens(translatedFile);
          expect(translatedTokens).to.have.same.deep.members(referenceTokens);
        });
      }
    });
  }
  run();

  async function getTokens (filename) {
    const buff = await readFile(filename);
    // Dura lex, sed lex
    const tokens = lex(buff.toString('utf8'));
    const referenceTokens = filterStuffWeDontCareAbout(tokens);
    const cleanedTokens = trimWhitespaceForEvaluate(referenceTokens);
    return cleanedTokens;
  }

  function filterStuffWeDontCareAbout (tokens) {
    const filterStringToken = (token) => token.type !== 'string';
    return tokens.filter(filterStringToken);
  }
  function trimWhitespaceForEvaluate(tokens) {
    const filterStringToken = (token) => token.type === 'evaluate' ?
      { type: 'evaluate', value: token.value.replace(/\s/g, '') } :
      token;
    return tokens.map(filterStringToken);
  }
})();
