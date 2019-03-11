// app main imports:
import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
// app setup imports:
import englishMessages from './utils/i18n/en';
import { configureStore } from './store/configureStore';
import history from './utils/history';
import App from './App';
// import 'sanitize.css/sanitize.css';
import './index.css';

const authProvider = () => Promise.resolve();
// const dataProvider = restProvider('http://path.to.my.api/');

const i18nProvider = locale => {
    if (locale === 'fr') {
        return import('./utils/i18n/fr').then(messages => messages.default);
    }
    // Always fallback on english
    return englishMessages;
};

const initialState = {
  authProvider,
  // dataProvider,
  i18nProvider,
  history
};
const store = configureStore(initialState);
const MOUNT_REACT_NODE = document.getElementById('root');

  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    MOUNT_REACT_NODE,
  );
