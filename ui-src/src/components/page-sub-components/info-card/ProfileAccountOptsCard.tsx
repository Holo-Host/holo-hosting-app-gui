import * as React from 'react';
import classnames from 'classnames';
// custom mui styles :
import { StyleRulesCallback } from '@material-ui/core/';
import { Theme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
// import styles from '../styles/page-styles/DefaultPageMuiStyles'
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// local imports :
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import Jdenticon from '../avatar-generator/Jdenticon';

const styles: StyleRulesCallback  = (theme: Theme) => ({
  card: {
    display: 'flex',
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  content: {
   flex: '1 0 auto',
 },
 controls: {
   display: 'flex',
   alignItems: 'center',
   paddingLeft: theme.spacing.unit,
   paddingBottom: theme.spacing.unit,
 },
 details: {
   display: 'flex',
   flexDirection: 'column',
 },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


export interface OwnProps {
  classes: any,
  agentHash: string,
  name: string,
  email: string,
  dateJoined: string,
}
export type Props = OwnProps & StateProps & DispatchProps;


function ProfileAccountOptsCard(props: Props) {
  const { classes, agentHash, name, email, dateJoined. ...newProps } = props;

  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardHeader
          avatar={
             <Avatar className={classnames(classes.headerAvatar, classes.profile)}>
               <Jdenticon hash={ agentHash } size="105px" {...newProps} />
             </Avatar>
           }
           title="Profile"
           subheader=''
        />
      </div>
      <CardContent className={classes.content}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Main Identity
        </Typography>
        <Typography className={classes.balanceHeader} variant="h5" component="h2">
          {name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {dateJoined}
        </Typography>
        <div className={classes.controls}>
          <hr/>
          <Typography component="h5" variant="h5">
           Email: {email}
         </Typography>
        </div>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(ProfileAccountOptsCard);
