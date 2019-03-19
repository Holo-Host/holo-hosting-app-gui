import * as React from 'react';
import * as moment from 'moment';
// mui custom styling :
import { withStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Today from '@material-ui/icons/Today';
import HourGlassIcon from '@material-ui/icons/HourglassEmpty';
import MessageIcon from '@material-ui/icons/Message';
// local imports
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import HoloFuelTransactionDetailPage from '../../page-views/HoloFuelTransactionDetailPage';
import FabFullScreenBtn from '../input-fields/FabFullScreenBtn';
import styles from '../../styles/page-styles/DefaultPageMuiStyles';


export interface OwnProps {
  classes: any,
  rowInfo: any
}
export type Props = OwnProps & StateProps & DispatchProps;

export interface State {
  txDetailModal: boolean
}

let id: number = 0; // to allow for assigning a uuid for the map key...

class MuiSimpleTable extends React.Component<Props, State> {
  constructor(props:Props){
    super(props);
    this.state = {
      txDetailModal: false,
    };
  }

  toggleTxDetailModal = ()=> {
    this.setState({
      txDetailModal: !this.state.txDetailModal
    });
  }

  createData = (due_date: string, tx_initiation_date: string, notes: string) => {
    id =0;
    return { id, due_date, tx_initiation_date, notes };
  }
  public render() {
    const { classes } = this.props;
    const {
      dueDate,
       transaction_timestamp,
       originTimeStamp,
       // originEvent,
       amount,
       counterparty,
       notes,
       status
     } = this.props.rowInfo.original;

     const currentRowDataDetailed: Array<any> = [
       dueDate,
       transaction_timestamp,
       originTimeStamp,
       // originEvent,
       amount,
       counterparty,
       notes,
       status
     ];

     const currentRow = this.createData(dueDate, transaction_timestamp, notes);
     console.log("ROW Details:",currentRow)
    return (
      <div style={{ width:'100%' }}>
        <Paper className={classes.muiSimpleTableRoot}>
          <Table className={classes.muiSimpleTable}>
            <TableBody>
              <TableRow key={currentRow.id}>
                <TableCell className={classes.tableCell} align="center" scope="currentRow">
                  <Today/> Date Initiated
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  <HourGlassIcon/> Due Date
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  <MessageIcon/> Notes
                </TableCell>
              </TableRow>
              <TableRow key={currentRow.id}>
                <TableCell align="center" className={classes.tableCell}>
                  { parseInt(moment(currentRow.tx_initiation_date).startOf('day').fromNow().split(" ")[0]) > 23 ?
                    <h4>{ moment(currentRow.tx_initiation_date).format("LL")}</h4>

                  :  parseInt(moment(currentRow.tx_initiation_date).startOf('day').fromNow().split(" ")[0]) > 1 ?
                    <h4>{moment(currentRow.tx_initiation_date).calendar()}</h4>
                  :
                    <h4>{moment(currentRow.tx_initiation_date).startOf('hour').fromNow()}</h4>
                  }
                </TableCell>
                <TableCell align="center" className={classes.tableCell} scope="currentRow">
                  { parseInt(moment(currentRow.due_date).startOf('day').fromNow().split(" ")[0]) > 23 ?
                    <h4>{ moment(currentRow.due_date).format("LL")}</h4>

                  :  parseInt(moment(currentRow.due_date).startOf('day').fromNow().split(" ")[0]) > 1 ?
                    <h4>{moment(currentRow.due_date).calendar()}</h4>
                  :
                    <h4>{moment(currentRow.due_date).startOf('hour').fromNow()}</h4>
                  }
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  {currentRow.notes}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          {/* Full Page Modal */}
          <FabFullScreenBtn handleClick={this.toggleTxDetailModal} />
          {/* <button>
            <Typography className={classes.subtableHeader} onClick={this.toggleTxDetailModal} variant="caption" component="h6" >
              Visit Detail Page
            </Typography>
          <button> */}
        </Paper>

        {/* Toggle Transaction Detail Full-Page Modal */}
          { this.state.txDetailModal ?
            <HoloFuelTransactionDetailPage
              toggleTxDetailModal={this.toggleTxDetailModal}
              currentRowDataDetailed={currentRowDataDetailed}
              ledger_state={this.props.ledger_state}
            />
          :
            <div/>
          }
      </div>
    )
  }
}

export default withStyles(styles)(MuiSimpleTable);
