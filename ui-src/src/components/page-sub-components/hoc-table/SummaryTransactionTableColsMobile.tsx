// Main Imports
import * as React from 'react';
// import * as matchSorter from 'match-sorter';
import Jdenticon from "../avatar-generator/Jdenticon";
import TransactionDetailsButton from "../transaction-details-button/TransactionDetailsButton";
import MobileMessageColumn from "./MobileMessageColumn";
// mui styles
import AccountCircle from '@material-ui/icons/AccountCircle';
import SwapVerticalCircle from '@material-ui/icons/SwapVerticalCircle';
import Info from '@material-ui/icons/Info';

/* Transaction Table Headers */
const mobile_pending_transaction_table_columns = (props: any, state: any, cb:() => void) => {
  // console.log("Table Columns Props", props);
  // console.log("Table Columns State", state);
  const table_columns = [{
    Header: (row: any) => (<AccountCircle/>),
    accessor: 'counterparty',
    id: 'counterparty',
    Cell: (row: any) => (
        <div style={{ padding: '5px', marginTop:'10px' }}>
          {row.value ?
            <span>
              <Jdenticon hash={row.value} size="45%" {...props}/>
            </span>
          :
            <span/>
          }
        </div>
      )
    }, {
    Header: (row: any) => (<SwapVerticalCircle/>),
    id: 'originEvent',
    accessor: 'originEvent',
    Cell: (row: any) => (
      <div style={{ padding: '5px', marginTop:'-12px' }}>
        <MobileMessageColumn originEvent={row.value.display_value} rowInfo={row} {...props} />
      </div>
      )
    }, {
    Header: (row: any) => (<Info/>),
    id: 'status',
    accessor: 'status',
    Cell: (row: any) => (
      <div style={{ padding: '5px'}}>
        <TransactionDetailsButton
          {...props}
          transactionState={row.value}
          rowInfo={row}
          resetPage={() => cb()}
        />
      </div>
      )
    }]
  return table_columns;
};
export default mobile_pending_transaction_table_columns;


export const mobile_processed_transaction_table_columns = (props: any, state: any) => {
  // console.log("Table Columns Props", props);
  // console.log("Table Columns State", state);
  const table_columns = [{
    Header: 'Transaction Date',
    accessor: 'transaction_timestamp',
      Cell: (row: any) => (
        <div style={{ padding: '5px' }}>
        { row.value }
        </div>
      )
    }, {
    Header: 'Amount',
    accessor: 'amount',
    Cell: (row: any) => (
      <div style={{ padding: '5px' }}>
      { row.value }
      </div>
      )
    }, {
    Header: 'Action',
    accessor: 'action',
    Cell: (row: any) => (
      <div style={{ padding: '5px' }}>
      { row.value }
      </div>
      )
    }, {
    Header: 'Counterparty',
    accessor: 'counterparty',
    Cell: (row: any) => (
      <div style={{ padding: '5px' }}>
      { row.value }
      </div>
    )
   }]
  return table_columns;
};
