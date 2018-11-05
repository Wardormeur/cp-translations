const renderTemplate = require('./helpers/renderTemplate');

const supportedLocales = require('./supportedLocales');

describe('invited-to-session', () => {
  supportedLocales.forEach((locale) => {
    it(`should render ${locale}`, async () => {
      await renderTemplate('invited-to-session', locale, {
        applicantName: 'Some Name',
        dojo: {
          name: 'Some Dojo',
          email: 'somedojo@coderdojo.com',
        },
        sessionName: 'Some Session',
        ticket: {
          name: 'Some Ticket',
        },
        eventDate: '01/01/1970',
        event: {
          address: '123 Fake St.',
        },
        inviteLink: 'http://example.com',
        year: 2017,
      });
    });
  });
});