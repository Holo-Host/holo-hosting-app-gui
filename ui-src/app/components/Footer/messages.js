/*
 * Footer Messages
 *
 * This contains all the text for the Footer component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Footer';

export default defineMessages({
  licenseMessage: {
    id: `${scope}.license.message`,
    defaultMessage: 'This project is licensed under the MIT license.',
  },
  orgMessage: {
    id: `${scope}.org.message`,
    defaultMessage: `
      Find out more about Holo Hosts at {org}.
    `,
  },
});
