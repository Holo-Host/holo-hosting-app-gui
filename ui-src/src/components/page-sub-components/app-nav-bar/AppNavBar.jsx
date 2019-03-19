import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
// mui custom styles :
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Grow from '@material-ui/core/Grow';
import Slide from '@material-ui/core/Slide';

const styles = {
  root: {
    flexGrow: 1,
    background: '#fbfbfb',
    color:  '#057266f2',
    display: 'inline',
    // zIndex : 3
  },
  grow: {
    flexGrow: 1,
    color: '#00838d',
    fontFamily: 'Raleway'
  },
  iconButton: {
    marginLeft: -12,
    marginRight: 20,
    color:"#bec4dd"
  },
  icon : {
  color:"#bec4dd"
},
  minimizeHeader: {
    fontWeight: 300,
    fontSize: 22,
    position: 'fixed',
    top: 15,
    left: 85,
  },
  fullSizeHeader: {
    fontWeight: 400,
    fontSize: 28,
  },
  minimizeBtnBar: {
    position: 'fixed',
    // display: 'flex',
    right: 0,
  },
  fullSizeBtnBar: {
    position: 'default',
    display: 'flex',
  },
};


class AppNavBar extends React.Component {
  state = {
    // auth: true,
    anchorEl: null,
    scrolledUp: false,
    chooseTxBtnBarOpen: false
  };

  componentDidMount = () => {
    document.addEventListener('scroll', this.handleScrollTop);
  }

  componentWillUnmount = () => {
    document.removeEventListener('scroll', this.handleScrollTop);
  }

  handleScrollTop = () => {
    // (window as any)
    let scrolledUp = window.scrollY > 70;
    if(scrolledUp !== this.state.scrolledUp) {
      this.setState({ scrolledUp })
    }
  }

  handleTransferBtnClick = () => {
    this.props.showTransferBar("");
  };

  // handleChange = event => {
  //   this.setState({ auth: event.target.checked });
  // };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl, scrolledUp  } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="fixed" style={{margin: '0 auto',  background: "#0e094b"}}>
          <Toolbar>
            <div>
              <IconButton
                className={classes.iconButton}
                color="inherit"
                aria-label="Icon"
              >
                <Link to='/holofuelsummary'>
                  <img src="/assets/icons/holo-logo.png" alt="holo-logo" width="50"/>
                </Link>
              </IconButton>
            </div>

            { scrolledUp ?
              <Slide direction="left" in={scrolledUp} mountOnEnter unmountOnExit>
                <Typography variant="h6" color="inherit" className={classnames(classes.grow, scrolledUp ? classes.minimizeHeader : classes.fullSizeHeader)}>
                  HoloFuel
                </Typography>
              </Slide>
            :
              <Typography variant="h6" color="inherit" className={classnames(classes.grow, scrolledUp ? classes.minimizeHeader : classes.fullSizeHeader)}>
                HoloFuel
              </Typography>
          }

            { scrolledUp ?
                <div className={classnames(scrolledUp ? classes.minimizeBtnBar : classes.fullSizeBtnBar)}>
                  <Grow in={scrolledUp}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(scrolledUp ? { timeout: 800 } : {})}
                  >
                    <IconButton
                      className={classes.icon}
                      aria-haspopup="false"
                    >
                      <Link to='/holofuelsummary'>
                        <img src="/assets/icons/tx-history.png" alt="tx-history-logo" width="18px" height="18px"/>
                      </Link>
                    </IconButton>
                  </Grow>

                  <Grow in={scrolledUp}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(scrolledUp ? { timeout: 1000 } : {})}
                  >
                    <IconButton
                      className={classes.icon}
                      aria-haspopup="false"
                      onClick={this.handleTransferBtnClick}
                    >
                      <img src="/assets/icons/transfer.png" alt="transfer-logo" width="18px" height="18px"/>
                    </IconButton>
                  </Grow>

                  <Grow in={scrolledUp}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(scrolledUp ? { timeout: 1200 } : {})}
                  >
                    <IconButton
                      className={classes.icon}
                      aria-haspopup="false"
                    >
                      <Link to='/settings'>
                        <img src="/assets/icons/settings.png" alt="settings-logo" width="18px" height="18px"/>
                      </Link>
                    </IconButton>
                  </Grow>

                  <Grow in={scrolledUp}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(scrolledUp ? { timeout: 1400 } : {})}
                  >
                    <IconButton
                        className={classes.icon}
                        aria-owns={open ? 'profile-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleMenu}
                      >
                        <AccountCircle />
                    </IconButton>
                  </Grow>
                  <Menu
                    id="profile-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <Link to='/profile'>
                      <MenuItem onClick={this.handleClose}>My Profile</MenuItem>
                    </Link>
                  </Menu>
                </div>
              :
                <div>
                  <IconButton
                      className={classes.icon}
                      aria-owns={open ? 'profile-appbar' : undefined}
                      aria-haspopup="true"
                      onClick={this.handleMenu}
                    >
                      <AccountCircle />
                  </IconButton>
                  <Menu
                    id="profile-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <Link to='/profile'>
                      <MenuItem onClick={this.handleClose}>My Profile</MenuItem>
                    </Link>
                  </Menu>
                </div>
              }
        </Toolbar>
      </AppBar>
    </div>
  )};
}

export default withStyles(styles)(AppNavBar);
// <MenuItem onClick={this.handleClose}>Sign Out</MenuItem>
