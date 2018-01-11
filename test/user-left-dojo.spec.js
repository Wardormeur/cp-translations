const renderTemplate = require('./helpers/renderTemplate');

const supportedLocales = require('./supportedLocales');

describe('user-left-dojo', () => {
  supportedLocales.forEach((locale) => {
    it(`should render ${locale}`, async () => {
      await renderTemplate('user-left-dojo', locale, {
        dojoName: 'Some Dojo',
        name: 'Some Name',
        email: 'someuser@example.com',
        year: 2017,
      });
    });
  });
});