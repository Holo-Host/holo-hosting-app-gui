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
import AvatarField from '../../app-components/AvatarField';

const styles = {
    card: {
      width:'100%',
      minWidth: 105,
      justifyContent: 'center',
      margin: '0 auto'
    },
    cardContent:{
      padding: '2vw 32vw 0vw '
    },
    cardTitle: {
      display:'inline',
      width: '100%',
      margin: '0 auto',
      textAlign: 'center',
      fontFamily: 'Raleway, sans-serif',
      fontSize: '2em'
    }
};

const WelcomeAvatar = ({ classes, translate, userDetails, username}) => (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <Typography variant="headline" component="h2" className={classes.cardTitle}>
          {translate('pos.dashboard.welcome.title') + ` ${username}`}
        </Typography>
      </CardContent>
    </Card>
);

const enhance = compose(
    withStyles(styles),
    translate
);

export default enhance(WelcomeAvatar);

// <AvatarField agent={userDetails} />
