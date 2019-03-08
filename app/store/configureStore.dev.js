import { createStore, applyMiddleware, compose } from 'redux';
import { createHashHistory } from 'history';
import { fromJS } from 'immutable';
import { createLogger } from 'redux-logger';
import * as appActions from '../containers/App/actions';
import createRootReducer from '../reducers';

// ** Middleware for ROUTING**
import { routerActions } from 'connected-react-router';
import { routerMiddleware } from 'connected-react-router/immutable';
// ** Middleware for Redux Saga **
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

// import * as groupOne from 'app/saga/injectedSagas'

// ** Middleware for React-Admin **
import {
    adminSaga,
    // defaultI18nProvider,
    formMiddleware,
    USER_LOGOUT,
} from 'react-admin';

// ** Middleware for HC Rust Container Communication *
import { holochainMiddleware } from '@holochain/hc-redux-middleware';
import { connect } from '@holochain/hc-web-client';
// import { setPort } from '../../utils/constants'

let global_injectedReducers;

const resettableAppReducer = (state, action,global_injectedReducers={}) => {
  const newState = {...state, injectedReducers:global_injectedReducers}
  createRootReducer(action.type !== USER_LOGOUT ? newState : {}, action);
}


const url = 'ws:localhost:3100';
// const url = `ws:localhost:${setPort()}`
const hcWc = connect(url);
const history = createHashHistory();
const sagaMiddleware = createSagaMiddleware();

const configureStore = (initialState = {
    authProvider,
    dataProvider,
    i18nProvider: defaultI18nProvider(),
    locale:'en',
    history
}) => {

    // Redux Configuration
    const middleware = [];
    const enhancers = [];

    // Logging Middleware
    const logger = createLogger({
      level: 'info',
      collapsed: true
    });

    // Skip redux logs in console during the tests
    if (process.env.NODE_ENV !== 'test') {
      middleware.push(logger);
    }

    // console.log("initialState : ", initialState);

    const combinedSagas = adminSaga(initialState.dataProvider, initialState.authProvider, initialState.i18nProvider); // injectedSagas

    const saga = function* rootSaga() {
      yield all(
         [
             combinedSagas,
             // add your own sagas here
         ].map(fork)
     );
    }

    // Redux saga middleware
    middleware.push(sagaMiddleware);

    // Router Middleware
    const router = routerMiddleware(history);
    middleware.push(router);

    // ** HC Rust Container Middleware ** >> Push HC middleware into middleware array //
    middleware.push(holochainMiddleware(hcWc));

    // ** react-admin middleware ** >> Push react-admin middleware into middleware array //
    middleware.push(
      formMiddleware
    );

    // Redux DevTools Configuration
    const actionCreators = {
      ...appActions,
      ...routerActions
    };

    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    /* eslint-disable no-underscore-dangle */
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Options: http://extension.remotedev.io/docs/API/Arguments.html
          actionCreators
        })
      : compose;

    // Apply Middleware & Compose Enhancers
    enhancers.push(applyMiddleware(...middleware));
    const storeEnhancer = composeEnhancers(...enhancers);


    // Create Store
    const store = createStore(resettableAppReducer, fromJS(initialState), storeEnhancer);

    // Extensions
    store.runSaga = () => sagaMiddleware.run(saga);
    store.injectedReducers = {}; // Reducer registry  // middleware.push(logger);
    store.injectedSagas = {}; // Saga registry

    // const rootReducer = createRootReducer();
    global_injectedReducers = store.injectedReducers;

    if (module.hot) {
      module.hot.accept(
        '../reducers',
        // eslint-disable-next-line global-require
        () => store.replaceReducer(resettableAppReducer) // createRootReducer(store.injectedReducers)
      );
    }
    store.runSaga();
    return store;
};

export default configureStore;
