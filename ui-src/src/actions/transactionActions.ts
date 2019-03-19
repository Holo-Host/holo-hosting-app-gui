import { createHolochainAsyncAction } from '@holochain/hc-redux-middleware';
// export const FETCH_STATE = 'FETCH_STATE';
// FILE CONSTANTS:
import { setInstance } from '../utils/constants'
// const DNA_INSTANCE = 'holofuel instance';
const TX_ZOME_NAME = 'transactions';
const DNA_INSTANCE = setInstance();
////////////////////////////////////////////////////////////////////////////
                    /* Verfiy State - TESTING */
////////////////////////////////////////////////////////////////////////////
// // STATE CHECK
// export function fetch_state () {
//   return {
//     type: FETCH_STATE
//   };
// }

////////////////////////////////////////////////////////
          /* Agent and Instance Discovery  */
////////////////////////////////////////////////////////
// Call for FETCH_AGENT_HASH ()
// export const FetchtAgentHashAsyncAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'whoami_hash');

// Call for FETCH_AGENT_STRING ()
export const FetchAgentStringAsyncAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'whoami');

// Call for GET_AGENT_LIST ()
// This is to retreive the list of agent Hashes/IDs
export const GetAgentListAsyncAction = createHolochainAsyncAction<{}, Array<any>>('admin', 'agent', 'list');

////////////////////////////////////////////////////////////////////////////
        /* Confirm Holofuel Instance Discovery in Container */
////////////////////////////////////////////////////////////////////////////
// Call for GET_INFO_INSTANCES ()
// This is to retreive the DNA Instance Hash of the HC-Rust holofuel app
//  for the remaining API calls using the Rust Conainter, RPC Websockets,
//  and redux-hc-middleware..
export const GetInfoInstancesAsyncAction = createHolochainAsyncAction<{}, Array<any>>('info', 'instances');

////////////////////////////////////////////////////////
            /* Reporting Transactions */
////////////////////////////////////////////////////////
// Call for GET_LEDGER_STATE ()
export const LedgerStateAsyncAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'ledger_state');

// This will return a client's self-initiated transactions ONLY
export const TransactionListAsyncAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'list_transactions');

// This will return ONLY those transactions (requests/proposals/refunds) that are not yet converted to transactions, ie. only the initating party has made a transaction and has mentioned the current user as the counterparty, yet the current user still has yet to engage in the transaction...
export const PendingListAsyncAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'list_pending');

////////////////////////////////////////////////////////
          /* Triggering Transaction Event */
////////////////////////////////////////////////////////

// Call for REQUEST_PAYMENT ()
export const RequestPaymentAsyncAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'request');

// Call for PROPOSE_PAYMENT ()
export const ProposalAsyncAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'proposal');

// Call for RECEIVE_PAYMENT ()
export const ReceivePaymentAsyncAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'receive_payment');

// Call for REJECT_PAYMENT ()
export const RejectPaymentAsyncAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'reject_payment');

// Call for PAY_REQUEST ()
export const PayRequestAsyncAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'pay_request');

// Call for DECLINE_REQUEST ()
export const DeclineRequestAsyncAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'decline_request');

// Call for LIST_REQUESTS ()
export const ListRequestsAsyncAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'list_requests');

// Call for LIST_PROPOSALS ()
export const ListProposalsAsyncAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'list_proposals');

// Call for GET_SINGLE_REQUEST ()
export const GetRequestAsyncAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'get_request');

// Call for GET_SINGLE_PROPOSAL ()
export const GetProposalAsyncAction = createHolochainAsyncAction<{}, Array<any>>(DNA_INSTANCE, TX_ZOME_NAME, 'get_proposal');
