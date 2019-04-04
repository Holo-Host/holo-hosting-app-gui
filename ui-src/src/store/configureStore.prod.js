// Main Imports :
import {combineReducers, applyMiddleware, createStore } from 'redux';
import { fromJS } from 'immutable';
// import reducer from '../utils/reducer';
// import injectReducers from '../utils/injectReducers';
import { reducer as formReducer } from 'redux-form';

// import { createHashHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { routerMiddleware } from 'connected-react-router';
// ** Middleware for HC Rust Container Communication ** >> Reference Holochain-UI //
import { holochainMiddleware } from '@holochain/hc-redux-middleware';
import { connect } from '@holochain/hc-web-client'; // '@holochain/hc-web-client'
// import createRootReducer from '../utils/rootReducer';
import { setPort } from '../utils/constants'

import history from '../utils/history';

// ** Middleware for React-Admin **
import {
    adminReducer,
    adminSaga,
    defaultI18nProvider,
    i18nReducer,
} from 'react-admin';

/* The url PORT is now a env.process variable set within the package.json scripts: */
const url = `ws:localhost:${setPort()}`
const hcWc = connect(url);
const holochain = holochainMiddleware(hcWc);
const router = routerMiddleware();
const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(sagaMiddleware, router, holochain);
const configureStore = ({
    dataProvider,
    authProvider,
    i18nProvider = defaultI18nProvider,
    locale = 'en',
    // history
}) => {
  console.log("insider the CONFIGURE STORE : DATAPROVIDER : ", dataProvider );

  const initialState = {
    i18nProvider: defaultI18nProvider,
    locale: 'en',
    // history
  }

  const reducer = combineReducers({
      admin: adminReducer,
      i18n: i18nReducer(locale, i18nProvider(locale)),
      form: formReducer,
      router: routerMiddleware(history),
      // router: connectRouter(history),

      /* add your own reducers here */
      /* injectReducers */
  });

  const combinedSagas = adminSaga(authProvider, i18nProvider);
  const saga = function* rootSaga() {
      yield all(
          [
              combinedSagas,
              // add your own sagas here :// injectedSagas
          ].map(fork)
      );
  };

  const store = createStore(
    reducer,
    fromJS(initialState),
    enhancer
  );

  sagaMiddleware.run(saga);
  return store;
}

export default configureStore;
