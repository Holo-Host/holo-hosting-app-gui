import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './root';
import { configureStore, history } from './store/configureStore';
const store = configureStore();

ReactDOM.render(<Root history={history} store={store} />, document.querySelector('#root'));
