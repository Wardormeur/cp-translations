const renderTemplate = require('./helpers/renderTemplate');

const supportedLocales = require('./supportedLocales');

describe('auth-create-reset', () => {
  supportedLocales.forEach((locale) => {
    it(`should render ${locale}`, async () => {
      await renderTemplate('auth-create-reset', locale, {
        name: 'Some Name',
        resetlink: 'http://example.com/reset',
        year: 2017,
      });
    });
  });
});