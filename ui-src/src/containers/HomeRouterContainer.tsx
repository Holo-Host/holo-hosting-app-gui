import * as React from 'react';
import HomeSummaryPage from '../components/page-views/HomeSummaryPage';
import RegisterhAppPage from '../components/page-views/RegisterhAppPage';
import UpgradePage from "../components/page-views/UpgradePage";
import AgentProfile from "../components/page-views/AgentProfile";
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
  is_registered_host:any,
  agent_details:any,
  all_hApps:any,
  all_registered_hApps:any,
  last_registered_hApp:any,
  app_details:any,
}
export interface DispatchProps {
  is_registered_as_provider: () => void,
  is_registered_as_host: () => void,
  get_agent_details: () => void,
  register_hApp_bundle: ({payload}:any) => void,
  get_all_hApps:()=> void,
  get_all_registered_hApps:()=> void,
  get_hApp_details:({payload}:any)=> void,
  register_as_host:({payload}:any)=> void,
  register_as_provider:({payload}:any)=> void,

  add_domain_name:({payload}:any)=> void,
  add_service_log_details:({payload}:any)=> void,
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
    this.props.get_all_hApps();
  }

  toggleTransferBtnBar = (txType: any) => {
    this.setState({
      chooseTxBtnBarOpen: !this.state.chooseTxBtnBarOpen,
      transactionType: txType
    });
  }


  public render() {
    // console.log("this.props", this.props);
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
            location.pathname === "/settings" ?
            // this should lead to the "settings" page for HoloFuel &/ Holo
            <UpgradePage
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
