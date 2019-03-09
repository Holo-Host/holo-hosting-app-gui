import { createStore, applyMiddleware, compose } from 'redux';
import { createHashHistory } from 'history';
import { fromJS } from 'immutable';
import { createLogger } from 'redux-logger';
// ** Middleware for ROUTING**
import { routerActions } from 'connected-react-router';
import { routerMiddleware } from 'connected-react-router/immutable';
// ** Middleware for Redux Saga **
import createSagaMiddleware from 'redux-saga';

// ** Middleware for HC Rust Container Communication *
import { holochainMiddleware } from '@holochain/hc-redux-middleware';
import { connect } from '@holochain/hc-web-client';
import createRootReducer from '../reducers';
import * as appActions from '../containers/App/actions';
// import { setPort } from '../../utils/constants'

/* * Holochain Web Socket Setup * */
// const url = `ws:localhost:${setPort()}`
const url = 'ws:localhost:3100';
const hcWc = connect(url);

const history = createHashHistory();
const sagaMiddleware = createSagaMiddleware();
const rootReducer = createRootReducer(history);

const configureStore = (initialState = {}) => {
  // Redux Configuration
  const middleware = [];
  const enhancers = [];

  // Logging Middleware
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  });

  // Skip redux logs in console during the tests
  if (process.env.NODE_ENV !== 'test') {
    middleware.push(logger);
  }

  // Redux saga middleware
  middleware.push(sagaMiddleware);

  // Router Middleware
  const router = routerMiddleware(history);
  middleware.push(router);

  // ** HC Rust Container Middleware ** >> Push HC middleware into middleware array //
  middleware.push(holochainMiddleware(hcWc));

  // Redux DevTools Configuration
  const actionCreators = {
    ...appActions,
    ...routerActions,
  };

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Options: http://extension.remotedev.io/docs/API/Arguments.html
        actionCreators,
    })
    : compose;

  // Apply Middleware & Compose Enhancers
  enhancers.push(applyMiddleware(...middleware));
  const storeEnhancer = composeEnhancers(...enhancers);

  // Create Store
  const store = createStore(rootReducer, fromJS(initialState), storeEnhancer);

  // Extensions
  store.runSaga = () => sagaMiddleware.run();
  store.injectedReducers = {}; // Reducer registry  // middleware.push(logger);
  store.injectedSagas = {}; // Saga registry

  if (module.hot) {
    module.hot.accept(
      '../reducers',
      // eslint-disable-next-line global-require
      () => store.replaceReducer(createRootReducer(history, store.injectedReducers)),
    );
  }
  return store;
};

export default { configureStore, history };
