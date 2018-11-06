const renderTemplate = require('./helpers/renderTemplate');

const supportedLocales = require('./supportedLocales');

describe('booking-confirmed', () => {
  supportedLocales.forEach((locale) => {
    it(`should render ${locale} when ticketApproval is true and position is set`, async () => {
      await renderTemplate('booking-confirmed', locale, {
        event: {
          name: 'Bar',
          address: '123 Fake St.',
          ticketApproval: true,
          position: {
            lat: 50,
            lng: 50,
          },
          description: 'Foo bar baz',
        },
        dojo: {
          id: 'foo',
          name: 'Foo',
          email: 'foo@example.com',
        },
        applications: [{
          name: 'John',
          ticketType: 'Youth',
          ticketName: 'Scratch',
        }],
        eventDate: 'June 6th, 2018',
        eventTime: '4pm - 6pm',
      });
    });

    it(`should render ${locale} when ticketApproval is false and position is not set`, async () => {
      await renderTemplate('booking-confirmed', locale, {
        event: {
          name: 'Bar',
          address: '123 Fake St.',
          ticketApproval: false,
          description: 'Foo bar baz',
        },
        dojo: {
          id: 'foo',
          name: 'Foo',
          email: 'foo@example.com',
        },
        applications: [{
          name: 'John',
          ticketType: 'Youth',
          ticketName: 'Scratch',
        }],
        eventDate: 'June 6th, 2018',
        eventTime: '4pm - 6pm',
      });
    });
  });
});