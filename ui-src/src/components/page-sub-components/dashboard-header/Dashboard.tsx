import * as React from 'react';
import classnames from 'classnames';
// custom mui styles :
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import TopNav from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
// local page-views imports :
import MainNavListItems from './MainNavListItems';
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
// custom styles
import styles from '../../styles/page-sub-component-styles/DashboardMuiStyles';

export interface OwnProps {
  // These are props the component has received from its parent component
  // e.g. what you write in <ExampleComponent ...>
  className: any,
  history: any,
  classes: any
}
export type Props = OwnProps & StateProps & DispatchProps;

export interface State {
// Component's State (Internal)
}

class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  };

  public render() {
    const { classes } = this.props;
    const noWrap : boolean = true;
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <TopNav
            position="absolute"
            className={classnames(classes.topNav)}
          >
            <Typography className={classes.title} style={{color: "#e4e4e4", textAlign: "center", marginTop:"20px"}} noWrap={noWrap} variant="display1" component="h3" >
              HoloFuel
            </Typography>

            <List className={classnames(classes.navMenuItemsWrapper, "nav-links")}>
              <MainNavListItems className={classnames(classes.navMenuItems, "nav-links")} {...this.props}/>
            </List>

            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
          </TopNav>
            {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Dashboard);
