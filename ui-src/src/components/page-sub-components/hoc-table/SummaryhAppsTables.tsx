// Main Imports
import * as React from 'react';
import classnames from 'classnames';
// ReactTable Imports
import ReactTable from "react-table";
import { advancedExpandTableHOC } from "./HocSystemTable";
import "react-table/react-table.css";
// MUI Imports:
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExpandMore from '@material-ui/icons/ExpandMore';

// Local Imports
import { StateProps, DispatchProps } from '../../../containers/HomeRouterContainer';
import pending_transaction_table_columns from './SummaryTransactionTableCols';
import { refactorListOfPending } from '../../../utils/table-helper-functions/transaction-data-refactor';
import MuiSimpleTable from '../simple-table/MuiSimpleTable';
import ErrorMessage from '../error-message/ErrorMessage';
import NohAppsMessage from '../error-message/NohAppsMessage';
import { TABLE_DATA_BATCH_LIMIT } from '../../../utils/constants';
import styles from '../../styles/page-styles/DefaultPageMuiStyles';

export interface OwnProps {
  classes: any //,
  // txBatchType: any,
  // txBatchDuration: any,
  // handleTableRefresh: () => void
}
export type Props = OwnProps & StateProps & DispatchProps;

export interface State {
  row: String,
  filter: any,
  data: {} | null,
  prevProps: any,
  txEndDate: string | undefined,
  txStartDate: string | undefined,
  txBatchType: string | undefined,
  currentTxBatchInfo: {newer:{}, over:{}} | null,
  refresh: boolean
}

// For the REACT TABLE Exapandable Version: Advanced HOC
const AdvancedExpandReactTable = advancedExpandTableHOC(ReactTable);

class SummaryhAppsTables extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      row: "",
      filter: null,
      data: {},
      prevProps: {},
      txEndDate: "",
      txStartDate: "",
      txBatchType: "",
      currentTxBatchInfo: null,
      refresh : false
    };
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    const { list_of_transactions, list_of_instance_info, list_of_proposals, list_of_requests, list_of_pending } = props;
    if (!list_of_transactions) {
      return null;
    }
    else {
      const transactionData = { list_of_transactions, list_of_instance_info, list_of_proposals, list_of_requests, list_of_pending };
      const prevProps = state.prevProps || {};
      const data = prevProps.value !== transactionData ? transactionData : state.data
      console.log("data", data);

      const { newer } = list_of_transactions;
      const currentTxBatchInfo = Object.assign({newer}, {});
      const txEndDate = newer!.until;
      const txStartDate = newer!.since;

      return ({
        data,
        prevProps: data,
        currentTxBatchInfo,
        txStartDate,
        txEndDate,
        txBatchType: 'All Transactions',
      });
    }
  }

  handleTxBatchType = (txState: string) => {
  this.setState({
    txBatchType: txState
  });
  this.handleTableRefresh();
  }

  handleTxBatchDuration = (txEndDate: any, txStartDate: any) => {
  this.setState({
    txEndDate,
    txStartDate
  });
  this.handleTableRefresh();
  }

  handleTableRefresh = () => {
    const { txBatchType, txStartDate, txEndDate } = this.state;
      this.props.list_transactions({state: txBatchType, since:txStartDate, until: txEndDate, limit: TABLE_DATA_BATCH_LIMIT });
  }

  handleReloadListOfTx = () => {
    this.setState({ txBatchType:"", txStartDate:"", txEndDate:"" });
    this.props.list_transactions();
  }

  fetchNewData=()=>{
    if(!this.props.list_of_pending.proposals && !this.props.list_of_pending.requests)
    return []
    else
    return refactorListOfPending(this.props.list_of_pending)
  }

  resetPage = () => {
      this.setState({ refresh: !this.state.refresh });
  }

  public render() {
    const { classes, ...newProps } = this.props;
    const gutterBottom : boolean = true;

    if (!this.props.list_of_transactions){
      return <div>
        <ErrorMessage />
      </div>
    }

    const pending_table_columns = pending_transaction_table_columns(this.props, this.state, this.resetPage);
    const new_data_table = this.fetchNewData();

    return (
    <div className={classes.transactionTablesContainer}>

      <Typography className={classnames(classes.tableHeader, classes.leadingTitle, {'hidden': new_data_table!.length <= 0}, {'visible': new_data_table!.length > 0})} variant="display1" gutterBottom={gutterBottom} component="h4" >
        All Apps
      </Typography>

      { new_data_table!.length <= 0 ?
        <NohAppsMessage tableText="New"/>
      :
      <div className={classnames(classes.tableContainer)}>
            <AdvancedExpandReactTable
              className={classnames("-striped", "-highlight", classes.table)}
              showPagination={false}
              pageSize={new_data_table!.length}
              data={new_data_table}
              columns={ pending_table_columns }
              filter={this.state.filter}
              NoDataComponent={() => null}
              defaultFilterMethod={(filter:any, row:any, column:any) => {
                const id = filter.pivotId || filter.id;
                if (typeof filter.value === "object") {
                  return row[id] !== undefined
                    ? filter.value.indexOf(row[id]) > -1
                    : true;
                } else {
                  return row[id] !== undefined
                    ? String(row[id].toUpperCase()).indexOf(filter.value.toUpperCase()) > -1
                    : true;
                }
              }}
              SubComponent={(row:any) => {
              return (
                  <div className={classes.subtable} style={{ padding: "10px", margin: '0 auto', marginBottom:"8px", width:'95%' }}>
                    <MuiSimpleTable
                      {...newProps}
                      rowInfo={row}
                    />
                  </div>
                );
              }}
            />
          </div>
        }
        <div className={classnames(classes.tableButtonBar, {'hidden': new_data_table!.length <= TABLE_DATA_BATCH_LIMIT}, {'visible': new_data_table!.length > TABLE_DATA_BATCH_LIMIT})}>
          <Button variant="outlined" color="primary"
          className={classnames(classes.buttonSumTable, classes.moreBtn, classes.overlayTop)}
          onClick={() => this.handleTableRefresh()}>
            <ExpandMore className={classes.svgMore}/>
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(SummaryhAppsTables);
