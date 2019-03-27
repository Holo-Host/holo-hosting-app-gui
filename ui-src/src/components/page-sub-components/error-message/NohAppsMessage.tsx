import * as React from 'react';
import classnames from 'classnames';
import QueueAnim from 'rc-queue-anim';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../styles/page-styles/DefaultPageMuiStyles'

const NohApps = (props:any) => {
  const { classes} = props;
    return(
    <div className={classnames(classes.NohAppsMessage, "error-container", "text-center")} style={{ margin:'0 auto', marginTop:'15vh', borderRadius:'4px', fontSize:'1.5rem', background:'#00838d'}}>
      <div className="error" style={{textAlign:'center', margin:'0 auto'}}>
        <h2 className={classes.NohAppsMessageText} >Loading... </h2>
      </div>
    </div>
  );
}

const NohAppsMessage = (props:any) => {
  const { classes } = props;
  return(
    <div className="page-error">
      <QueueAnim type="bottom">
        <div key="1">
          <NohApps classes={classes} />
        </div>
      </QueueAnim>
    </div>
  );
}

export default withStyles(styles)(NohAppsMessage);
