import * as React from 'react';
import classnames from 'classnames';
// custom mui styles :
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/page-styles/DefaultPageMuiStyles';
import Typography from '@material-ui/core/Typography';
import Portal from '@material-ui/core/Portal';
import Slide from '@material-ui/core/Slide';
// local imports :
import { StateProps, DispatchProps } from '../../containers/HoloFuelAppRouterContainer';
import BottomMenuBar from '../page-sub-components/bottom-menu-bar/BottomMenuBar';
import SettingFormParameters from '../page-sub-components/input-fields/SettingFormParameters';

export interface OwnProps {
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

class HoloSettings extends React.Component<Props, State> {
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

// instead of props call (while awaiting completion), set state for moment..
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

    return (
    <div>
      <br/>
      <Typography className={classnames(classes.tableHeader, classes.profileHeader)} variant="display2" gutterBottom={gutterBottom} component="h3" >
        HoloFuel Settings
      </Typography>

        <br/>
        <br/>
        <br/>

        <SettingFormParameters {...newProps}/>

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
  )};
}

export default withStyles(styles)(HoloSettings);
