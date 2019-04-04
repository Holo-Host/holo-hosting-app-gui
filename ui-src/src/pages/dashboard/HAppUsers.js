// FOR BOTH HOSTS and PROVIDERS to monitor users of certain happs.
// happ STATS >> the # of users an happ has (ie how many times it's been actively installed - uninstalled)

// Should we sum the total, or show for most popular apps?

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
import CustomerIcon from '@material-ui/icons/PersonAdd';

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

// hAppUsers >> the # of users a certian happ has (ie how many times it's been actively installed - uninstalled)
// ..should we sum the users of all apps, to show how many users an app provider has in total ?
const hAppUsers = ({ hAppUsers = [], nb, translate, classes }) => (
    <div className={classes.main}>
        <CardIcon Icon={CustomerIcon} bgColor="#4caf50" />
        <Card className={classes.card}>
            <Typography className={classes.title} color="textSecondary">
                {translate('pos.dashboard.new_customers')}
            </Typography>
            <Typography
                variant="headline"
                component="h2"
                className={classes.value}
            >
                {nb}
            </Typography>
            <Divider />
            <List>
                {hAppUsers.map(record => (
                    <ListItem
                        button
                        to={`/happs/${record.id}`}
                        component={Link}
                        key={record.id}
                    >
                        <Avatar
                            src={`${record.avatar}?size=32x32`}
                            className={classes.avatar}
                        />
                        <ListItemText
                            primary={`${record.first_name} ${record.last_name}`}
                            className={classes.listItemText}
                        />
                    </ListItem>
                ))}
            </List>
        </Card>
    </div>
);

const enhance = compose(
    withStyles(styles),
    translate
);

export default enhance(hAppUsers);
