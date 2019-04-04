// app main imports:
import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
// app setup imports:
import englishMessages from './utils/i18n/en';
import { configureStore } from './store/configureStore';

// import { createBrowserHistory } from 'history';
import history from './utils/history';
import App from './App';
import dataProviderFactory from './utils/dataProvider';
// const dataProvider = restProvider('http://path.to.my.api/');
import './index.css';

const authProvider = () => Promise.resolve();
// import 'sanitize.css/sanitize.css';

const i18nProvider = locale => {
    if (locale === 'fr') {
        return import('./utils/i18n/fr').then(messages => messages.default);
    }
    // Always fallback on english
    return englishMessages;
};

const dataProvider = async() => {
  const dataResult = await dataProviderFactory('rest');
  return dataResult;
}
console.log("dataProvider inside of INDEX.js", dataProvider)

const initialState = {
  dataProvider,
  authProvider,
  i18nProvider,
  // history
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
