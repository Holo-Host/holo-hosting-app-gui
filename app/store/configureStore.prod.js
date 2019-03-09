// @flow
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createHashHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
// ** Middleware for HC Rust Container Communication ** >> Reference Holochain-UI //
import { holochainMiddleware } from '@holochain/hc-redux-middleware';
import { connect } from '@holochain/hc-web-client'; // '@holochain/hc-web-client'
import createRootReducer from '../reducers';
// import { setPort } from '../../utils/constants'

const history = createHashHistory();
const rootReducer = createRootReducer(history);
const router = routerMiddleware(history);
const url = 'ws:localhost:3000';
// const url = `ws:localhost:${setPort()}`
const sagaMiddleware = createSagaMiddleware();
const hcWc = connect(url);
const holochain = holochainMiddleware(hcWc);
const enhancer = applyMiddleware(sagaMiddleware, router, holochain);

const configureStore = (initialState) => {
  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };
