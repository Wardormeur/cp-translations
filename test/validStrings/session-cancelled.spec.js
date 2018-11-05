const renderTemplate = require('./helpers/renderTemplate');

const supportedLocales = require('./supportedLocales');

describe('session-cancelled', () => {
  supportedLocales.forEach((locale) => {
    it(`should render ${locale}`, async () => {
      await renderTemplate('session-cancelled', locale, {
        applicantName: 'Some Name',
        eventDate: '01/01/1970',
        sessionName: 'Scratch',
        dojo: {
          name: 'Some Dojo',
        },
        year: 2017,
      });
    });
  });
});