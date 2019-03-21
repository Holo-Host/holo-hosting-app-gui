import * as React from 'react';
import classnames from 'classnames';
// custom mui styles :
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
// local imports
import styles from '../styles/page-styles/DefaultPageMuiStyles';
import '../styles/page-styles/scaffold-styles.css';
import { Ledger } from '../../utils/types';
// import SimpleTable from '../page-sub-components/bottom-menu-bar/SimpleTable';

export interface OwnProps {
  // These are props the component has received from its parent component
  ledger_state: Ledger,
  classes: any,
  transferBtnBar: boolean,
  txType: string,
  showTransferBar: (txType:any) => void,
  toggleTxDetailModal: () => void,
  currentRowDataDetailed: Array<any>
}

export interface State {
  open: boolean
}

function Transition(props:any) {
  return <Slide direction="up" {...props} />;
}

class HoloFuelTransactionDetailPage extends React.Component<OwnProps, State> {
  constructor(props:any){
    super(props);
    this.state = {
      open: false,
    };
  };

  componentDidMount () {
    console.log("PROPS : ", this.props);
    this.handleClickOpen();
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.toggleTxDetailModal();
  };

  render() {
    const { classes, currentRowDataDetailed } = this.props;
    const rowData = currentRowDataDetailed.forEach(txDetail => {return txDetail});
    console.log("ROW DATA >> are there 7 separate strings ??", rowData );

    const gutterBottom: boolean = true;

    return (
      <div>
        <Dialog
          style={{background:"#4b6a7d"}}
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
          className="dialogPaper"
        >
          <AppBar className={classes.appBarFullPageModal}>
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Transaction Details
              </Typography>

              {/* <Typography className={classes.tableHeader} variant="display2" gutterBottom={gutterBottom} component="h3" >
                Transaction Details
              </Typography> */}

              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>

          <div className={classnames(classes.flexContainer, classes.reducedJumbotron)} style={{ marginTop: '50px',  marginBottom:'50px', width:'80%'}}>
            <div className={classes.flexItem}>
              <h3 className={classes.h3}>Current Balance</h3>
              <Typography className={classes.balanceHeader} variant="caption" gutterBottom={gutterBottom} component="h3" >
                {this.props.ledger_state.balance ? `${this.props.ledger_state.balance} HF` : `Pending...`}
              </Typography>
            </div>
            <div className={classes.verticalLine}/>
            <div className={classes.flexItem}>
              <h3 className={classes.h3}>Credit limit</h3>
              <Typography className={classes.balanceHeader} variant="caption" gutterBottom={gutterBottom} component="h3" >
                  {this.props.ledger_state.credit ? `${this.props.ledger_state.credit} HF`: `N/A`}
              </Typography>
            </div>
          </div>

          <div className={classnames(classes.flexContainer, classes.detailedTransaction)}>
            {/* <SimpleTable classNames={classes.flexItem} {...newProps} currentTxData={this.state.currentTxData} /> */}

            <List style={{ marginTop:'5%'}}>
              <ListItem button style={{ marginTop:'#fff'}}>
                <ListItemText primary="Due Date :" secondary={currentRowDataDetailed[0]} />
              </ListItem>
              <Divider />
              <ListItem button style={{ marginTop:'#fff'}}>
                <ListItemText primary="Current Transaction Date" secondary={currentRowDataDetailed[1]} />
              </ListItem>
              <Divider />
              <ListItem button style={{ marginTop:'#fff'}}>
                <ListItemText primary="Date Transaction Initiated:" secondary={currentRowDataDetailed[2]} />
              </ListItem>
              <Divider />
              <ListItem button style={{ marginTop:'#fff'}}>
                <ListItemText primary="Transaction Amount:" secondary={currentRowDataDetailed[3]} />
              </ListItem>
              <Divider />
              <ListItem button style={{ marginTop:'#fff'}}>
                <ListItemText primary="Transaction Amount:" secondary={currentRowDataDetailed[4]} />
              </ListItem>
              <Divider />
              <ListItem button style={{ marginTop:'#fff'}}>
                <ListItemText primary="Transaction Notes" secondary={currentRowDataDetailed[5]} />
              </ListItem>
              <Divider />
              {/* <ListItem button>
                <ListItemText primary="Transaction Status:" secondary={currentRowDataDetailed.[6]} />
              </ListItem> */}
            </List>
          </div>

        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(HoloFuelTransactionDetailPage);

/* <Divider />
  <ListItem button>
  <ListItemText primary="Transaction Intiator:" secondary={} />
  </ListItem> */
