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
import { StateProps, DispatchProps } from '../../../containers/HomeRouterContainer';
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
        <AppBar position="static" style={{margin: '0 auto', marginTop:"64px", background: "#D3D3D3"}}>
          <Toolbar style={{margin: '0 auto'}}>
            <div>
            <ListItem style={{display: 'inline', paddingTop: "10px"}} button={button}>
              <Link to='/home' className={classes.subheaderLink}>
                <ListItemIcon style={{color:"#000", fontWeight: "bold"}}>
                  <img src="/assets/icons/home.svg" alt="tx-history-logo" width="25px" height="25px"/>
                </ListItemIcon>
                <Typography variant="subheading" style={{color:"#000", fontWeight: "bold", textDecoration: "none", display: "inline" }} gutterBottom={gutterBottom}>
                  Home
                </Typography>
              </Link>
            </ListItem>
            <ListItem style={{display: 'inline', paddingTop: "10px"}} button={button} onClick={this.handleTransferBtnClick}>
              <Link to='#' className={classes.subheaderLink}>
                <ListItemIcon style={{color:"#000", fontWeight: "bold"}}>
                  <img src="/assets/icons/upload.svg" alt="tra  nsfer-logo" width="25px" height="25px"/>
                </ListItemIcon>
                <Typography variant="subheading" style={{color:"#000", fontWeight: "bold", textDecoration: "none", display: "inline" }} gutterBottom={gutterBottom}>
                  Register App
                </Typography>
              </Link>
            </ListItem>
            <ListItem style={{display: 'inline', paddingTop: "10px"}} button={button}>
              <Link to='/settings' className={classes.subheaderLink}>
              <ListItemIcon style={{color:"#000", fontWeight: "bold"}}>
                <img src="/assets/icons/fingerprint.svg" alt="settings-logo" width="25px" height="25px"/>
              </ListItemIcon>
              <Typography variant="subheading" style={{color:"#000", fontWeight: "bold", textDecoration: "none", display: "inline" }} gutterBottom={gutterBottom}>
                Upgrade
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
