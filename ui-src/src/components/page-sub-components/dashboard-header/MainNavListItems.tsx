import * as React from 'react';
import { Link } from 'react-router-dom';
// MUI Imports:
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
// import InfoIcon from '@material-ui/icons/Info';
import PeopleIcon from '@material-ui/icons/People';
import LayersIcon from '@material-ui/icons/Layers';
// import AssignmentIcon from '@material-ui/icons/Assignment';
// Local Imports
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
// import styles from '../../styles/page-sub-component-styles/DashboardMuiStyles';

export interface OwnProps {
  // These are props the component has received from its parent component
  // e.g. what you write in <ExampleComponent ...>
}
export type Props = OwnProps & StateProps & DispatchProps;

export interface State {
  file: "",
  file_path: "",
  message: "",
  errorMessage: ""
}

const button : boolean = true;
const gutterBottom : boolean = true;

class MainListItems extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      file: "",
      file_path: "",
      message: "",
      errorMessage: "",
    };
}

  public render () {
    // console.log("PROPS inside the MAIN-NAVV--LIST-ITEMS file...", this.props);

    return (
      <div>
        <br />
        <ListItem style={{paddingTop: "10px"}} button={button}>
          <Link to='/holofuelsummary'>
            <ListItemIcon style={{color:"#0e88efde"}}>
              <DashboardIcon />
            </ListItemIcon>
            <Typography variant="subheading" style={{color:"#95b9ed", paddingTop:'0px', textDecoration: "none", display: "inline-block", marginLeft: "5px" }} gutterBottom={gutterBottom}>
              Transaction Summary
            </Typography>
          </Link>
        </ListItem>
        <ListItem style={{paddingTop: "10px !important"}} button={button}>
          <Link to='/holofuelrequest'>
            <ListItemIcon style={{color:"#0e88efde"}}>
              <LayersIcon />
            </ListItemIcon>
            <Typography variant="subheading" style={{color:"#95b9ed", paddingTop:'0px', textDecoration: "none", display: "inline-block", marginLeft: "5px" }} gutterBottom={gutterBottom}>
              Account Transfer
            </Typography>
          </Link>
        </ListItem>
        <ListItem style={{paddingTop: "10px !important"}} button={button}>
          <Link to='/about'>
          <ListItemIcon style={{color:"#0e88efde"}}>
            <PeopleIcon />
          </ListItemIcon>
          <Typography variant="subheading" style={{color:"#95b9ed", paddingTop:'0px', textDecoration: "none", display: "inline-block", marginLeft: "5px" }} gutterBottom={gutterBottom}>
            About
          </Typography>
        </Link>
        </ListItem>
      <Divider />
    </div>
    )
  }
}

export default MainListItems;
