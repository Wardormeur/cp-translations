const renderTemplate = require('./helpers/renderTemplate');

const supportedLocales = require('./supportedLocales');

describe('google-email-pass', () => {
  supportedLocales.forEach((locale) => {
    it(`should render ${locale}`, async () => {
      await renderTemplate('google-email-pass', locale, {
        dojo: 'Some Dojo',
        email: 'somedojo@coderdojo.com',
        temp_pass: 'MyTempPass',
        year: 2017,
      });
    });
  });
});