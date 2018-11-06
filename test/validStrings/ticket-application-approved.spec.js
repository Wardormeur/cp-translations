const renderTemplate = require('./helpers/renderTemplate');

const supportedLocales = require('./supportedLocales');

describe('ticket-application-approved', () => {
  supportedLocales.forEach((locale) => {
    it(`should render ${locale}`, async () => {
      await renderTemplate('ticket-application-approved', locale, {
        applicantName: 'Joe Bloggs',
        intro: 'Hello',
        applicationDate: '01/01/1970',
        sessionName: 'Scratch',
        tickets: [
          {
            ticketName: 'Parent',
            ticketType: 'parent-guardian',
            quantity: 1
          },
          {
            ticketName: 'Youth',
            ticketType: 'ninja',
            quantity: 1
          },
        ],
        status: 'Approved',
        eventDate: '01/01/1970',
        event: {
          address: '123 Fake St.',
        },
        dojo: {
          email: 'mydojo@coderdojo.com',
        },
        applicationId: null,
        year: 2017,
      });
    });
  });
});