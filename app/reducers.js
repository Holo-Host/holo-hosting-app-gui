/* Combine all reducers in this file and export the combined reducers. */

import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import globalReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
// ** Reducer Middleware for React-Admin **
// import history from 'utils/history';
// import { routerReducer } from 'react-router-redux';
// import { reducer as formReducer } from 'redux-form';
// import { adminReducer, defaultI18nProvider, i18nReducer } from 'react-admin';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createRootReducer(history,injectedReducers={}) {
  const rootReducer = combineReducers({
    global: globalReducer,
    language: languageProviderReducer,
    ...injectedReducers,
  });

  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}
