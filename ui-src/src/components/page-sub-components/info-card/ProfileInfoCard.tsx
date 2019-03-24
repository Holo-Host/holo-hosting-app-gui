import * as React from 'react';
import classnames from 'classnames';
// custom mui styles :
import { withStyles } from '@material-ui/core/styles';
import { StyleRulesCallback } from '@material-ui/core/';
import { Theme } from '@material-ui/core/styles';
// import styles from '../../styles/page-styles/DefaultPageMuiStyles'
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// local imports :
import { StateProps, DispatchProps } from '../../../containers/HomeRouterContainer';
import Jdenticon from '../avatar-generator/Jdenticon';

const styles: StyleRulesCallback  = (theme: Theme) => ({
  card: {
    display: 'flex',
    minWidth: 375,
    maxWidth: 575,
    margin: '0 auto'
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
  headerAvatar: {
    height: 130,
    width: 130,
    background: '#00838d',
  },
  typography: {
    marginBottom: '15px',
  }
});



export interface OwnProps {
  classes: any,
  hash: string,
  name: string,
}
export type Props = OwnProps & StateProps & DispatchProps;


function ProfileInfoCard(props: Props) {
  const { classes, hash, name, ...newProps } = props;
  return (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent>
         <Avatar className={classnames(classes.headerAvatar, classes.profile)}>
           <Jdenticon hash={ hash } size="105px" {...newProps} />
         </Avatar>
        </CardContent>
      </div>
      <CardContent className={classes.content}>
        <Typography className={classnames(classes.typography, classes.balanceHeader)} variant="h5" component="h2">
          {name}
        </Typography>
          <hr/>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(ProfileInfoCard);
