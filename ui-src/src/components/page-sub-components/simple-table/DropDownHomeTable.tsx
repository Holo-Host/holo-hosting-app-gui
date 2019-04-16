import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import Today from '@material-ui/icons/Today';
// import HourGlassIcon from '@material-ui/icons/HourglassEmpty';

import Layers from '@material-ui/icons/Layers';
// import Code from '@material-ui/icons/Code';
// import Description from '@material-ui/icons/Description';
// import MessageIcon from '@material-ui/icons/Message';
import { StateProps, DispatchProps } from '../../../containers/HomeRouterContainer';
import styles from '../../styles/page-styles/DefaultPageMuiStyles';


export interface OwnProps {
  classes: any,
  rowInfo: any
}
export type Props = OwnProps & StateProps & DispatchProps;

export interface State {
}

class DropDownHomeTable extends React.Component<Props, State> {
  constructor(props:Props){
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    this.fetchDetails();
  }

  fetchDetails(){
    // this.props.get_hApp_details({app_hash:this.props.rowInfo.original.hApps_hash});
  }

  public render() {
    const { classes } = this.props;
    const {
      // app_hash,
      app_bundle,
    } = this.props.rowInfo.original;

     console.log("Props of the DropDownHomeTable: ", this.props)
     return (
      <div style={{ width:'100%' }}>
        <Paper className={classes.muiSimpleTableRoot}>
          <Table className={classes.muiSimpleTable}>
            <TableBody>
              <TableRow key={'0'}>
              <TableCell className={classes.tableCell} align="center" scope="currentRow">
                <Layers/> hApp Bundle Hash
              </TableCell>
          {/*    <TableCell className={classes.tableCell} align="center" scope="currentRow">
                  <Code/> UI Hash
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  <Code/> DNA Hash
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                  <Description/> Description
                </TableCell>
              */}
              </TableRow>
              <TableRow key={'1'}>
                <TableCell align="center" className={classes.tableCell}>
                    <h4>{ app_bundle.happ_hash }</h4>
                </TableCell>
                {/*<TableCell align="center" className={classes.tableCell}>
                    <h4>{ app_bundle.ui_hash }</h4>
                </TableCell>
                <TableCell align="center" className={classes.tableCell} scope="currentRow">
                    <h4>{ app_bundle.dna_list }</h4>
                </TableCell>
                <TableCell align="center" className={classes.tableCell}>
                </TableCell>
                */}
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(DropDownHomeTable);
