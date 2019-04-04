// FOR BOTH HOSTS to monitor hosting clients.
// Holo Netowrk STATS >> the # of holo users for which a Host is providing hosting services... (ie how many instances/agents are being served at any point in time)

import React from 'react';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import { translate } from 'react-admin';
import hAppsIcon from '@material-ui/icons/Apps';

import CardIcon from './CardIcon';

const styles = theme => ({
    main: {
        flex: '1',
        marginLeft: '1.5em',
        marginTop: '2.5em',
    },
    card: {
        padding: '16px 0',
        overflow: 'inherit',
        textAlign: 'right',
    },
    title: {
        padding: '0 16px',
    },
    value: {
        padding: '0 16px',
        minHeight: 48,
    },
    avatar: {
        background: theme.palette.background.avatar,
    },
    listItemText: {
        paddingRight: 0,
    },
});

// HoloClients >> the # of holo users for which a Host is providing hosting services...
const RegisteredhApps = ({ happs, nb, translate, classes }) => (
  <div className={classes.main}>
      <CardIcon Icon={hAppsIcon} bgColor="#33076d" />
      <Card className={classes.card}>
          <Typography className={classes.title} color="textSecondary">
              {translate('pos.dashboard.registered_happs')}
          </Typography>
          <Typography variant="headline" component="h2">
              {happs}
          </Typography>
      </Card>
  </div>
);

const enhance = compose(
    withStyles(styles),
    translate
);

export default enhance(RegisteredhApps);
