import * as React from 'react';
// import { StateProps, DispatchProps } from '../../../containers/HomeRouterContainer';
import '../../styles/page-styles/scaffold-styles.css';
import Button from '@material-ui/core/Button';
// export type Props = DispatchProps & StateProps;
import axios from 'axios';


const home_table_columns = (props: any, state: any) => {

  const onClickEnable = async(event:any) => {
    const postData = {happId: event.original.app_hash};
    let axiosConfig = {
       headers: {
           'Content-Type': 'application/json',
           "Access-Control-Allow-Origin": "*"
       }
     };

    axios.post('http://localhost:9999/holo/happs/install', postData, axiosConfig)
    .then((res) => {
      console.log("RESPONSE RECEIVED (Should be happ address): ", JSON.parse(res.config.data).happId);
      // TODO: UPDATE THE ENABLE_APP Call to redux here (upon success...).
      let hAppHash = JSON.parse(res.config.data);
      hAppHash = hAppHash.happId;
      props.enable_app({app_hash:hAppHash});

      // const hAppHash = {app_hash: res};
      // axios.post('http://localhost:9999/holo/happs/enable_app', hAppHash, axiosConfig);
    })
    .catch((err) => {
      console.log("AXIOS ERROR: ", err);
    })
  }

  const onClickDisable = (event:any) => {
    console.log("TODO : Send a request to the Interceptor to Disable")
    props.disable_app({app_hash:event.original.app_hash})
  }

  const onClickView = (event:any) => {
    console.log("*TODO : View Details*")
    props.get_app_details_from_hstore({app_hash:event.original.app_bundle.happ_hash})
  }

  const table_columns = [{
    Header: (row: any) => (<h4 style={{color:'#0e094b', fontSize:'1em'}}>hApps</h4>),
    accessor: 'app_hash',
    filterAll: true,
    Cell: (row: any) => (
      <div >
        <h3 style={{fontSize:'1.5rem'}}>{ row.value }</h3>
      </div>
    )
    },
    {
    Header: (row: any) => (<h4 style={{color:'#0e094b'}}>Status</h4>),
    accessor: 'Details',
      filterAll: true,
    Cell: (row: any) => (
      <div style={{ padding: '5px' }}>
      <Button variant="contained" value={row} onClick={onClickView.bind(props,row)}>
        View
      </Button>
      </div>
    )
  },
   {
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
