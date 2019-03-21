import * as React from 'react';
import HomeSummaryPage from '../components/page-views/HomeSummaryPage';
import RegisterhAppPage from '../components/page-views/RegisterhAppPage';
import SettingsHolo from "../components/page-views/SettingsHolo";
import AgentProfile from "../components/page-views/AgentProfile";
import HoloFuelTransactionDetailPage from '../components/page-views/HoloFuelTransactionDetailPage';
import { Ledger, ListTransactionsResult, PendingResult } from '../utils/types'; // RequestActionParam, ProposalActionParam, Address, DateTimeString
import AppNavBar from '../components/page-sub-components/app-nav-bar/AppNavBar';
import SubNavBar from '../components/page-sub-components/app-nav-bar/SubNavBar';
import { withStyles } from '@material-ui/core/styles';
import styles from '../components/styles/page-styles/DefaultPageMuiStyles';
import '../components/styles/page-styles/scaffold-styles.css';


export interface OwnProps {
  // These are props the component has received from its parent component
  className: any,
  staticContext: any,
  classes: any,
  history: any
}
export interface StateProps {
  // Props that are set by mapStateToProps
  ledger_state: Ledger,
  list_of_instance_info: Array<any>,
  list_of_agents: Array<any>,
  my_agent_string: string,
  my_agent_hash: string,
  hf_base_dna_hash: string,
  mostRecentProposalCommit: string,
  mostRecentRequestCommit: string,
  list_of_transactions : ListTransactionsResult,
  list_of_pending: PendingResult,
  list_of_requests: Array<any>,
  list_of_proposals: Array<any>,
  view_specific_request: Array<any>,
  view_specific_proposal: Array<any>,
  is_registered_provider:any,
  is_registered_host:any

}
export interface DispatchProps {
// Props that are set by mapDispatchToProps
  // identifying calls :
    get_info_instances: () => void,
    get_agent_list: () => void,
    fetch_agent_string: () => void,
  // holofuel specific calls :
    get_ledger_state: () => void,
    list_transactions: (payload? : any) => void,
    list_pending: () => void,
    list_requests: () => void,
    is_registered_as_provider: () => void,
    is_registered_as_host: () => void,
    list_proposals: () => void,
    get_single_request: ({request_address}: any) => void,
    get_single_proposal: ({proposal_address}: any) => void,
    request_payment: ({request_tx_obj}: any) => void,
    propose_payment: ({propose_tx_obj}: any) => void,
    receive_payment: ({payment_obj}: any) => void,
}
export type Props =  StateProps & DispatchProps & OwnProps;

export interface State {
// The components optional internal state
  chooseTxBtnBarOpen: boolean,
  transactionType: string,
  prevProps: any,
}

class HomeRouterContainer extends React.Component<Props, State> {
  constructor(props:Props){
    super(props);
    this.state = {
      chooseTxBtnBarOpen: false,
      transactionType: "",
      prevProps: {}
    }
  };

  componentDidMount () {
    this.props.fetch_agent_string();
    this.props.get_ledger_state();
  }

  toggleTransferBtnBar = (txType: any) => {
    this.setState({
      chooseTxBtnBarOpen: !this.state.chooseTxBtnBarOpen,
      transactionType: txType
    });
  }


// Find a dynamic way to connect the ui to the dna >> play with info_instances && agent_string >> access prior to running?!?!
  public render() {
    const { classes, staticContext, ...newProps } = this.props;
    const { location } = this.props.history;

    if(!this.props.ledger_state || !this.props.list_of_transactions){
      return <div/>
    }

    return (
      <div>
        <AppNavBar showTransferBar={this.toggleTransferBtnBar} {...newProps}/>
        <SubNavBar showTransferBar={this.toggleTransferBtnBar} {...newProps}/>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <div>
            {location.pathname === "/" || location.pathname === "/home" ?
            // default to HF Summary Page, if no path match
            <HomeSummaryPage
              transferBtnBar={this.state.chooseTxBtnBarOpen}
              showTransferBar={this.toggleTransferBtnBar}
              txType={this.state.transactionType}
              className={classes.appTable}
              {...newProps}
            />
          :
            location.pathname === "/provider/hApps" ?
            <RegisterhAppPage
              transferBtnBar={this.state.chooseTxBtnBarOpen}
              showTransferBar={this.toggleTransferBtnBar}
              txType={this.state.transactionType}
              className={classes.appTable} {...this.props}
            />
          :
            location.pathname === "/holofueltransactiondetails" ?
              // this should be the HoloFuel Transaction Details Page
              <HoloFuelTransactionDetailPage
                transferBtnBar={this.state.chooseTxBtnBarOpen}
                showTransferBar={this.toggleTransferBtnBar}
                txType={this.state.transactionType}
                className={classes.appTable}
                {...this.props}
              />
          :
            location.pathname === "/settings" ?
            // this should lead to the "settings" page for HoloFuel &/ Holo
            <SettingsHolo
              transferBtnBar={this.state.chooseTxBtnBarOpen}
              showTransferBar={this.toggleTransferBtnBar}
              txType={this.state.transactionType}
              className={classes.appTable}
              {...this.props}
            />
          :
            // if matches none - route to the Profile Page
            <AgentProfile
              transferBtnBar={this.state.chooseTxBtnBarOpen}
              showTransferBar={this.toggleTransferBtnBar}
              txType={this.state.transactionType}
              className={classes.appTable}
              {...this.props}
            />
          }
          </div>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(HomeRouterContainer);
