import * as React from 'react';
import classnames from 'classnames';
// custom mui styles :
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Portal from '@material-ui/core/Portal';
import Slide from '@material-ui/core/Slide';
// local imports
import { StateProps, DispatchProps } from '../../containers/HomeRouterContainer';
import HAppTables from '../page-sub-components/hoc-table/SummaryhAppsTables';
import BottomMenuBar from '../page-sub-components/bottom-menu-bar/BottomMenuBar';
import styles from '../styles/page-styles/DefaultPageMuiStyles';
import '../styles/page-styles/scaffold-styles.css';

export interface OwnProps {
  classes: any,
  txType: any,
  showTransferBar: (txType:any) => void,
  transferBtnBar: boolean,
}
export type Props = OwnProps & StateProps & DispatchProps;
export interface State {
  txEndDate: string | undefined,
  txStartDate: string | undefined,
  txBatchType: string | undefined,
  currentTxBatchInfo: {newer:{}, over:{}} | null,
  data: {} | null,
  prevProps: any,
}

class HomeSummaryPage extends React.Component<Props, State> {
  constructor(props:Props){
    super(props);
    this.state = {
      txEndDate: "",
      txStartDate: "",
      txBatchType: "",
      currentTxBatchInfo: null,
      data: {},
      prevProps: {}
    };
  };

  public componentDidMount () {
    this.props.list_transactions({});
    this.props.list_proposals();
    this.props.list_requests();
    this.props.list_pending();
  }

  componentDidUpdate(prevProps:any, prevState:any ) {
    if (prevProps.list_transactions !== this.props.list_transactions || prevProps.list_pending !== this.props.list_pending ) {
      this.render();
    }
  }

   public render () {
      const { classes, transferBtnBar, ...newProps } = this.props;
      const gutterBottom : boolean = true;

      return (
        <div>
          <div className={classes.jumbotron}>
            <div className={classnames(classes.flexContainer, classes.reducedJumbotron)}>
              <div className={classes.flexItem}>
                <h3 className={classes.h3}>Provider</h3>
                <Typography className={classes.balanceHeader} variant="caption" gutterBottom={gutterBottom} component="h3" >
                  {this.props.ledger_state.balance ? `${this.props.ledger_state.balance} HF` : `Not Registered..`}
                </Typography>
              </div>
              <div className={classes.verticalLine}/>
              <div className={classes.flexItem}>
                <h3 className={classes.h3}>Host</h3>
                <Typography className={classes.balanceHeader} variant="caption" gutterBottom={gutterBottom} component="h3" >
                    {this.props.ledger_state.credit ? `${this.props.ledger_state.credit} HF`: `Not Registered..`}
                </Typography>
              </div>
            </div>
            <hr style={{color:"#0e094b8f"}} />
            <h3 className={classes.h3}>You Public Address : {this.props.ledger_state.credit ? `${this.props.ledger_state.credit}`: `N/A`} </h3>
          </div>

          <div>
            <Typography className={classnames(classes.tableHeader, classes.pageHeader)} variant="display2" gutterBottom={gutterBottom} component="h3" >
              All Register hApps
            </Typography>

            <HAppTables {...newProps} />

            { transferBtnBar ?
              <Portal>
                <Slide direction="down" in={transferBtnBar} mountOnEnter unmountOnExit>
                  <BottomMenuBar {...newProps} showTransferBar={this.props.showTransferBar} />
                </Slide>
              </Portal>
            :
              <div/>
            }
          </div>
        </div>
      );
   }
}

export default withStyles(styles)(HomeSummaryPage);
