const renderTemplate = require('./helpers/renderTemplate');

const supportedLocales = require('./supportedLocales');

describe('ticket-application-cancelled', () => {
  supportedLocales.forEach((locale) => {
    it(`should render ${locale}`, async () => {
      await renderTemplate('ticket-application-cancelled', locale, {
        applicantName: 'Some Name',
        intro: 'Intro!',
        applicationDate: '01/01/1970',
        sessionName: 'Scratch',
        eventDate: '01/01/1970',
        event: {
          address: '123 Fake St.',
        },
        dojo: {
          email: 'somedojo@coderdojo.com',
        },
        year: 2017,
      });
    });
  });
});