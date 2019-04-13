import * as React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
// custom mui styles :
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Portal from '@material-ui/core/Portal';
import Slide from '@material-ui/core/Slide';
import TagFacesIcon from '@material-ui/icons/TagFaces';
import Dashboard from '@material-ui/icons/Dashboard';
// local imports
import { StateProps, DispatchProps } from '../../containers/HomeRouterContainer';
import HAppTables from '../page-sub-components/hoc-table/SummaryhAppsTables';
import BottomMenuBar from '../page-sub-components/bottom-menu-bar/BottomMenuBar';
import styles from '../styles/page-styles/DefaultPageMuiStyles';
import { table_data } from '../../utils/data-refactor'
import '../styles/page-styles/scaffold-styles.css';

export type ClientType = {
   key: number,
   label: string
};

export interface OwnProps {
  classes: any,
  txType: any,
  showTransferBar: (txType:any) => void,
  transferBtnBar: boolean,
  is_registered_provider:any,
  is_registered_host:any,
  agent_details:any,
}
export type Props = OwnProps & StateProps & DispatchProps;
export interface State {
  txEndDate: string | undefined,
  txStartDate: string | undefined,
  txBatchType: string | undefined,
  currentTxBatchInfo: {newer:{}, over:{}} | null,
  data: {} | null,
  prevProps: any,
  clientType: Array<ClientType>
}

class HomeSummaryPage extends React.Component<Props, State> {
  constructor(props:Props){
    super(props);
    this.state = {
      txEndDate: "",
      txStartDate: "",
      txBatchType: "",
      currentTxBatchInfo: null,
      data: {},
      prevProps: {},
      clientType: [
        { key: 0, label: 'Host' },
        { key: 1, label: 'Provider'}
      ]
    }
  };

 testingCalls(){
   // Testing Calls
   this.props.get_all_hApps();

 }
  public componentDidMount () {
    this.props.is_registered_as_provider();
    this.props.is_registered_as_host();
    this.props.get_agent_details();
    this.testingCalls();
  }

   public render () {
     console.log(this.props);
      const { classes, transferBtnBar, ...newProps } = this.props;
      const gutterBottom : boolean = true;

      return (
        <div>
          <Paper className={classes.root}>
            {this.state.clientType.map(data => {
              let icon = null;
              let api = null;
              if (data.label === 'Provider') {
                icon = <Dashboard />;
                api = this.props.is_registered_provider;
              }
              else {
                icon = <TagFacesIcon />;
                api = this.props.is_registered_host;
              }


              return (
                <Card
                  key={data.key}
                  className={classes.card}
                  style={{ flex:'auto' }}
                >
                <CardContent>
                  <h3 className={classes.h3}>{data.label}</h3>
                  <span style={{color:'#00838d'}}>{icon}</span>
                  <Typography className={classes.balanceHeader} variant="caption" gutterBottom={gutterBottom} component="h3" >
                    { api ?  api.addresses.length !== 0 ? `Registered` :
                      <CardActions>
                        <Link to="/settings" style={{ flex:'auto', textDecoration:'none' }}>
                          <Button
                            variant="outlined"
                            color="primary"
                          >
                            Click to Register
                          </Button>
                        </Link>
                      </CardActions>
                      :
                      `Loading...`
                    }
                  </Typography>
                </CardContent>
                </Card>
              );
            })}
          </Paper>

          <div>
            { table_data!.length <= 0 ?
              <Typography className={classnames(classes.pageHeader)} variant="display2" gutterBottom={gutterBottom} component="h3" >
                All Register hApps
              </Typography>
            :
              <div/>
            }

            <HAppTables {...newProps} />

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

export default withStyles(styles)(HomeSummaryPage);
