import * as React from 'react';
// import { StateProps, DispatchProps } from '../../../containers/HomeRouterContainer';
import '../../styles/page-styles/scaffold-styles.css';
import Button from '@material-ui/core/Button';
// export type Props = DispatchProps & StateProps;
import axios from 'axios';

const home_table_columns = (props: any, state: any) => {
  const onClickEnable = (event:any) => {
    console.log("*TODO : Send a request to the Interceptor to Enable*",event.original.app_hash)
    axios.post('http://localhost:9999/holo/happs/install', {
      happId: event.original.app_hash,
    },
    {headers:{
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    }})
    .then(function (response) {
      console.log("Axios Completed: ", response);
      props.enable_app({app_hash:event.original.app_hash})
    })
    .catch(function (error) {
      console.log("Axios Error: ",error);
    });
  }

  const onClickDisable = (event:any) => {
    console.log("*TODO : Send a request to the Interceptor to Disable*")
    props.disable_app({app_hash:event.original.app_hash})
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
