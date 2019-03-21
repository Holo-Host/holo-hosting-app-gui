import * as React from 'react';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/page-styles/DefaultPageMuiStyles'
import Typography from '@material-ui/core/Typography';
import { StateProps, DispatchProps } from '../../containers/HomeRouterContainer';
import RegisterhAppForm from '../page-sub-components/input-fields/RegisterhAppForm';

export interface OwnProps {
  classes: any,
  transferBtnBar: boolean,
  txType: string,
  showTransferBar: (txType:any) => void,
}
export type Props = OwnProps & StateProps & DispatchProps;
export interface State {
  confirmation: string
}

class RegisterhAppFormPage extends React.Component<Props, State> {
  constructor(props:Props){
    super(props);
    this.state = {
      confirmation: ""
    }
  };

  sendProposal = async (txInfoObj: any) => {
    const proposalResult = await this.props.propose_payment(txInfoObj); // send as JSON
    this.sendConfirmationMessage(proposalResult, txInfoObj);
  }

  sendConfirmationMessage = (proposalResult: any, txInfoObj: any) => {
    this.setState({ confirmation: txInfoObj});
  }

  resetMessage = () => {
    this.setState({ confirmation: "" });
  }

  public render () {
    const { classes, transferBtnBar, ...newProps } = this.props;
    const gutterBottom : boolean = true;

    return (
    <div>
      <div>
        <Typography className={classnames(classes.pageHeader,classes.tableHeader)} variant="display2" gutterBottom={gutterBottom} component="h3" >
          Register hApp
       </Typography>
       <hr className={classnames(classes.horizontalLine)}/>
        <div style={{ margin:'0 auto' }}>
          <RegisterhAppForm {...newProps} txType={this.props.txType} invokeProposal={this.sendProposal} invokeRequest={this.sendProposal}  />
        </div>
      </div>
    </div>
    );
  }
}

export default withStyles(styles)(RegisterhAppFormPage);
