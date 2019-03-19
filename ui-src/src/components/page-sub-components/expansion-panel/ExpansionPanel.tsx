import * as React from 'react';
import classnames from 'classnames';
// mui custom styling :
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// local imports
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
// import SimpleTable from '../simple-table/SimpleTable';
import styles from '../../styles/page-styles/DefaultPageMuiStyles';

export interface OwnProps {
  classes: any,
  rowValue: any,
  rowExpandedDetails: any,
}
export type Props = OwnProps & StateProps & DispatchProps;
export interface State {
// The components optional internal state
  dataItem: string
}

function SimpleExpansionPanel(props: Props) {
  const { classes, rowValue } = props; // { ...newProps }
  const gutterBottom : boolean = true;

  return (
    <div className={classes.expantionPanelWrapper}>
      <ExpansionPanel>
       <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
         <Typography className={classes.expansionPanelHeading}>{rowValue}</Typography>
       </ExpansionPanelSummary>
       <ExpansionPanelDetails>
           <Typography
             className={classnames(classes.tableHeader, classes.profileHeader)}
             variant="display2"
             gutterBottom={gutterBottom}
             component="h3" >
              Transaction Details
           </Typography>

           {/* Was prev MuiSimpleTable */}
           {/* <SimpleTable {...newProps} /> */}

       </ExpansionPanelDetails>
     </ExpansionPanel>
   </div>
 );
}

export default withStyles(styles)(SimpleExpansionPanel);
