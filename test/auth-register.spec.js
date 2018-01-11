const renderTemplate = require('./helpers/renderTemplate');

const supportedLocales = require('./supportedLocales');

describe('auth-register', () => {
  supportedLocales.forEach((locale) => {
    it(`should render ${locale}`, async () => {
      await renderTemplate('auth-register', locale, {
        name: 'Some Name',
        year: 2017,
      });
    });
  });
});