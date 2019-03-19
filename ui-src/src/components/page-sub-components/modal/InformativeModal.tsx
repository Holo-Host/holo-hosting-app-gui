import * as React from 'react';
import classnames from 'classnames';
import * as moment from 'moment';
// MUI Imports:
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import Slide from '@material-ui/core/Slide';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
// local imports :
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import styles from '../../styles/page-styles/DefaultPageMuiStyles';

// type Moment = moment.Moment;

export interface OwnProps {
  // These are props the component has received from its parent component
  confirmMessage: any,
  resetMessage: () => void,
  classes: any,
}
export type Props = OwnProps & StateProps & DispatchProps;
export interface State {
// The components optional internal state
  open: boolean,
  prevProps: any
}

// function ModalTransition(props) {
//   return <Slide direction="down" {...props} />;
// }

class informativeModal extends React.Component<Props, State>  {
  state = {
    open: false,
    prevProps: {}
  };

  componentDidMount() {
    if(this.props.confirmMessage){
      this.handleClickOpen();
    }
  }

  componentDidUpdate(prevProps:any, prevState:any) {
    if (prevProps.confirmMessage !== this.props.confirmMessage) {
      this.handleClickOpen();
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.props.resetMessage();
    this.setState({ open: false });
  };

  public render() {
    console.log("PROPS inside the informative-dialog-modal", this.props);
    const { classes, confirmMessage } = this.props;
    const parsedMessage = JSON.parse(confirmMessage);
    const fullScreen: boolean = false;

    // const today: Moment = moment.format();

    return (
        <Grid xs={12} >
          <div className={classnames(classes.modal, classes.modalRoot)}>
            <Fab style={{ display:'none'}} aria-label="next" className={classes.nextBtn} onClick={this.handleClickOpen}>
              <AddIcon/>
            </Fab>
           <Dialog
              fullScreen={fullScreen}
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="responsive-dialog-title"
              className={classes.modalContainer}
          >
            <DialogTitle id="responsive-dialog-title" style={{color:'#072dc3'}}>{"Transaction Sent"}</DialogTitle>
                <DialogContent>
                  <hr/>
                  <DialogContentText id="alert-dialog-description">
                  As of { `${moment().format('LLLL')}, \n`} your transfer has been successfully completed.
                  </DialogContentText>
                  <hr/>
                  <br/>

                  <DialogContentText style={{textDecoration:'underline'}} id="alert-dialog-description-1">
                     Transaction Summary
                  </DialogContentText>

                  <DialogContentText id="alert-dialog-description-3">
                    Amount: {parsedMessage.amount}
                  </DialogContentText>

                  {confirmMessage.to ?
                    <DialogContentText id="alert-dialog-description-2">
                        To: {parsedMessage.to}
                    </DialogContentText>

                  :confirmMessage.from ?
                    <DialogContentText id="alert-dialog-description-2">
                        From: {parsedMessage.from}
                    </DialogContentText>
                  :
                    <div/>
                  }

                  <DialogContentText id="alert-dialog-description-4">
                    Deadline: {parsedMessage.deadline}
                  </DialogContentText>

                  <DialogContentText id="alert-dialog-description-6">
                    Notes: {parsedMessage.notes}
                  </DialogContentText>

                  <br/>
                  <hr/>
                  <DialogContentText id="alert-dialog-slide-description">
                    Please check your transaction history for updates.
                  </DialogContentText>
              </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Ok
              </Button>
        </DialogActions>
        </Dialog>
      </div>
    </Grid>
    )
  }
}

export default withStyles(styles)(informativeModal);
