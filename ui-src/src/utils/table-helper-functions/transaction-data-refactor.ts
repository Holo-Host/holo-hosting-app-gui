/*/////////////////////////////////////////////////////////////////
   Table Data Generation Refactor Helper Function - Final Obj
 //////////////////////////////////////////////////////////////////*/
const dataRefactor = (transaction_details: any) => {
  // console.log("APPDETAILS:-------------->",transaction_details);
  const APP_LIST_LENGTH = transaction_details.length;

  const insertAppDetails = (transaction: any) => {
    // console.log("transaction", transaction);
    if (transaction !== parseInt(transaction, 10)) {
      const newTxObj = {
        originTimeStamp: transaction.originTimeStamp, // timestamp of the intial Transaction
        originEvent: transaction.originEvent === "Request" ? "Requested" : "Sent",
        counterparty: transaction.counterparty,
        txAuthor: transaction.txAuthor || undefined,
        amount:  transaction.amount,
        event: transaction.event,
        status: transaction.status,
        transaction_timestamp: transaction.transactionTimestamp, //timestamp of the current Transaction
        eventCommitHash:transaction.eventCommitHash,
        dueDate: transaction.dueDate,
        notes: transaction.notes,
        originCommitHash: transaction.originCommitHash,
        proposalCommitSignature: transaction.proposalCommitSignature || undefined,
        inResponseToTX: transaction.inResponseToTX,
        rowNumberType: transaction.rowNumberType
      };
      // console.log("newTxObj", newTxObj);
      return newTxObj;
    }
    else {
      return "";
    }
  }

  const range = (length: number) => {
    const lengthArray: Array < any > = [];
    for (let i = 0; i < length; i++) {
      lengthArray.push(i);
    }
    return lengthArray;
  }

  const dataGenerate = (length: number = APP_LIST_LENGTH) => {
    return transaction_details.map((transaction: any) => {
      return {
        ...insertAppDetails(transaction),
        children: range(length - 1).map(insertAppDetails) // # per page...
      };
    })
  }
  return dataGenerate()
}

//////////////////////////////////////////////////////////////////////////////////
          /* Data for Pending Transactions Table Overview */
//////////////////////////////////////////////////////////////////////////////////

// export const refactorData = (list_of_transactions:any,list_of_pending:any)=>{
//
//   const pending = refactorListOfPending(list_of_pending);
//   const {list_of_refactored_transactions,list_of_refactored_processed} = refactorListOfTransactions(list_of_transactions);
//   // console.log("/////////////////////////////")
//   // console.log("DataRefactore list_of_refactored_transactions:",list_of_refactored_transactions)
//   // console.log("DataRefactore pending:",pen)
//   // console.log("DataRefactore list_of_refactored_processed:",list_of_refactored_processed)
//   // console.log("/////////////////////////////")
//   return {pending_table_data:list_of_refactored_transactions.concat(pending),
//     processed_table_data:list_of_refactored_processed}
// }


let rowNumberType: string = 'odd';
const alternateEven = () => {
  if (rowNumberType === "odd") {
    return rowNumberType ="even"
  }
  else {
    return rowNumberType ="odd"
  }
}

export const refactorListOfPending = (list_of_pending:any)=>{
  const  list_of_proposals =  list_of_pending.proposals.map((p:any) => {
    return {
      originTimeStamp: p[0][1],
      amount:p[0][2].Proposal.tx.amount,
      originEvent:p[0][2].Proposal.request ? "Request" : "Proposal",
      event: "Proposal",
      counterparty:p[0][2].Proposal.tx.from,
      txAuthor: p[0][2].Proposal.tx.to,
      status: "pending/recipient",
      dueDate: p[0][2].Proposal.tx.deadline,
      notes:  p[0][2].Proposal.tx.notes,
      originCommitHash: p[0][2].Proposal.request ? p[0][2].Proposal.request : p[0][0], // the tx origin commit hash
      eventCommitHash: p[0][0], // the 'origin' proposal commit hash
      inResponseToTX:p[0][2].Proposal.request || undefined, // the request hash that the proposal is in response to, should it exist...
      transactionTimestamp: p[0][1],
      proposalCommitSignature: p[1][1],
      rowNumberType
    };
  });

  const  list_of_requests =  list_of_pending.requests.map((r:any) => {
      return {
      originTimeStamp: r[0][1],
      amount:r[0][2].Request.amount,
      originEvent:"Request",
      event: "Request",
      counterparty:r[0][2].Request.to,
      txAuthor: r[0][2].Request.from,
      status: "pending/spender",
      dueDate: r[0][2].Request.deadline,
      notes:  r[0][2].Request.notes,
      originCommitHash: r[0][0],
      eventCommitHash: r[0][0], // commit hash for the currently displayed Transaction === the origin commit hash in this cirumstance
      inResponseToTX: undefined,
      transactionTimestamp: r[0][1],
      requestCommitSignature: r[1][1],
      rowNumberType
    };
  });

  return dataRefactor(list_of_proposals.concat(list_of_requests));
}

export const refactorListOfTransactions = (list_of_transactions: any) => {
  // console.log("list_of_transactions >> check to see list of TRANSACTIONS : ", list_of_transactions);
  const list_of_refactored_transactions = list_of_transactions.transactions.map((tx: any) => {
    const event = tx.event;
    // console.log("transaction.transactions.event", event);
    let txEvent:string | undefined = undefined;
    let originEvent:string | undefined = undefined;
    let amount: number | null = null;
    let counterparty: string | undefined = undefined;
    let dueDate: string | undefined = undefined;
    // let txTimestamp: string; // FIND way to get acess to this for all tx types...
    let notes: string | undefined = undefined;
    let originCommitHash : string | undefined = undefined; // FIND way to get acess to this for all tx types...
    let inResponseToTX: string | undefined = undefined;
    let rowNumberType: string | undefined = alternateEven();
    // console.log("rowNumberType >> should oscilate between odd and even << :", rowNumberType);

    if (event.Request){
      txEvent = "Request";
      originEvent = "Request";
      amount =  event.Request.amount;
      counterparty = event.Request.from;
      dueDate = event.Request.deadline;
      notes = event.Request.notes;
      inResponseToTX = undefined;
      originCommitHash =  tx.timestamp.origin;

    }
    else if (event.Proposal){
      // if a request commit hash exists, then the request was the original transaction in tx-chain.
      txEvent="Proposal"
      originEvent = event.Proposal.request ? "Request" : "Proposal";
      amount =  event.Proposal.tx.amount;
      counterparty = event.Proposal.tx.to;
      dueDate = event.Proposal.tx.deadline;
      notes = event.Proposal.tx.notes;
      inResponseToTX = event.Proposal.request;// the request hash that the proposal is in response to, should it exist...
      originCommitHash = event.Proposal.request ? event.Proposal.request : tx.timestamp.origin; // tx origin commit hash
    }

        // case 'decline' :
        //   break;

        // case 'reject' :
        //   break;

        // case 'refund' :
        //   break;


      return {
        originCommitHash, // tx origin commit hash
        eventCommitHash: tx.origin, // 'origin' commit hash for the currently displayed Transaction
        amount,
        originEvent,
        event: txEvent,
        counterparty,
        status: tx.state,
        originTimeStamp: tx.timestamp.origin,
        dueDate: dueDate,
        notes: notes,
        inResponseToTX,
        transactionTimestamp: tx.timestamp.event,
        rowNumberType,
      };
    });

    const list_of_processed = list_of_refactored_transactions.filter((tx:any)=>{
      return status === "refunded" ||
      status === "rejected" ||
      status === "declined" ||
      status === "completed" ||
      status === "recovered"
    })
    const list_of_pending = list_of_refactored_transactions.filter((tx:any)=>{
      return status !== "refunded" &&
      status !== "rejected" &&
      status !== "declined" &&
      status !== "completed" &&
      status !== "recovered"
    })

    return {
      pending_table_data:dataRefactor(list_of_pending),
      processed_table_data:dataRefactor(list_of_processed)
    };
};
