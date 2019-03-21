import {combineReducers, applyMiddleware, compose, createStore } from 'redux';
// import { createHashHistory } from 'history';
import { fromJS } from 'immutable';
import { createLogger } from 'redux-logger';
import { reducer as formReducer } from 'redux-form';
// import injectReducers from '../utils/injectReducers';
// import * as appActions from '../containers/App/actions';

// ** Middleware for ROUTING**
import { setPort } from '../utils/constants'
import { routerMiddleware } from 'connected-react-router/immutable';
// import { routerReducer } from 'react-router-redux';
import { connectRouter } from 'connected-react-router'
import { whoami } from "../utils/injectReducers/categoriesReducer";
import { is_registered_provider, is_registered_host } from "../utils/injectReducers/dashboardReducer";
import { registered_hApp_bundles, current_hApp_bundle_details, all_hApp_bundles } from "../utils/injectReducers/happsReducer";
import theme from "../utils/injectReducers/themeReducer"
// ** Middleware for Redux Saga **
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
// import * as groupOne from 'app/saga/injectedSagas'

// ** Middleware for React-Admin **
import {
    adminReducer,
    adminSaga,
    defaultI18nProvider,
    i18nReducer,
    formMiddleware,
    USER_LOGOUT,
} from 'react-admin';

// ** Middleware for HC Rust Container Communication *
import { holochainMiddleware } from '@holochain/hc-redux-middleware';
import { connect } from '@holochain/hc-web-client';

// const history = createHashHistory();
// const url = 'ws:localhost:3000';
const url = `ws:localhost:${setPort()}`
const hcWc = connect(url);
const sagaMiddleware = createSagaMiddleware();

const configureStore = ({
  // dataProvider,
    authProvider,
    i18nProvider = defaultI18nProvider,
    locale = 'en',
    history
}) => {
    const initialState = {
      i18nProvider: defaultI18nProvider,
      locale: 'en',
      history
    }

    const reducer = combineReducers({
        admin: adminReducer,
        i18n: i18nReducer(locale, i18nProvider(locale)),
        form: formReducer,
        router: connectRouter(history),
        // router: routerReducer,

        /* add your own reducers here */
        theme,
        whoami,
        is_registered_provider,
        is_registered_host,
        registered_hApp_bundles,
        current_hApp_bundle_details,
        all_hApp_bundles
    });
    const resettableAppReducer = (state, action) => reducer(action.type !== USER_LOGOUT ? state : undefined, action);

    const combinedSagas = adminSaga(authProvider, i18nProvider);
    const saga = function* rootSaga() {
        yield all(
            [
                combinedSagas,
                // add your own sagas here :// injectedSagas

            ].map(fork)
        );
    };

    // Logging Middleware
    const logger = createLogger({
      level: 'info',
      collapsed: true
    });

    // console.log(":::::::::::::::::::::::::::::::::::");
    // console.log("THIS APP: Local Reducer:", reducer);
    // console.log("THIS APP: Local Reducer ACTION >>> :", reducer.action);
    // console.log("THIS APP: Local Reducer STATE >>>>:", reducer.state);
    // console.log("THIS APP: adminReducer >>> :", adminReducer);
    // console.log("THIS APP: formReducer >>> :", formReducer);
    // console.log("resettableAppReducer: ", resettableAppReducer);
    // console.log(":::::::::::::::::::::::::::::::::::");

    const store = createStore(
        resettableAppReducer,
        fromJS(initialState),
        compose(
            applyMiddleware(
                sagaMiddleware,
                formMiddleware,
                routerMiddleware(history),
                // add your own middlewares here:
                logger,
                holochainMiddleware(hcWc),
            ),
            typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
                ? window.__REDUX_DEVTOOLS_EXTENSION__()
                : f => f
            // add your own enhancers here
        )
    );

    if (module.hot) {
      module.hot.accept(
        // '../utils/reducer',
        // eslint-disable-next-line global-require
        () => store.replaceReducer(reducer) // store.replaceReducer(createRootReducer(store.injectedReducers))
      );
    }

    sagaMiddleware.run(saga);
    return store;
};

export default configureStore;
