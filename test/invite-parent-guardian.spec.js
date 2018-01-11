const renderTemplate = require('./helpers/renderTemplate');

const supportedLocales = require('./supportedLocales');

describe('invite-parent-guardian', () => {
  supportedLocales.forEach((locale) => {
    it(`should render ${locale}`, async () => {
      await renderTemplate('invite-parent-guardian', locale, {
        parentName: 'Some Parent',
        childName: 'Some Child',
        link: 'http://example.com',
        year: 2017,
      });
    });
  });
});