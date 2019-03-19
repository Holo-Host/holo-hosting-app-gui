import * as React from 'react';
// custom mui styles :
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// local imports
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import styles from '../../styles/page-styles/DefaultPageMuiStyles';

export interface OwnProps {
  // These are props the component has received from its parent component
  classes: any,
}
export type Props = OwnProps & StateProps & DispatchProps;
export interface State {
// The components optional internal state
  open: boolean,
  txState: string
}

class DialogFilterInput extends React.Component<Props, State> {
  state = {
    open: false,
    txState: '',
  };

  handleChange = (name: any) => (event: any) => {
    // this.setState({ [name]: Number(event.target.value) });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  public render() {
    const { classes } = this.props;

    return (
      <div>
        <Button onClick={this.handleClickOpen}>Filters</Button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle className={classes.filterTextTitle}>Filter Transactions by Type</DialogTitle>
          <DialogContent>
            <form className={classes.dialogContainer}>
              <FormControl className={classes.dialogFilterFormControl}>
                <InputLabel htmlFor="txState-simple">Transaction</InputLabel>
                <Select
                  value={this.state.txState}
                  onChange={this.handleChange('txState')}
                  input={<Input id="txState-simple" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="requests">Requests</MenuItem>
                  <MenuItem value="proposals">Proposals</MenuItem>
                  <MenuItem value="rejected">Rejected</MenuItem>
                  <MenuItem value="declined">Declined</MenuItem>
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(DialogFilterInput);
