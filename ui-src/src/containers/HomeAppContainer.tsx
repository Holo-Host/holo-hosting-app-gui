import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
// actions, reducers, & utils imports :
import {
GetInfoInstancesAsyncAction,
GetAgentListAsyncAction,
FetchAgentStringAsyncAction,
// FetchAgentHashAsyncAction,
TransactionListAsyncAction,
PendingListAsyncAction,
LedgerStateAsyncAction,
ListRequestsAsyncAction,
IsRegisterProviderAction,
IsRegisterHostAction,
ListProposalsAsyncAction,
GetRequestAsyncAction,
GetProposalAsyncAction,
RequestPaymentAsyncAction,
// PayRequestAsyncAction,
// DeclineRequestAsyncAction,
ProposalAsyncAction,
ReceivePaymentAsyncAction,
// RejectPaymentAsyncAction
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
  list_of_instance_info: reducers.list_of_instance_info,
  list_of_agents: reducers.list_of_agents,
  my_agent_string: reducers.my_agent_string,
  my_agent_hash: reducers.my_agent_hash,
  hf_base_dna_hash:  reducers.hf_base_dna_hash,

// holofuel specific states :
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
  // console.log("GetInfoInstancesAsyncAction", GetInfoInstancesAsyncAction);
  // console.log("TransactionListAsyncAction", TransactionListAsyncAction);
  return {
      get_info_instances : () => {
        // console.log("dispatching get_info_instances");
       dispatch(GetInfoInstancesAsyncAction.create([]))},

      get_agent_list : () => {
        // console.log("dispatching get_agent_list");
       dispatch(GetAgentListAsyncAction.create([]))},

      fetch_agent_string: () => {
        console.log("dispatching fetch_agent_string");
       dispatch(FetchAgentStringAsyncAction.create([]))},

  // TRANSACTION STATES
      get_ledger_state : () => {console.log("dispatching get_ledger_state");dispatch(LedgerStateAsyncAction.create({}))},

      list_transactions : (payload?) => {
        // console.log("dispatching list_transactions");
       dispatch(TransactionListAsyncAction.create(payload))},

      list_pending : () => {
        // console.log("dispatching list_pending");
       dispatch(PendingListAsyncAction.create({}))},

      list_requests : () => {
        // console.log("dispatching list_transactions");
       dispatch(ListRequestsAsyncAction.create({}))},
      is_registered_as_provider : () => {
         // console.log("dispatching list_transactions");
        dispatch(IsRegisterProviderAction.create({}))},
      is_registered_as_host : () => {
       // console.log("dispatching list_transactions");
        dispatch(IsRegisterHostAction.create({}))},


      list_proposals : () => {
        // console.log("dispatching list_proposals");
       dispatch(ListProposalsAsyncAction.create({}))},

  //// View Specific Transaction
      get_single_request : (request_payload) => {
      // console.log("dispatching get_single_request");
       dispatch(GetRequestAsyncAction.create(request_payload))},

      get_single_proposal : (proposal_payload) => {
        // console.log("dispatching get_single_proposal");
       dispatch(GetProposalAsyncAction.create(proposal_payload))},

  // TRANSACTION EVENTS (ACTIONS):
      request_payment : (payload) => {
      // console.log("dispatching request");
       dispatch(RequestPaymentAsyncAction.create(payload))},

  // NB: API not yet available...
      // decline_request : () => {console.log("dispatching decline_request"); dispatch(DeclineRequestAsyncAction.create({}))},

  //// PROPOSAL CASE :
      // payload === {to, amount, notes?, deadline?, request?}
      propose_payment : (payload) => {console.log("dispatching proposal"); dispatch(ProposalAsyncAction.create(payload))},
      // payload === {proposal, proposal_sig, proposal_commit_hash}
      receive_payment : (payload) => {console.log("dispatching receive_payment"); dispatch(ReceivePaymentAsyncAction.create(payload))},

  // NB: API not yet available...
      // reject_payment : () => {console.log("dispatching reject_payment"); dispatch(RejectPaymentAsyncAction.create({}))}
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeAppContainer);
