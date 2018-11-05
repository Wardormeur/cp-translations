const renderTemplate = require('./helpers/renderTemplate');

const supportedLocales = require('./supportedLocales');

describe('user-request-to-join', () => {
  supportedLocales.forEach((locale) => {
    it(`should render ${locale}`, async () => {
      await renderTemplate('user-request-to-join', locale, {
        dojoName: 'Some Dojo',
        userType: 'Mentor',
        name: 'Some Name',
        email: 'someuser@example.com',
        link: 'http://example.com',
        year: 2017,
      });
    });
  });
});