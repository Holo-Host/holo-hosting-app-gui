import * as React from 'react';
import { StateProps, DispatchProps } from '../../../containers/HomeRouterContainer';
import '../../styles/page-styles/scaffold-styles.css';
export type Props = DispatchProps & StateProps;

const home_table_columns = (props: Props, state: any) => {
  // console.log("Table Columns Props", props);
  // console.log("Table Columns State", state);
  const table_columns = [{
    Header: 'hApps',
    accessor: 'app_bundle',
    filterAll: true,
      Cell: (row: any) => (
        <div style={{ padding: '5px' }}>
        { row.value.ui_hash }
        </div>
      )
    }, {
    Header: 'Enable/Disable',
    accessor: 'status',
    filterAll: true,
    Cell: (row: any) => (
      <div style={{ padding: '5px' }}>
      { row.value }
      </div>
      )
    }]
  return table_columns;
};

export default home_table_columns;
