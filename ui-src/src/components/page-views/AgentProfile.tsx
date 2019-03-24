import * as React from 'react';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/page-styles/DefaultPageMuiStyles'
import Portal from '@material-ui/core/Portal';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import { StateProps, DispatchProps } from '../../containers/HomeRouterContainer';
import BottomMenuBar from '../page-sub-components/bottom-menu-bar/BottomMenuBar';
import ProfileInfoCard from '../page-sub-components/info-card/ProfileInfoCard';

export interface OwnProps {
  classes: any,
  showTransferBar: (txType:any) => void,
  transferBtnBar: boolean,
  txType: string,
}
export type Props = OwnProps & StateProps & DispatchProps;
export interface State {
  prevProps: any
}
class AgentProfile extends React.Component<Props, State> {
  constructor(props:Props){
    super(props);
  };
  componentDidMount () {
    this.props.get_agent_details();
  }

  public render () {
    const { classes, transferBtnBar, showTransferBar, txType, ...newProps } = this.props;
    const gutterBottom : boolean = true;

    let hash = "Loading ...";
    let name = "Loading ...";
    if (this.props.agent_details){
      hash = this.props.agent_details.hash;
      name = JSON.parse(this.props.agent_details.name).nick;
    }
    return (
    <div>
      <Typography className={classnames(classes.profileHeader)} variant="display2" gutterBottom={gutterBottom} component="h3" >
        Holo Hosting Profile
      </Typography>
      <br/>
      <br/>
      <br/>

      <ProfileInfoCard
        {...newProps}
        hash={hash}
        name={name}
      />

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
  }
}

export default withStyles(styles)(AgentProfile);
