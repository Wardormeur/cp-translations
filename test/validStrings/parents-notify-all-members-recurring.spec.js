const renderTemplate = require('./helpers/renderTemplate');

const supportedLocales = require('./supportedLocales');

describe('parents-notify-all-members-recurring', () => {
  supportedLocales.forEach((locale) => {
    it(`should render ${locale}`, async () => {
      await renderTemplate('parents-notify-all-members-recurring', locale, {
        dojoMember: 'Some Name',
        event: {
          name: 'Some Event',
        },
        dojo: {
          name: 'Some Dojo',
          email: 'somedojo@coderdojo.com'
        },
        childrenName: 'Some Child',
        link: 'http://example.com',
        year: 2017,
      });
    });
  });
});