const renderTemplate = require('./helpers/renderTemplate');

const supportedLocales = require('./supportedLocales');

describe('notify-all-members-recurring', () => {
  supportedLocales.forEach((locale) => {
    it(`should render ${locale}`, async () => {
      await renderTemplate('notify-all-members-recurring', locale, {
        dojoMember: 'Some Name',
        event: {
          name: 'Some Event',
        },
        dojo: {
          name: 'Some Dojo',
          email: 'somedojo@coderdojo.com'
        },
        link: 'http://example.com',
        year: 2017,
      });
    });
  });
});