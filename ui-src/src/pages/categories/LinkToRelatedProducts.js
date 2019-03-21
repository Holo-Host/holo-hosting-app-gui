import React from 'react';
import compose from 'recompose/compose';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { translate } from 'react-admin';
import { stringify } from 'query-string';
// local component imports:
import happs from '../happs';

const styles = {
    icon: { paddingRight: '0.5em' },
    link: {
        display: 'inline-flex',
        alignItems: 'center',
    },
};

const LinkToRelatedProducts = ({ classes, record, translate }) => (
    <Button
        size="small"
        color="primary"
        component={Link}
        to={{
            pathname: '/happs',
            search: stringify({
                page: 1,
                perPage: 25,
                sort: 'id',
                order: 'DESC',
                filter: JSON.stringify({ category_id: record.id }),
            }),
        }}
        className={classes.link}
    >
        <happs.icon className={classes.icon} />
        {translate('resources.categories.fields.happs')}
    </Button>
);

const enhance = compose(
    withStyles(styles),
    translate
);
export default enhance(LinkToRelatedProducts);
