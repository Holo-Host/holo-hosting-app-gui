import { ActionType } from 'typesafe-actions';
import * as actions from '../actions/transactionActions';
import { Ledger, ListTransactionsResult, Address, Proposal, Transaction, PendingResult } from '../utils/types';
import { setInstance, TABLE_DATA_BATCH_LIMIT , PROVIDER, HOST} from '../utils/constants'
export type Action = ActionType<typeof actions>;
import { refactorAllApps } from '../utils/data-refactor'

const DNA_INSTANCE = setInstance();

export function transactionReducer (state: OriginalState = INITIAL_STATE, action: Action) {
  const { type, payload } = action;
  switch (type) {

    /*Manages Provider Returns*/
   case `${DNA_INSTANCE}/${PROVIDER}/is_registered_as_provider_SUCCESS`: {
     return { ...state, is_registered_provider : payload };
   }
   case `${DNA_INSTANCE}/${PROVIDER}/register_as_provider_SUCCESS`: {
     return { ...state };
   }
   case `${DNA_INSTANCE}/${PROVIDER}/register_app_SUCCESS`: {
     console.log(" !!! last_registered_hApp !!!! : ", payload)
     return { ...state, last_registered_hApp: payload};
   }
   case `${DNA_INSTANCE}/${PROVIDER}/get_app_details_SUCCESS`: {
     return { ...state, app_details:payload};
   }
   case `${DNA_INSTANCE}/${PROVIDER}/get_my_registered_app_SUCCESS`: {
     const all_registered_apps = refactorAllApps(payload).toString();
     const all_registered_hApps = [all_registered_apps];
     return { ...state, all_registered_hApps };
   }


    /*Manages Host Returns*/
   case `${DNA_INSTANCE}/${HOST}/is_registered_as_host_SUCCESS`: {
     return { ...state, is_registered_host : payload };
   }
   case `${DNA_INSTANCE}/${HOST}/register_as_host_SUCCESS`: {
     return { ...state };
   }
   case `${DNA_INSTANCE}/${HOST}/get_all_apps_SUCCESS`: {
     return { ...state, all_hApps : refactorAllApps(payload) };
   }
   case `${DNA_INSTANCE}/${HOST}/get_enabled_app_list_SUCCESS`: {
     return { ...state, my_enabled_apps : payload };
   }

     /*Manages WhoAmI Returns*/
   case `${DNA_INSTANCE}/whoami/get_user_SUCCESS`: {
     return { ...state, agent_details : payload };
   }
    default:
      return state;
  }
}
export default transactionReducer;

// NOTE ::
// Need to be removed Soon
export type State = {
// global identifiers :
  list_of_instance_info: Array<any>,
  list_of_agents: Array<any>,
  my_agent_string: string,
  my_agent_hash: string,
  hf_base_dna_hash: string,
  all_hApps: Array<any>,
  all_registered_hApps: Array<any>,
  last_registered_hApp: string,

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
  all_hApps: [],
  all_registered_hApps:[],
  last_registered_hApp: '',
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
