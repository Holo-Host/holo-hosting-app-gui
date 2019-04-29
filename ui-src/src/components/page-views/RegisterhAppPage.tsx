import * as React from 'react';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/page-styles/DefaultPageMuiStyles'
import Typography from '@material-ui/core/Typography';
import { StateProps, DispatchProps } from '../../containers/HomeRouterContainer';
import RegisterhAppForm from '../page-sub-components/form/RegisterhAppForm';
import NotRegisteredAsProvider from '../page-sub-components/error-message/NotRegisteredAsProvider';
import NohAppsMessage from '../page-sub-components/error-message/NohAppsMessage';

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

  resetMessage = () => {
    this.setState({ confirmation: "" });
  }

  public componentDidMount () {
    this.props.is_registered_as_provider();
  }

  public render () {
    const { classes, ...newProps } = this.props;
    const gutterBottom : boolean = true;
    if( this.props.is_registered_provider === undefined) {
      return   <NohAppsMessage tableText="New"/>
    }
    if(this.props.is_registered_provider.links.length === 0) {
      return   <NotRegisteredAsProvider />
    }
    return (
    <div>
      <div>
        <Typography className={classnames(classes.pageHeader)} variant="display2" gutterBottom={gutterBottom} style={{ color:'#0000008a' }} component="h3" >
          Register hApp as Provider
       </Typography>
        <div style={{ margin:'0 auto' }}>
          <RegisterhAppForm {...newProps} />
        </div>
      </div>
    </div>
    );
  }
}

export default withStyles(styles)(RegisterhAppFormPage);
