const renderTemplate = require('./helpers/renderTemplate');

const supportedLocales = require('./supportedLocales');

describe('invite-user', () => {
  supportedLocales.forEach((locale) => {
    it(`should render ${locale}`, async () => {
      await renderTemplate('invite-user', locale, {
        userType: 'Mentor',
        dojoName: 'Some Dojo',
        link: 'http://example.com',
        year: 2017,
      });
    });
  });
});