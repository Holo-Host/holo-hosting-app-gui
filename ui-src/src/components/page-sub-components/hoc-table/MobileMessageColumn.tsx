// Main Imports
import * as React from 'react';
import * as moment from 'moment';
// MUI styles
import { withStyles } from '@material-ui/core/styles';
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import styles from '../../styles/page-styles/DefaultPageMuiStyles';


export interface OwnProps {
  classes: any
  originEvent: string,
  rowInfo: any
};
export type Props = OwnProps & StateProps & DispatchProps;

export interface State {
  originalTxTimestamp:string,
  eventTxTimestamp:string,
  txStatus:string,
  todo:string
};

class MobileMesssageColumn extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      originalTxTimestamp:"",
      eventTxTimestamp:"",
      txStatus:"",
      todo:""
    }
  }

  public render() {
    const currentRowInfo = this.props.rowInfo.original;
    // console.log("MobileMesssageColumn props", this.props);
    // console.log("MobileMesssageColumn state", this.state);

    return (
      <div>
        <h5 style={{marginBottom:'10px'}}>
          {`${currentRowInfo.counterparty} ${currentRowInfo.originEvent.display_value}`}
        </h5>

         {currentRowInfo.status.split("/")[0] === "incoming" ?
             <span className="increasedBalance" style={{color:"#00828d", margin: "2px"}}>
               + { currentRowInfo.amount } HF
             </span>

         : currentRowInfo.status.split("/")[0] === "outgoing" ?
             <span className="decreasedBalance" style={{color:"#b85eb3", margin: "2px"}}>
               - { currentRowInfo.amount } HF
             </span>

         : currentRowInfo.status.split("/")[0] === "pending" &&
           currentRowInfo.status.split("/")[1] === "spender" ?
             <span className="decreasedBalance" style={{color:"#b85eb3", margin: "2px"}}>
             - { currentRowInfo.amount } HF
             </span>

         :  currentRowInfo.status.split("/")[0] === "pending" &&
            currentRowInfo.status.split("/")[1] === "recipient" ?
             <span className="increasedBalance" style={{color:"#00828d", margin: "2px"}}>
             + { currentRowInfo.amount } HF
             </span>
         :
             <div/>
         }

        <hr/>
        <div style={{ padding: '2px' }}>
          { parseInt(moment(currentRowInfo.originTimeStamp).startOf('day').fromNow().split(" ")[0]) > 23 ?
            <h4>{ moment(currentRowInfo.originTimeStamp).format("LL")}</h4>

          :  parseInt(moment(currentRowInfo.originTimeStamp).startOf('day').fromNow().split(" ")[0]) > 1 ?
            <h4>{moment(currentRowInfo.originTimeStamp).calendar()}</h4>
          :
            <h4>{moment(currentRowInfo.originTimeStamp).startOf('hour').fromNow()}</h4>
          }
        </div>

      </div>
    )
  }
}

export default withStyles(styles)(MobileMesssageColumn);
