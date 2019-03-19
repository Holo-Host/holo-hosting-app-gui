import * as moment from 'moment';
type Moment = moment.Moment;

export type ReactInputParam = React.ChangeEvent<HTMLInputElement> | string | undefined | null;

// HOLOCHAIN TYPING definitions :
export type HashString = string;
export type Address = HashString;
export type Signature = HashString;

///////////////////////////////////////////////////////
          /*  Date Verfication and TYPING  */
//////////////////////////////////////////////////////
// create DateTimeStringGuard as TypeGuard to create a form of nominal
//  typing to structurally distinguish between a Type `string` and a DateTimeString
//  while still maintaing DateTimeStringing's structual compatibility
//  with a Type `string`.
// TODO: finish the implemenation of type guard below:
// enum DateTimeStringGuard { };
// export type DateTimeString = string & DateTimeStringGuard;

export type DateTimeString = string;
export function checkifValidDateTimeString(str: string): boolean {
  return str.match(/^\d{4}-\d{2}-\d{2}$/) !== null;
};


///////////////////////////////////////////////////////
          /*  HoloFuel Types */
//////////////////////////////////////////////////////
export type Event = {
    Request? : Transaction,
    Reject? : object,
    Invoice? : Invoice,
    // Return occurs after the spender has sent a check,
    //  but then the recipient denies reception of funds.
    Return? : object,
    Receipt? : Receipt,
    Refund? : object,
    // Spender
    Proposal? : Proposal,
    Cheque? : Cheque,
    Decline? : object,
    Recover? : object,
    // Externally detected failures, carrying error details
    Failure? : object
};

export type ListStateNames = {
    StateName? : Event,
    StateList? : Array<Event>
}

export type RequestActionParam = {
  from: Address,  // this was to >> shouldn't it be "from" ?!?!?!
  amount: string,
  notes?: string,
  deadline?: DateTimeString | Moment | string
}

export type ProposalActionParam = {
  to: Address, // this was from >> shouldn't it be "to" ?!?!?!
  amount: string,
  notes?: string,
  deadline?: DateTimeString | Moment | string | undefined,
  request?: string
}

export type Transaction = {
    to: Address,
    amount: string,
    notes?: string,
    deadline?: DateTimeString | Moment | string | undefined,
    // transaction should not have request.. track what requires this and refactor/rework...
    request?: Address
}

export type Proposal = {
   // from === the agent_hash of the PROPOSER.
   from: Address,
   tx: Transaction,
    // request === the commit_hash/address of the request (if prosposal is in response to a request...)
  request?: Address
};

export type Invoice = {
  proposal: Proposal,
  proposal_sig: Signature,
  proposal_commit: Address
}

export type Cheque = {
    invoice: Invoice,
    invoice_sig: Signature,
    invoice_commit: Address
}

export type Receipt = {
    cheque: Cheque,
    cheque_sig: Signature,
    cheque_commit: Address
}

export type Ledger = {
  balance: number | null,
  credit: number | null,
  payable: number | null,
  receivable: number | null
}

export type Adjustment = {
  balance: number,
  payable: number,
  receivable: number,
  credit?: number
}

export type AddressArray = Array<Address>; // an array of the commit hashes/ dht addresses


// The details of each pending request/proposal includes its TxOrigin Address, the ChainHeader timestamp of the Event commit, and the Event details. 
export type PendingResult = {
  requests?: [ Address, DateTimeString | Moment | string, Event ],
  proposals?: [ Address, DateTimeString | Moment | string, Event ]
}

export type ListTransactionOptions = {
  state?: ListStateNames | Moment | string
  since?: DateTimeString | Moment | string,
  until?: DateTimeString | Moment | string,
  limit?: number,
}

// export type ListTransactionsCoverage = {
//   first: number, //   index of 1st transaction
//   count: number, //   and how many transaction returned
//   total: number
// }

export type ListTransactionsResult = {
  ledger: Ledger,
  newer: ListTransactionOptions,
  older: ListTransactionOptions,
  transactions: [
    {
      timestamp: {
        event: DateTimeString | string,
        origin: DateTimeString | string
      }
      state: string,
      origin: Address,
      event: Event,
      adjustment: Adjustment
    }
  ]
}
