import * as React from 'react';
// local imports :
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
// custom mui styles :
import { withStyles } from '@material-ui/core/styles';
import styles from '../../styles/page-styles/DefaultPageMuiStyles';
import Typography from '@material-ui/core/Typography';

export interface OwnProps {
  // These are props the component has received from its parent component
  classes: any,
  currentAgent: { Hash: string, Name: string },
  fetchAgent: () => void,
}
export type Props = OwnProps & StateProps & DispatchProps;
export interface State { /* The components optional internal state */ };

class AgentName extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    this.props.fetchAgent();
  }

  public render () {
    const {currentAgent} = this.props;

    if (!currentAgent){
      return <div/>
    }
    else {
      const truncatedName : string = `${currentAgent.Name.substring(0,15)}...`;
      return (
        <Typography
          style={{textAlign: "center", flexGrow: 1, paddingTop:"8px", color: "#00838d"}}
          variant="display2">
          {currentAgent.Name.length >= 10 ? truncatedName : currentAgent.Name}
        </Typography>
      )
    }
  }
}

export default withStyles(styles)(AgentName);
