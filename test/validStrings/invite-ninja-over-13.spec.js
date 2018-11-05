const renderTemplate = require('./helpers/renderTemplate');

const supportedLocales = require('./supportedLocales');

describe('invite-ninja-over-13', () => {
  supportedLocales.forEach((locale) => {
    it(`should render ${locale}`, async () => {
      await renderTemplate('invite-ninja-over-13', locale, {
        ninjaName: 'Some Ninja',
        parentName: 'Some Parent',
        parentEmail: 'someparent@example.com',
        link: 'http://example.com',
        year: 2017,
      });
    });
  });
});