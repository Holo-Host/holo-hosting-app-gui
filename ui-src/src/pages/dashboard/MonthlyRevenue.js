// FOR HOSTS to track HF I/O flow

import React from 'react';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { translate } from 'react-admin';
import DollarIcon from '@material-ui/icons/AttachMoney';

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
        height: 52
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

// How much HF a user makes...
const MonthlyRevenue = ({ value, translate, classes }) => (
    <div className={classes.main}>
        <CardIcon Icon={DollarIcon} bgColor="#31708f" />
        <Card className={classes.card}>
            <Typography className={classes.title} color="textSecondary">
                {translate('pos.dashboard.monthly_revenue')}
            </Typography>
            <Typography variant="headline" component="h2">
                {value}
            </Typography>
        </Card>
    </div>
);

const enhance = compose(
    withStyles(styles),
    translate
);

export default enhance(MonthlyRevenue);
