import * as React from 'react';
import classnames from 'classnames';
import * as moment from 'moment';
// custom mui styles :
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/page-styles/DefaultPageMuiStyles'
// import Avatar from '@material-ui/core/Avatar';
import Portal from '@material-ui/core/Portal';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
// local imports :
import { StateProps, DispatchProps } from '../../containers/HoloFuelAppRouterContainer';
import BottomMenuBar from '../page-sub-components/bottom-menu-bar/BottomMenuBar';
import ProfileInfoCard from '../page-sub-components/info-card/ProfileInfoCard';
import QrGenerator from '../page-sub-components/qr-generator/QrGenerator';
// import ProfileInfoCard from './page-sub-components/info-card/ProfileAccountOptsCard';
// import Jdenticon from '../page-sub-components/avatar-generator/Jdenticon';

export interface OwnProps {
  // These are props the component has received from its parent component
  classes: any,
  showTransferBar: (txType:any) => void,
  transferBtnBar: boolean,
  txType: string,
}
export type Props = OwnProps & StateProps & DispatchProps;
export interface State {
// The components optional internal state
  agentData: {agentHash: string, agentString: string} | null,
  prevProps: any
}

class AgentProfile extends React.Component<Props, State> {
  constructor(props:Props){
    super(props);
    this.state = {
      agentData: {agentHash:"", agentString:""},
      prevProps: {},
    }
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    const { my_agent_hash, my_agent_string } = props;
    if (!my_agent_hash) {
      return null;
    }
    else {
      const data = { agentHash: my_agent_hash, agentString: my_agent_string };
      const prevProps = state.prevProps || {};
      const agentData = prevProps.value !== data ? data : state.agentData
      console.log("agentData", agentData);
      return ({ agentData, prevProps: agentData });
    }
  }

  componentDidMount () {
    console.log("PROPS : ", this.props);
    // call for the agentHash and agentString..!!!!
    // this.props.fetch_agent_hash();

// instead of props API call to fetch Agent Hash (currently awaiting Profiles Zome), set state for moment..
    let newAccess = Object.assign({}, this.state.agentData);
    newAccess.agentHash = this.props.my_agent_hash;
    this.setState({agentData: newAccess});
  }

  public render () {
    console.log('Props in AgentProfile:', this.props);
    const { classes, transferBtnBar, showTransferBar, txType, ...newProps } = this.props;
    const gutterBottom : boolean = true;
    // const { agentHash, agentString } = this.state.agentData;
    console.log("check out the contents / body of the state.agentData obj: ", this.state.agentData)

    let today = moment(new Date());
    const MOCK_AGENT_JOIN_DATE = today.toString().substring(0, 16);
    const MOCK_EMAIL = `${this.state.agentData!.agentString}@holo.host`;

    return (
    <div>
      <Typography className={classnames(classes.tableHeader, classes.profileHeader)} variant="display2" gutterBottom={gutterBottom} component="h3" >
        HoloFuel Profile
      </Typography>
      <br/>
      <br/>
      <br/>

      <ProfileInfoCard
        {...newProps}
        agentHash={this.state.agentData!.agentHash}
        name={this.state.agentData!.agentString}
        email={MOCK_EMAIL} dateJoined={MOCK_AGENT_JOIN_DATE}
      />

      <div className={classes.jumbotronImg}>
        <h4 className={classes.h4}> Your HoloFuel ID</h4>
        <QrGenerator agentHash={this.state.agentData!.agentHash}/>
      </div>

        <div>
        { transferBtnBar ?
          <Portal>
            <Slide direction="down" in={transferBtnBar} mountOnEnter unmountOnExit>
              <BottomMenuBar {...newProps} showTransferBar={this.props.showTransferBar} />
            </Slide>
          </Portal>
        :
          <div/>
        }
      </div>
    </div>
  );

    // /* TODO: Add profile (with update ability) once the API funcationality exists....*/

  }
}

export default withStyles(styles)(AgentProfile);
