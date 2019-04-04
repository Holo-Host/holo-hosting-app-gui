import React from 'react';
import compose from 'recompose/compose';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { translate } from 'react-admin';
import { stringify } from 'query-string';
import RegisterIcon from '@material-ui/icons/Assignment';

const styles = {
    icon: { paddingRight: '0.5em' },
    link: {
        display: 'inline-flex',
        alignItems: 'center',
    },
};

const LinkToRelatedRegisterForm = ({ classes, segment, translate }) => (
    <Button
        size="small"
        color="primary"
        component={Link}
        to={{
            pathname: '/register',
            search: stringify({
                page: 1,
                perPage: 25,
                filter: JSON.stringify({ groups: segment }),
            }),
        }}
        className={classes.link}
    >
        <RegisterIcon className={classes.icon} />
        {translate('resources.register.host')}
    </Button>
);

const enhance = compose(
    withStyles(styles),
    translate
);
export default enhance(LinkToRelatedRegisterForm);
