import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classnames from 'classnames';
import * as moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import PersonPin from '@material-ui/icons/PersonPin';
import Message from '@material-ui/icons/Message';
import { StateProps, DispatchProps } from '../../../containers/HomeRouterContainer';
import VerificationMessage from '../modal/VerificationMessage';
import OutlinedButton from '../outlined-button/OutlinedButton';
import styles from '../../styles/page-styles/DefaultPageMuiStyles';


type StateKeyType = string | number | symbol | any;
type LabelRef = HTMLElement | null | undefined;
type Moment = moment.Moment;

export interface OwnProps {
  classes: any,
  txType: string,
  showTransferBar: (txType:any) => void,
  invokeProposal: (txType:any) => void,
  invokeRequest: (txType:any) => void,
}
export type Props = OwnProps & StateProps & DispatchProps;

export interface State {
  appname: string,
  dns: string,
  notes: string,
  deadline: string | Moment,
  deadlineDate: Date,
  deadlineTime: Date,
  message: any,
  errorMessage: string,
  transactionType: string
}

class RegisterhAppForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      appname: "",
      dns: "",
      notes: "",
      deadline: "",
      deadlineDate: new Date(),
      deadlineTime: new Date(new Date().getTime()),
      message: "",
      errorMessage: "",
      transactionType: ""
    };
  }

  el: LabelRef = null;
  handleRef (el: any) { // tslint:disable-line
    this.el = ReactDOM.findDOMNode(el!) as HTMLLabelElement | null;
  }

  // componentDidMount() {
  //   this.forceUpdate();
  // }

  handleChange = (name: StateKeyType) => (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (name) {
      case 'appname':
        this.setState({
          appname: event.target.value.trim(),
        });
        break;

      case 'dns':
        this.setState({
          dns: event.target.value.trim(),
        });
        break;

      case 'notes':
        this.setState({
          notes: event.target.value,
        });
        break;

      default:
        return "";
    }
  };

  onChangeDate = (deadlineDate:Date) => {
    console.log('deadlineDate: ', deadlineDate)
    this.setState({deadlineDate})
  }
  onChangeTime = (deadlineTime:Date) => {

    console.log('deadlineTime: ', deadlineTime)
    this.setState({deadlineTime})
  }

  handleMakePayment = (tx_obj: object) => {
    this.setState({
      appname: "",
      dns: "",
      notes: "",
      deadline: ""
    })

    // Now send obj to parent component for API invocation :
    console.log("propose_tx_obj : ", tx_obj);
    this.props.invokeProposal(tx_obj);
  };

  handleRequestPayment = (tx_obj: object) => {
    this.setState({
      appname: "",
      dns: "",
      notes: "",
      deadline: ""
    })

    // Now send obj to parent component for API invocation :
    console.log("request_tx_obj : ", tx_obj);
    this.props.invokeRequest(tx_obj);
  };

  verifyTx(transactionType: any) {
    return ((e: any) => {
      e.preventDefault();
      const day = this.state.deadlineDate.getDate();
      const month = this.state.deadlineDate.getMonth();
      const year = this.state.deadlineDate.getFullYear();
      const timeHours = this.state.deadlineTime.getHours();
      const timeMinutes= this.state.deadlineTime.getMinutes();
      const deadlineString  = new Date(year,month,day,timeHours,timeMinutes, 0);
      const txDeadline = moment(deadlineString);
      console.log("deadline", txDeadline);

      this.setState({
        deadline: txDeadline,
        transactionType
      });
      console.log('Check for Deadline in State', this.state);
      this.digestTxContent(txDeadline);
    });
  }

  digestTxContent = (txDeadline:Moment) => {
    const { appname, dns, deadline, notes } = this.state;
    console.log("deadline", deadline);

    const isoDeadline: Moment = moment(txDeadline, moment.ISO_8601);
    console.log("deadline >> isoDeadline", isoDeadline);

    // NOTE : verify the tx inputs here :
      // 1. Deadline: make sure the deadline datetime is not less than current datetime (ie: cannot choose  past date as the datetime for the transaction deadline)
      // 2. Amount: ensure dns is not negative or zero AND exists (ie: !== NULL)
      // 3. Counterparty: Enusre exists (!== NULL)

      if (!appname || !dns || !txDeadline) {
        this.setState({
          errorMessage: `Opps! \n It looks like we're missing some important transaction details. \n Please ensure that you have provided a counterparty, an dns, and a deadline for your transaction before submitting your transaction.`
        });

        // TODO: Update Alert to custom MUI Dialog Box
        return alert(this.state.errorMessage);
      }
      else if (appname && dns && txDeadline) {
        const validDeadlineDate = moment(deadline).isValid();
        console.log("validDeadlineDate", validDeadlineDate);

        const transactionObj = {
          counterparty: appname,
          dns,
          notes,
          deadline: isoDeadline
        };

        return this.setState({
          message: transactionObj
        });
    }
  }

  resetMessage = () => {
    this.setState({ message: "" });
  }

  public render() {
    const { classes, txType } = this.props;
    const multiline:boolean = true;
    const fullWidth:boolean = true;


    console.log("new Date().setMonth(new Date().getMonth() + 1): ", new Date());

    return (
      <div>
        <div className={classnames(classes.txWrapper, classes.root)}>
          <Paper className={classes.txPaperRoot} square={false} elevation={4}>
          <ul className={classnames(classes.flexContainer, classes.inputContainer)}>
            <li className={classnames(classes.formList, classes.flexItem)}>
              <Paper className={classes.inputPaper} square={false} elevation={4}>
                 <TextField
                  className={classes.margin}
                  label={(<div><PersonPin/><span>hApp name</span></div>)}
                  variant="outlined"
                  id="appname-input"
                  value={this.state.appname}
                  placeholder="Errand..."
                  onChange={this.handleChange('appname')}
                  fullWidth={fullWidth}
                  aria-describedby="appname-input-text"
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      input: classes.customFormOutlinedInput,
                      focused: classes.customFormFocused,
                      notchedOutline: classes.notchedOutline
                    },
                  }}
                />
              </Paper>
            </li>

            <li className={classnames(classes.formList, classes.flexItem)}>
              <Paper className={classes.inputPaper} square={false} elevation={4}>
                 <TextField
                  className={classes.margin}
                  label={(<div><PersonPin/><span>Domain Name</span></div>)}
                  variant="outlined"
                  id="dns-input"
                  value={this.state.dns}
                  placeholder="errand.org"
                  onChange={this.handleChange('dns')}
                  fullWidth={fullWidth}
                  aria-describedby="dns-input-text"
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      input: classes.customFormOutlinedInput,
                      focused: classes.customFormFocused,
                      notchedOutline: classes.notchedOutline
                    },
                  }}
                />
              </Paper>
            </li>

            <li className={classnames(classes.formList, classes.flexItem)}>
              <Paper className={classes.inputPaper} square={false} elevation={4}>
                <TextField
                  className={classes.margin}
                  InputLabelProps={{
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    classes: {
                      /* root: classes.root, */
                      input: classes.customFormOutlinedInput,
                      focused: classes.customFormFocused,
                      notchedOutline: classes.notchedOutline
                    },
                  }}
                  id="notes-input"
                  label={(<div><Message/><span>Bundle</span></div>)}
                  placeholder={
                    `{  ui-hash:Qouahsdfvasf,
  dna-hash:[Qasdfasdvsnjfvkjn ...]
}
                    `}
                  multiline={multiline}
                  rows="4"
                  value={this.state.notes}
                  onChange={this.handleChange('notes')}
                  variant="outlined"
                  fullWidth={fullWidth}
                />
              </Paper>
            </li>
          </ul>
          </Paper>
        </div>

        {/* Toggle Verification_Message Modal */}
          { this.state.message ?
            <VerificationMessage
              resetMessage={this.resetMessage}
              tx={this.state.transactionType}
              handleRequestPayment={this.handleRequestPayment}
              handleMakePayment={this.handleMakePayment}
              message={JSON.stringify(this.state.message)}
            />
          :
            <div/>
          }

        <AppBar position="fixed" className={classes.bottomAppBar}>
          <Toolbar className={classes.toolbar}>
            <div className={classnames(classes.buttonMenu)}>
              {txType === "proposal" ?
              <span>
                <Button variant="outlined"
                  color="primary"
                  onClick={this.verifyTx("proposal")}
                  className={classnames(classes.button, classes.overlayTop)}
                 >
                  <span className={classes.innerBtnText}>Send</span>
                </Button>

                <OutlinedButton
                  text="Cancel"
                  color="primary"
                  link="/home"
                  showTransferBar={this.props.showTransferBar}
                  fnName=""
                />
              </span>
              :
              <span>
                <Button variant="outlined"
                  color="primary"
                  onClick={this.verifyTx("request")}
                  className={classnames(classes.button, classes.overlayTop)}
                 >
                  <span className={classes.innerBtnText}>Request</span>
                </Button>

                <OutlinedButton
                  text="Cancel"
                  color="primary"
                  link="/home"
                  showTransferBar={this.props.showTransferBar}
                  fnName=""
                />
              </span>
              }
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(RegisterhAppForm);
