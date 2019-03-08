/* Holo Host Homepage selectors */

import { createSelector } from 'reselect';
import { INITIAL_STATE } from './reducer';

const selectHostHome = state => state.get('hosthome', INITIAL_STATE);

const makeSelectUsername = () =>
  createSelector(selectHostHome, hosthomeState =>
    hosthomeState.get('username'),
  );

export { selectHostHome, makeSelectUsername };
