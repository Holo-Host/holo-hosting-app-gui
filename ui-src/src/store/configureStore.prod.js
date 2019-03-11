import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
// ** Middleware for HC Rust Container Communication ** >> Reference Holochain-UI //
import { holochainMiddleware } from '@holochain/hc-redux-middleware';
import { connect } from '@holochain/hc-web-client'; // '@holochain/hc-web-client'
import createRootReducer from '../utils/rootReducer';
import { setPort } from '../utils/constants'

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
/* The url PORT is now a env.process variable set within the package.json scripts: */
const url = `ws:localhost:${setPort()}`
const sagaMiddleware = createSagaMiddleware();
const hcWc = connect(url);
const holochain = holochainMiddleware(hcWc);
const enhancer = applyMiddleware(sagaMiddleware, router, holochain);

const configureStore = initialState =>
  createStore(rootReducer, initialState, enhancer);

export default { configureStore, history };
