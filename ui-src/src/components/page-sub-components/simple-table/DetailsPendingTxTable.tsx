import * as React from 'react';
// mui custom styling :
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// local imports
import styles from '../../styles/page-styles/DefaultPageMuiStyles';


export interface OwnProps {
  classes: any,
}

let id = 0; // to allow for assining a uuid for the map key...
function createData(originDate: string, dueDate: string, counterparty:any, amount:any, status: any, action:any, notes:any) {
    id += 1;
    return { id, originDate, dueDate, counterparty, amount, status, action, notes };
}

// const CURRENT_ROW_DATA => REPLACE with the avail ROW data/info from within the Row SubComponent;
const currentRow = createData("origin_date", "due_date", "counterparty", "amount", "status", "action", "notes");
// const currentRow = createData(this.props.currentRowData);

function SimpleTable(props: any) {
  const { classes } = props;
  return (
    <Paper className={classes.muiSimpleTableRoot}>
      <Table className={classes.muiSimpleTable}>
        <TableHead>
          <TableRow>
            <TableCell>Origin Date</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell align="right">Counterparty</TableCell>
            <TableCell align="right">Balance Adjustment</TableCell>
            <TableCell align="right">Notes</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow key={currentRow.id}>
            <TableCell component="th" scope="currentRow">{currentRow.originDate}</TableCell>
            <TableCell align="right">{currentRow.dueDate}</TableCell>
            <TableCell align="right">{currentRow.counterparty}</TableCell>
            <TableCell align="right">{currentRow.amount}</TableCell>
            <TableCell align="right">{currentRow.status}</TableCell>
            <TableCell align="right">{currentRow.action}</TableCell>
            <TableCell align="right">{currentRow.notes}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(SimpleTable);
