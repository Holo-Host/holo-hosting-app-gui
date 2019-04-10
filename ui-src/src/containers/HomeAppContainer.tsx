import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
// actions, reducers, & utils imports :
import {
  IsRegisterProviderAction,
  IsRegisterHostAction,
  GetAgentDetails,
  GetAllhApps,
  GetRegisteredApps,
  GethAppDetails,
  RegisterProvider,
  RegisterHost,
  AddDomainName,
  AddServiceLogDetails,
  RegisterhAppBundle,
  GetMyEnabledApps,
  EnableApp,
  DisableApp
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
// global identifiers :last_registered_hApplast_registered_hApp
  is_registered_provider:reducers.is_registered_provider,
  is_registered_host:reducers.is_registered_host,
  agent_details:reducers.agent_details,
  all_hApps:reducers.all_hApps,
  all_registered_hApps:reducers.all_registered_hApps,
  last_registered_hApp:reducers.last_registered_hApp,
  app_details:reducers.app_details,
  my_enabled_apps:reducers.my_enabled_apps,
// holofuel specific states :
// TODO: DELETE THE FOLLOWING AND ALL REFERENCE TO IT WITHIN CODE...
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
    register_hApp_bundle : (payload) => {dispatch(RegisterhAppBundle.create(payload))},
    is_registered_as_provider : () => {dispatch(IsRegisterProviderAction.create({}))},
    is_registered_as_host : () => {dispatch(IsRegisterHostAction.create({}))},
    get_agent_details : () => {dispatch(GetAgentDetails.create({}))},
    get_all_hApps : () => {dispatch(GetAllhApps.create({}))},
    get_all_registered_hApps : () => {dispatch(GetRegisteredApps.create({}))},
    get_hApp_details : (payload) => {dispatch(GethAppDetails.create(payload))},
    register_as_host : (payload) => {dispatch(RegisterHost.create(payload))},
    register_as_provider : (payload) => {dispatch(RegisterProvider.create(payload))},
    add_domain_name : (payload) => {dispatch(AddDomainName.create(payload))},
    add_service_log_details : (payload) => {dispatch(AddServiceLogDetails.create(payload))},
    get_enabled_app_list : () => {dispatch(GetMyEnabledApps.create({}))},
    enable_app : (payload) => {dispatch(EnableApp.create(payload))},
    disable_app : (payload) => {dispatch(DisableApp.create(payload))},
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeAppContainer);
