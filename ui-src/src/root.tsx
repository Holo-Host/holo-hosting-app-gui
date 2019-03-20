import * as React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route, Redirect } from 'react-router';
import HomeAppContainer from './containers/HomeAppContainer';

import BankViewAppContainer from './containers/BankViewAppContainer';

const Root = ({ store, history }: { store: Store, history: any }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Redirect exact path='/' to='home' />
        // <Route path = '/bankstyleapp' component={BankViewAppContainer} />
        <Route path = '/home' component={HomeAppContainer} />
      //   <Route path = '/holofuelproposal' component={HomeAppContainer} />
      //   <Route path = '/holofuelrequest' component={HomeAppContainer} />
      //   <Route path = '/holofueltransactiondetails' component={HomeAppContainer} />
      //   <Route path = '/profile' component={HomeAppContainer} />
      //   <Route path = '/settings' component={HomeAppContainer} />
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default Root;
