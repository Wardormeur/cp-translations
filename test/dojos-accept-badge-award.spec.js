const renderTemplate = require('./helpers/renderTemplate');

const supportedLocales = require('./supportedLocales');

describe('dojos-accept-badge-award', () => {
  supportedLocales.forEach((locale) => {
    it(`should render ${locale}`, async () => {
      await renderTemplate('accept-badge-award', locale, {
        badgeName: 'Some Badge',
        badgeImage: 'Some image',
        link: 'Some link',
        year: 2017,
      });
    });
  });
});