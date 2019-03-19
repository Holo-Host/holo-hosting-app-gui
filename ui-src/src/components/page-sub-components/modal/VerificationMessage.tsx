
import * as React from 'react';
import classnames from 'classnames';
// MUI Imports:
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
// local imports :
import { ProposalActionParam, RequestActionParam } from '../../../utils/types';
import { getDisplayName } from '../../../utils/global-helper-functions'
import styles from '../../styles/page-styles/DefaultPageMuiStyles';

export interface OwnProps {
  message: any,
  resetMessage: () => void,
  tx: string,
  classes: any,
  handleMakePayment: (tx_obj:any) => void,
  handleRequestPayment: (tx_obj:any) => void
}
export type Props = OwnProps;
export interface State {
  open: boolean,
  prevProps: any
  messageAsObj: any
 }

class VerficationModal extends React.Component<Props, State>  {
  state = {
      open: false,
      prevProps: {},
      messageAsObj: {
        counterparty: "",
        amount: "",
        notes: "",
        deadline: ""
      }
    };

  componentDidMount() {
      if(this.props.message){
        const messageAsObj = JSON.parse(this.props.message);
        this.setState({ messageAsObj })
        this.handleClickOpen();
      }
    }

   componentDidUpdate(prevProps:any, prevState:any) {
      if (prevProps.message !== this.props.message) {
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

    handleMakeTransaction = () => {
      const { counterparty, amount, deadline, notes } = this.state.messageAsObj;

      if(this.props.tx === "proposal"){
        const tx_obj: ProposalActionParam = {
          to: counterparty,// this will be the payment requestor's/payment recipient's AGENT_ADDRESS
          amount,
          notes,
          deadline
        }
        this.props.handleMakePayment(tx_obj);
      }
      else if(this.props.tx === "request") {
        const tx_obj: RequestActionParam = {
          from: counterparty,// this will be the payment requestor's/payment recipient's AGENT_ADDRESS
          amount,
          notes,
          deadline
        }
        this.props.handleRequestPayment(tx_obj);
      }

      this.setState({ open: false });
    };

    public render() {
      const { classes } = this.props;
      const fullScreen: boolean = false;
      console.log("VERIFCATION MODAL STATE - is the state set with txobj? ", this.state);
      const { messageAsObj } = this.state;
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
              <DialogTitle id="responsive-dialog-title" style={{color:'#072dc3'}}>{"Verify Transaction"}</DialogTitle>
                  <DialogContent>
                    <hr/>
                    <DialogContentText id="alert-dialog-description">
                      Does everything look right?
                    </DialogContentText>
                    <hr/>
                    <br/>

                    <DialogContentText style={{textDecoration:'underline'}} id="alert-dialog-description-1">
                       Your Transaction Details
                    </DialogContentText>

                    <DialogContentText id="alert-dialog-description-2">
                      Counterparty: {getDisplayName(messageAsObj.counterparty)}
                    </DialogContentText>

                    <DialogContentText id="alert-dialog-description-3">
                      Amount: {messageAsObj.amount}
                    </DialogContentText>

                    <DialogContentText id="alert-dialog-description-4">
                      Deadline: {messageAsObj.deadline}
                    </DialogContentText>

                    <DialogContentText id="alert-dialog-description-6">
                      Notes: {messageAsObj.notes}
                    </DialogContentText>
                </DialogContent>
              <DialogActions>
                <Button onClick={this.handleMakeTransaction} color="primary">
                  Yes! Send transaction.
                </Button>
                <Button onClick={this.handleClose} color="primary">
                  No. Correct details.
                </Button>
          </DialogActions>
          </Dialog>
        </div>
      </Grid>
    )
  }
}

export default withStyles(styles)(VerficationModal);
