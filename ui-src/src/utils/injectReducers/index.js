/* Combine all reducers in this file and export the combined reducers. */
import { combineReducers } from 'redux';
import whoamiReducer from "./categoriesReducer";
import themeReducer from "./themeReducer"

const createRootReducer = (history: any) => {
  return combineReducers({
    // router: connectRouter(history),
    router: {}, // used by react-router-redux
    admin: {}, // used by react-admin
    i18n: {}, // used by react-admin
    form: {}, // used by redux-form
    themeReducer,
    whoamiReducer
  });
};

export default createRootReducer;

//////////////////////////////////////////////////////////////////////////////////////////////////
/* Combine all reducers in this file and export the combined reducers. */

// import { combineReducers } from 'redux-immutable';
// import { connectRouter } from 'connected-react-router/immutable';
// // import globalReducer from 'containers/App/reducer';
// // ** Reducer Middleware for React-Admin **
// import { routerReducer } from 'react-router-redux';
// import { reducer as formReducer } from 'redux-form';
// import {
//     adminReducer,
//     defaultI18nProvider,
//     i18nReducer
// } from 'react-admin';
//
// import history from './history';
// // import languageProviderReducer from 'containers/LanguageProvider/reducer';
//
// /**
//  * Merges the main reducer with the router state and dynamically injected reducers
//  */
// export default function createRootReducer(state, actions) {
//   console.log("createRootReducer state :::", state);
//   const rootReducer = combineReducers({
//     // global: globalReducer,
//     // language: languageProviderReducer, // comment this out, as it overlaps with the il8n???
//     admin: adminReducer,
//     i18n: i18nReducer(state.locale, defaultI18nProvider(state.locale)),
//     form: formReducer,
//     router: routerReducer,
//     ...state.injectedReducers,
//   });
//
//   // Wrap the root reducer and return a new root reducer with router state
//   const mergeWithRouterState = connectRouter(history);
//   return mergeWithRouterState(rootReducer);
// }
