const fs = require('fs');
const lex = require('@buxlabs/ejs-lexer');
const util = require('util');

const readFile = util.promisify(fs.readFile);

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

module.exports = {
  getTokens: async function (filename) {
    const buff = await readFile(filename);
    // Dura lex, sed lex
    const tokens = lex(buff.toString('utf8'));
    const referenceTokens = filterStuffWeDontCareAbout(tokens);
    const cleanedTokens = trimWhitespaceForEvaluate(referenceTokens);
    return cleanedTokens;
  }
}
