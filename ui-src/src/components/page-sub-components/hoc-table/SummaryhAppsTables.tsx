import * as React from 'react';
import classnames from 'classnames';
import ReactTable from "react-table";
import { advancedExpandTableHOC } from "./HocSystemTable";
import "react-table/react-table.css";
import { withStyles } from '@material-ui/core/styles';
import { StateProps, DispatchProps } from '../../../containers/HomeRouterContainer';
import home_table_columns from './ColoumnsHomeTable';
import MuiSimpleTable from '../simple-table/MuiSimpleTable';
import ErrorMessage from '../error-message/ErrorMessage';
import NohAppsMessage from '../error-message/NohAppsMessage';
import styles from '../../styles/page-styles/DefaultPageMuiStyles';
import {table_data} from '../../../utils/data-refactor'
export interface OwnProps {
  classes: any
}
export type Props = OwnProps & StateProps & DispatchProps;

export interface State {
  filter: any,
}

const AdvancedExpandReactTable = advancedExpandTableHOC(ReactTable);

class SummaryhAppsTables extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      filter: null,
    };
  }

  fetchTableData = () => {
    console.log("fetching table : ", this.props)
    if(this.props.all_hApps !== undefined)
    return table_data(this.props.all_hApps);
    else
    return []
  }

  public render() {
    const { classes,
      ...newProps
    } = this.props;

    if (!this.props.all_hApps){
      return <div>
        <ErrorMessage />
      </div>
    }

    console.log("In the table props: ", this.props)

    console.log("In the table State: ", this.state)

    const table_columns = home_table_columns(this.props, this.state);
    const table_data = this.fetchTableData();

    console.log("Table Data: ",table_data);
    return (
    <div className={classes.transactionTablesContainer}>

      { table_data!.length <= 0 ?
        <NohAppsMessage tableText="New"/>
      :
      <div className={classnames(classes.tableContainer)}>
            <AdvancedExpandReactTable
              className={classnames("-striped", "-highlight", classes.table)}
              showPagination={false}
              pageSize={table_data!.length}
              data={table_data}
              columns={ table_columns }
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
      </div>
    );
  }
}

export default withStyles(styles)(SummaryhAppsTables);
