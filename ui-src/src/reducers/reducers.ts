import { ActionType } from 'typesafe-actions';
import * as actions from '../actions/transactionActions';
import { Ledger, ListTransactionsResult, Address, Proposal, Transaction, PendingResult } from '../utils/types';
// import createMockApiData from '../utils/seed-data/mock-api-data';
import { setInstance, TABLE_DATA_BATCH_LIMIT } from '../utils/constants'
export type Action = ActionType<typeof actions>;

// FILE CONSTANTS:
const DNA_INSTANCE = setInstance();
// const TX_ZOME_NAME = 'transactions';
const PROVIDER = 'provider';
const HOST = 'host';
// readonly (- permissioned) keyword causes compiler to error if one attempts to mutate the state

export function transactionReducer (state: OriginalState = INITIAL_STATE, action: Action) {
  const { type, payload } = action;

  switch (type) {

   case `${DNA_INSTANCE}/${PROVIDER}/is_registered_as_provider_SUCCESS`: {
     // console.log('LIST_REQUESTS_SUCCESS state', payload);
     return { ...state, is_registered_provider : payload };
   }

   case `${DNA_INSTANCE}/${HOST}/is_registered_as_host_SUCCESS`: {
     // console.log('LIST_REQUESTS_SUCCESS state', payload);
     return { ...state, is_registered_host : payload };
   }
    default:
      return state;
  }
}
export default transactionReducer;


export type State = {
// global identifiers :
  list_of_instance_info: Array<any>,
  list_of_agents: Array<any>,
  my_agent_string: string,
  my_agent_hash: string,
  hf_base_dna_hash: string,

// holofuel specific states :
  ledger_state: Ledger,
  list_of_transactions: ListTransactionsResult,
  list_of_pending:PendingResult,
  list_of_requests: Array<Address>,
  list_of_proposals: Array<Address>,
  mostRecentProposalCommit:Address,
  mostRecentRequestCommit:Address,
  view_specific_request: Transaction, // this include metadata from propsal commit hash (ie ZomeApiResult<AppEntryValue>)
  view_specific_proposal: Proposal, // this include metadata from propsal commit hash
  readonly status: string
};

export type OriginalState = State | undefined;

export const INITIAL_STATE: State = {
  list_of_instance_info: [],
  list_of_agents: [],
  my_agent_string: '',
  mostRecentProposalCommit:'',
  mostRecentRequestCommit:'',
  my_agent_hash: '',
  hf_base_dna_hash: "QmcYtest",
  ledger_state: {
    balance: null,
    credit: null,
    payable: null,
    receivable: null
  },
  list_of_pending  : {},
  list_of_transactions: {
    ledger: {
      balance: null,
      credit: null,
      payable: null,
      receivable: null
    },
    newer: {
      since: "",
      until: "",
      limit: TABLE_DATA_BATCH_LIMIT,
      state: ""
    },
    older: {
      since: "",
      until: "",
      limit: TABLE_DATA_BATCH_LIMIT,
      state: ""
    },
    transactions: [{
        timestamp: {
          event:"", // ** added **
          origin: "" // ** added **
        },
        state: "",
        origin: "",
        event: {
          Request: {
            to: "",
            amount: "",
            notes: "",
            deadline: "",
            request: ""
          }
        },
        adjustment: {
          balance: 0,
          payable: 0,
          receivable: 0,
          credit: 0 // ** added **
        }
    }]
  },
  list_of_requests: [],
  list_of_proposals: [],
  view_specific_request:{
      to: "",
      amount: "",
      notes: "",
      deadline: ""
  },
  view_specific_proposal: {
      from: "",
      request: "",
      tx: {
        to: "",
        amount: "",
        notes: "",
        deadline: ""
      }
  },
  status: 'default'
};
