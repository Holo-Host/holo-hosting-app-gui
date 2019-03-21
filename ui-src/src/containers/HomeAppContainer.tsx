import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
// actions, reducers, & utils imports :
import {
  IsRegisterProviderAction,
  IsRegisterHostAction,
  GetAgentDetails,
  RegisterhAppBundle,
  GetAllhApps,
  GethAppDetails,
} from '../actions/transactionActions';
import HomeRouterContainer, { StateProps, DispatchProps } from './HomeRouterContainer';

export interface OwnProps {
  staticContext: any,
  className: any,
  classes: any,
  history: any
}
export type Props = OwnProps & StateProps & DispatchProps;

class HomeAppContainer extends React.Component<Props> {
  constructor(props:Props){
    super(props);
  };

  public render() {
    return (
      <HomeRouterContainer {...this.props}/>
    )
  }
}

const mapStateToProps = ({ reducers }: any): StateProps => {
  // console.log("reducers", reducers);
  return {
// global identifiers :
  is_registered_provider:reducers.is_registered_provider,
  is_registered_host:reducers.is_registered_host,
  agent_details:reducers.agent_details,
  all_hApps:reducers.all_hApps,
  app_details:reducers.app_details,

// holofuel specific states :
  list_of_instance_info: reducers.list_of_instance_info,
  list_of_agents: reducers.list_of_agents,
  my_agent_string: reducers.my_agent_string,
  my_agent_hash: reducers.my_agent_hash,
  hf_base_dna_hash:  reducers.hf_base_dna_hash,

  ledger_state: reducers.ledger_state,
  list_of_transactions: reducers.list_of_transactions,
  list_of_pending:reducers.list_of_pending,
  mostRecentProposalCommit:reducers.mostRecentProposalCommit,
  mostRecentRequestCommit:reducers.mostRecentRequestCommit,
  list_of_requests: reducers.list_of_requests,
  list_of_proposals: reducers.list_of_proposals,
  view_specific_request: reducers.view_specific_request,
  view_specific_proposal: reducers.view_specific_proposal // ,
  // status
  };
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    is_registered_as_provider : () => {dispatch(IsRegisterProviderAction.create({}))},
    is_registered_as_host : () => {dispatch(IsRegisterHostAction.create({}))},
    get_agent_details : () => {dispatch(GetAgentDetails.create({}))},
    register_hApp_bundle : (payload) => {dispatch(RegisterhAppBundle.create(payload))},
    get_all_hApps : () => {dispatch(GetAllhApps.create({}))},
    get_hApp_details : (payload) => {dispatch(GethAppDetails.create(payload))},
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeAppContainer);
