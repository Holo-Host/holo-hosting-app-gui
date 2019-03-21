import React from 'react';
import compose from 'recompose/compose';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import HomeIcon from '@material-ui/icons/Home';
import { withStyles } from '@material-ui/core/styles';
import { translate } from 'react-admin';
import RegisterProvider from './registerProvider';
import RegisterHost from './registerHost';

const styles = {
    media: {
      width:'80%',
      height: '18em',
      margin: '0 auto',
      marginBottom: 35
    },
    cardTitle: {
      width: '100%',
      margin: '0 auto'
    }
};

const mediaUrl = 'https://source.unsplash.com/random/1600x900/daily';

const Welcome = ({ classes, translate, username}) => (
    <Card>
      <CardContent>
        <Typography variant="headline" component="h2" className={classes.cardTitle}>
          {translate('pos.dashboard.welcome.title') + ` ${username}`}
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
