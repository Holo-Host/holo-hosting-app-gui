import * as React from 'react';
import classnames from 'classnames';
import compose from 'recompose/compose';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate, changeLocale } from 'react-admin';
// custom mui styles :
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// local imports :;
import RegisterHost from './RegisterHost'
import RegisterProvider from './RegisterProvider'
import NohAppsMessage from './NohAppsMessage';
import Registered from './RegisteredMessage';

import { fetchhAppBundles, raFetchhAppBundles, makeCustomRAcall, registerAsProvider, isRegisteredAsProvider, registerhAppBundle } from '../happs/happs_actions';
import { fetchAgent } from '../categories/categories_actions';


const styles = {
    main: { width: '5em' },
};

class Register extends React.Component<Props, State> {
  constructor(props:Props){
    super(props);
    this.state = {
      agentData: {agentHash:"", agentString:""},
      prevProps: {},
    }
  };

  getDerivedStateFromProps(props, state) {
    const { whoami } = props;
    if (!whoami) {
      return null;
    }
    else {
      const data = { agentHash: whoami.hash, agentString: whoami };
      const prevProps = state.prevProps || {};
      const agentData = prevProps.value !== data ? data : state.agentData
      console.log("whoami", whoami);
      return ({ agentData, prevProps: agentData });
    }
  }

  componentDidMount () {
    console.log("PROPS : ", this.props);
    this.props.is_registered_as_provider();
    this.props.is_registered_as_host();

// instead of props call (while awaiting completion), set state for moment..
    let newAccess = Object.assign({}, this.state.agentData);
    newAccess.agentHash = this.props.my_agent_hash;
    this.setState({agentData: newAccess});
  }

   render () {
    console.log('Props in AgentProfile:', this.props);
    const { classes, transferBtnBar, showTransferBar, txType, ...newProps } = this.props;
    const gutterBottom : boolean = true;
    // const { agentHash, agentString } = this.state.agentData;
    console.log("check out the contents / body of the state.agentData obj: ", this.state.agentData);

    console.log(this.props.registered_as_provider === undefined );
    console.log( this.props.registered_as_host === undefined);

    if( this.props.registered_as_provider === undefined || this.props.registered_as_host === undefined ) {
      return   <NohAppsMessage tableText="New"/>
    }

    if( this.props.registered_as_host.addresses.length && this.props.registered_as_provider.addresses.length ) {
      return   <Registered />
    }

    return (
      <div>
        <br/>
        { this.props.registered_as_provider.addresses.length ?
            <div />
          :
          <div>
            <Typography className={classnames(classes.profileHeader)} variant="display2" gutterBottom={gutterBottom} component="h3" >
              Register As Host
            </Typography>
            <Typography className={classnames(classes.h3extraTopMargin)} variant="subheading" gutterBottom={gutterBottom} component="h2" >
              Please provide all the details to register as a Host.
            </Typography>
              <br/>
              <br/>

            <RegisterHost {...newProps} />
          </div>
        }


      { this.props.registered_as_provider.addresses.length ?
          <div />
        :
        <div>
          <Typography className={classnames(classes.profileHeader)} variant="display2" gutterBottom={gutterBottom} component="h3" style={{marginTop:'96px'}} >
            Register As Provider
          </Typography>
          <Typography className={classnames(classes.h3extraTopMargin)} variant="subheading" gutterBottom={gutterBottom} component="h2" >
            Please provide all the details to register as a Provider.
          </Typography>
            <br/>
            <br/>

          <RegisterProvider {...newProps} />
        </div>
      }

    </div>
  )};
}

const mapStateToProps = state => ({
    whoami: state.whoami,
    registered_as_host: state.registered_hApp_bundles,
    registered_as_provider: state.registered_hApp_bundles,
    locale: state.i18n.locale,
    registered_hApp_bundles: state.registered_hApp_bundles,
    current_hApp_bundle_details: state.current_hApp_bundle_details,
    all_hApp_bundles: state.all_hApp_bundles,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
      registerAsProvider,
      isRegisteredAsProvider,
      registerhAppBundle,
      fetchhAppBundles,
      raFetchhAppBundles,
      changeLocale,
      fetchAgent,
      makeCustomRAcall
    },
    dispatch
  )
}

const enhance = compose(
    connect(mapStateToProps, mapDispatchToProps),
    translate,
    withStyles(styles)
);

export default enhance(Register);
