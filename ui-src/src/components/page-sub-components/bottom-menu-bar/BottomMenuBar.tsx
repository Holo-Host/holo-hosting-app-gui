import * as React from 'react';
import classnames from 'classnames';
// mui custom style imports
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/HighlightOff';
// local imports
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import OutlinedButton from '../outlined-button/OutlinedButton';
import styles from '../../styles/page-styles/DefaultPageMuiStyles';

export interface OwnProps {
  classes: any,
  showTransferBar: (toggleTxBarParam:string) => void
}
export type Props = OwnProps & StateProps & DispatchProps;

function BottomMenuBar(props: Props) {
  const { classes } = props;
  console.log("BottomMenuBar-> Props::",props);
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar} >
          <div className={classes.closeBtn} onClick={() => props.showTransferBar("")}><CloseIcon className={classes.svgCloseIcon}/></div>
          <div className={classnames(classes.buttonMenu)}>
            <OutlinedButton text="Send" color="primary" link="/holofuelproposal" showTransferBar={props.showTransferBar} fnName="proposal" />
            <OutlinedButton text="Request" color="primary" link="/holofuelrequest" showTransferBar={props.showTransferBar} fnName="request" />
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default withStyles(styles)(BottomMenuBar);
