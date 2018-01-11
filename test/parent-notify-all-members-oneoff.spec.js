const renderTemplate = require('./helpers/renderTemplate');

const supportedLocales = require('./supportedLocales');

describe('parents-notify-all-members-oneoff', () => {
  supportedLocales.forEach((locale) => {
    it(`should render ${locale}`, async () => {
      await renderTemplate('parents-notify-all-members-oneoff', locale, {
        dojoMember: 'Some Name',
        event: {
          name: 'Some Event',
          date: '01/01/1970',
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