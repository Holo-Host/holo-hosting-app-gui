import React from 'react';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import CodeIcon from '@material-ui/icons/Code';
import DnsIcon from '@material-ui/icons/Dns';
import { withStyles } from '@material-ui/core/styles';
import { translate } from 'react-admin';
import RegisterProvider from './registerProvider';
import RegisterHost from './registerHost';
const styles = {
    media: {
        height: '18em',
    },
};

const mediaUrl = `https://marmelab.com/posters/dog-${parseInt(
    Math.random() * 10,
    10
) + 1}.jpeg`;

const Welcome = ({ classes, translate ,username}) => (
    <Card>
      <CardContent>
        <Typography variant="headline" component="h2">
          {translate('pos.dashboard.welcome.title')}
          {username}
        </Typography>
      </CardContent>
        <CardActions style={{ justifyContent: 'center' }}>
          <RegisterProvider/>
          <RegisterHost/>
        </CardActions>
        <CardMedia image={mediaUrl} className={classes.media} />
    </Card>
);

const enhance = compose(
    withStyles(styles),
    translate
);

export default enhance(Welcome);
