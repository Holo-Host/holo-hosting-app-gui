import * as React from 'react';
import classnames from 'classnames';
import QueueAnim from 'rc-queue-anim';
// MUI Imports:
import { withStyles } from '@material-ui/core/styles';
// Local Imports
import styles from '../../styles/page-styles/DefaultPageMuiStyles'

// export interface OwnProps {
//   classes: any,
//   tableText: string
// }

const NohApps = (props:any) => {
  const { classes, tableText } = props;
    return(
    <div className={classnames(classes.NohAppsMessage, "error-container", "text-center")} style={{ margin:'0 auto', marginTop:'-130px',background: "#D3D3D3"}}>
      <div className="error" style={{textAlign:'center', margin:'0 auto'}}>
        <h2 className={classes.NohAppsMessageText} >No {tableText} hApps</h2>
      </div>
    </div>
  );
}

const NohAppsMessage = (props:any) => {
  const { classes, tableText } = props;
  return(
    <div className="page-error">
      <QueueAnim type="bottom">
        <div key="1">
          <NohApps tableText={tableText} classes={classes} />
        </div>
      </QueueAnim>
    </div>
  );
}

export default withStyles(styles)(NohAppsMessage);
