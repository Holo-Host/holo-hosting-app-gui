import * as React from 'react';
// import { StateProps, DispatchProps } from '../../../containers/HomeRouterContainer';
import '../../styles/page-styles/scaffold-styles.css';
import Button from '@material-ui/core/Button';
// export type Props = DispatchProps & StateProps;
import axios from 'axios';
const home_table_columns = (props: any, state: any) => {
  const onClickEnable = (event:any) => {
    const postData = {happId: event.original.app_hash};
   let axiosConfig = {
      headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": "*"
      }
    };

   axios.post('http://localhost:9999/holo/happs/install', postData, axiosConfig)
   .then((res) => {
     console.log("RESPONSE RECEIVED: ", res);
     // call to ENABLE app here (upon success...).
   })
   .catch((err) => {
     console.log("AXIOS ERROR: ", err);
   })
  }

  const onClickDisable = (event:any) => {
    console.log("*TODO : Send a request to the Interceptor to Disable*")
  }

  const table_columns = [{
    Header: (row: any) => (<h4 style={{color:'#0e094b', fontSize:'1em'}}>hApps</h4>),
    accessor: 'app_name',
    filterAll: true,
    Cell: (row: any) => (
      <div >
        <h3 style={{fontSize:'1.5rem'}}>{ row.value }</h3>
      </div>
    )
    }, {
    Header: (row: any) => (<h4 style={{color:'#0e094b'}}>Status</h4>),
    accessor: 'status',
    filterAll: true,
    Cell: (row: any) => (
      <div style={{ padding: '5px' }}>
      { row.value === "Enabled" ? <Button variant="contained" onClick={onClickDisable.bind(props,row)}>
        Disable
      </Button> :  <Button variant="contained" value={row} onClick={onClickEnable.bind(props,row)}>
        Enable
      </Button> }
      </div>
    )
    }]
  return table_columns;
};

export default home_table_columns;
