import * as React from 'react';
import { Link } from 'react-router-dom';
// MUI Imports:
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';

// Local Imports
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import styles from '../../styles/page-styles/DefaultPageMuiStyles';


export interface OwnProps {
  // These are props the component has received from its parent component
  // e.g. what you write in <ExampleComponent ...>
  classes: any;
  showTransferBar: (txType: any) => void;
}
export type Props = OwnProps & StateProps & DispatchProps;

export interface State {
  message: "",
  errorMessage: ""
}

const button : boolean = true;
const gutterBottom : boolean = true;

class SubNavBar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      message: "",
      errorMessage: ""
    };
  }


  handleTransferBtnClick = () => {
    this.props.showTransferBar("");
  };

  public render(){
    const {classes} = this.props;
    return (
      <div className={classes.subnavRoot}>
        <AppBar position="static" style={{margin: '0 auto', marginTop:"64px", background: "#0e3658"}}>
          <Toolbar style={{margin: '0 auto'}}>
            <div>
            <ListItem style={{display: 'inline', paddingTop: "10px"}} button={button}>
              <Link to='/holofuelsummary' className={classes.subheaderLink}>
                <ListItemIcon style={{color:"#799ab6"}}>
                  <img src="/assets/icons/tx-history.png" alt="tx-history-logo" width="25px" height="25px"/>
                </ListItemIcon>
                <Typography variant="subheading" style={{color:"#799ab6", textDecoration: "none", display: "inline" }} gutterBottom={gutterBottom}>
                  HoloFuel History
                </Typography>
              </Link>
            </ListItem>
            <ListItem style={{display: 'inline', paddingTop: "10px"}} button={button} onClick={this.handleTransferBtnClick}>
              <Link to='#' className={classes.subheaderLink}>
                <ListItemIcon style={{color:"#799ab6"}}>
                  <img src="/assets/icons/transfer.png" alt="transfer-logo" width="25px" height="25px"/>
                </ListItemIcon>
                <Typography variant="subheading" style={{color:"#799ab6", textDecoration: "none", display: "inline" }} gutterBottom={gutterBottom}>
                  Transfer HoloFuel
                </Typography>
              </Link>
            </ListItem>
            <ListItem style={{display: 'inline', paddingTop: "10px"}} button={button}>
              <Link to='/settings' className={classes.subheaderLink}>
              <ListItemIcon style={{color:"#799ab6"}}>
                <img src="/assets/icons/settings.png" alt="settings-logo" width="25px" height="25px"/>
              </ListItemIcon>
              <Typography variant="subheading" style={{color:"#799ab6", textDecoration: "none", display: "inline" }} gutterBottom={gutterBottom}>
                Settings
              </Typography>
            </Link>
            </ListItem>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )}
};

export default withStyles(styles)(SubNavBar);
