import * as React from 'react';
import classnames from 'classnames';
// custom mui styles :
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Portal from '@material-ui/core/Portal';
import Slide from '@material-ui/core/Slide';
// local imports
import { StateProps, DispatchProps } from '../../containers/HomeRouterContainer';
import HAppTables from '../page-sub-components/hoc-table/SummaryhAppsTables';
import BottomMenuBar from '../page-sub-components/bottom-menu-bar/BottomMenuBar';
import styles from '../styles/page-styles/DefaultPageMuiStyles';
import '../styles/page-styles/scaffold-styles.css';

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
      prevProps: {}
    };
  };

 testingCalls(){
   // Testing Calls
   this.props.register_hApp_bundle({ui_hash:"Quiououo", dna_list:["Qoauxjnva","Qkiauihsnvkk"]});
   this.props.register_hApp_bundle({ui_hash:"Quiasdfouo", dna_list:["Qoauasdfxva","Qkiauiasdfnvkk"]});
   this.props.get_all_hApps();

 }
  public componentDidMount () {
    this.props.is_registered_as_provider();
    this.props.is_registered_as_host();
    this.props.get_agent_details();

    this.testingCalls();

  }

  register_provider = () =>{
    this.props.register_as_provider({provider_doc:{kyc_proof:""}});
    this.props.is_registered_as_provider();
  }
  register_host = () =>{
    this.props.register_as_host({host_doc:{kyc_proof:""}});
    this.props.is_registered_as_host();
  }

   public render () {
      const { classes, transferBtnBar, ...newProps } = this.props;
      const gutterBottom : boolean = true;

      return (
        <div>
          <div className={classes.jumbotron}>
            <div className={classnames(classes.flexContainer, classes.reducedJumbotron)}>
              <div className={classes.flexItem}>
                <h3 className={classes.h3}>Provider</h3>
                <Typography className={classes.balanceHeader} variant="caption" gutterBottom={gutterBottom} component="h3" >
                  {this.props.is_registered_provider ?  this.props.is_registered_provider.addresses.length !== 0 ? `Registered` :
                    <Button
                      variant="outlined"
                      color="primary"
                      className={ classes.colButton }
                      onClick={ this.register_provider }
                      style={{margin:"3px"}}
                    >
                      Click to Register
                    </Button> : `Loading...`}
                </Typography>
              </div>
              <div className={classes.verticalLine}/>
              <div className={classes.flexItem}>
                <h3 className={classes.h3}>Host</h3>
                <Typography className={classes.balanceHeader} variant="caption" gutterBottom={gutterBottom} component="h3" >
                {this.props.is_registered_host ?  this.props.is_registered_host.addresses.length !== 0 ? `Registered` :
                  <Button
                    variant="outlined"
                    color="primary"
                    className={ classes.colButton }
                    onClick={ this.register_host }
                    style={{margin:"3px"}}
                  >
                  Click to Register
                  </Button> : `Loading...`}
                </Typography>
              </div>
            </div>
            <h3 className={classes.h3} style={{margin:'25px'}}>You Public Address : {this.props.agent_details ? `${this.props.agent_details.hash}`: `Loading...`} </h3>
          </div>

          <div>
            {this.props.all_hApps ?
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
