import React from 'react';
import compose from 'recompose/compose';
import { translate } from 'react-admin';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';

import MonthlyRevenue from './MonthlyRevenue';
import RegisteredhApps from './RegisteredhApps';
import HostClients from './HostClients';

const styles = {
  flex: { display: 'flex' },
  flexColumn: { display: 'flex', flexDirection: 'column' }
};

const RegisteredDash = (type, classes) => (
  <div>
  { type === "provider" ?
      <div className={classes.flexColumn}>
        <div className={classes.flex}>
          <HostClients />
        </div>
        <div className={classes.flex}>
          <MonthlyRevenue />
        </div>
      </div>
  :
      <div className={classes.flexColumn}>
        <div className={classes.flex}>
          <RegisteredhApps />
        </div>
        <div className={classes.flex}>
          <MonthlyRevenue />
        </div>
      </div>
    }
  </div>
);

const enhance = compose(
    withStyles(styles),
    translate
);

export default enhance(RegisteredDash);
