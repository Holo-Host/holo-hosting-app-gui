import React from 'react';
import classnames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import compose from 'recompose/compose';
// MUI Component and Style Imports :
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import InputBase from '@material-ui/core/InputBase';
import Tooltip from '@material-ui/core/Tooltip';
import withStyles from '@material-ui/core/styles/withStyles';
import SendIcon from '@material-ui/icons/Send';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutline';
import Slider from '@material-ui/lab/Slider';
import LensIcon from '@material-ui/icons/LensOutlined';
import Chip from '@material-ui/core/Chip';
// LOCAL Imports
import TextInput from '../input-fields/TextInput';
import validate from '../../../utils/validate';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    overflow: 'hidden'
  },
  margin: {
    minWidth: '42vw',
    margin: '0 auto',
    margin: 'theme.spacing.unit'
  },
  textFormLabel: {
    fontSize: 18,
  },
  textField:{
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  gridList: {
    width: 500,
    height: 450
  },
  paper: {
    minWidth: '40vw',
    width: '80%',
    margin: '0 auto'
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  form: {
    width: '100%',
    margin: '0 auto'
  },
  textHeader: {
    color:'#0e094b',
    marginBottom: 3
  },
  h4: {
    color:'#0e094b',
    marginBottom: 5
  },
  formBtns : {
    margin: 5,
    display: 'inline-flex'
  },
  slider: {
    padding: '22px 0px',
  },
  thumbIcon: {
    borderRadius: '50%',
  },
  thumbIconWrapper: {
    backgroundColor: '#fff',
  },
  chip: {
     margin: theme.spacing.unit,
     width: '20%',
     margin: '0 auto',
     color: '#4859b8'
  }
});

class RegisterHost extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      kyc_details: "",
      hfaccount: '',
      max_fuel_per_invoice: 0,
      max_unpaid_value: 0,
      spacing: '16'
    };
  };

  componentDidMount() {
    console.log("ARE ALL THE DISPATCHED ACTIONS HERE??!?!?!?!")
    // this.props.get_all_hApps();
  }

  handleChange = (title) => (event) => {
    this.setState({ [title]: event.target.value });
  };

  handleSliderChange = (event, value) => {
      this.setState({
        [event.currentTarget.id]: value
      });
    };

  handleDnaHashChange = (dnaNum) => (event) => {
    const newDnaHashList = this.state.dnaHashes;
    dnaNum + 1;
    const testValue = newDnaHashList[dnaNum] = event.target.value;

    this.setState({ dnaHashes: newDnaHashList });
  };

  clearValues = () => {
    this.setState({
      kyc_details: "",
      hfaccount: '',
      max_fuel_per_invoice: 0,
      max_unpaid_value: 0
    })
  }

  handleSubmit = () => {
    this.props.register_as_host({host_doc:{kyc_proof:""}});
    setTimeout(this.props.is_registered_host, 2000);

    this.clearValues();
  };

  render () {
    console.log("this.state", this.state);
    console.log("this.props", this.props);

    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      <Grid item xs={12}>
        <Paper className={classnames(classes.paper, classes.control)}>
          <Grid container>
            <form onSubmit={this.handleSubmit} className={classes.form}>

            <div style={{marginTop:'10px', border:'5px solid white'}}>
              <Grid item>
                <h4 className={classes.h4}>KYC Details</h4>
                <FormControl className={classes.margin}>
                  <TextField
                    id="kyc_details"
                    label="KYC ... "
                    multiline
                    rowsMax="4"
                    value={this.state.kyc_details}
                    onChange={this.handleChange('kyc_details')}
                    className={classes.textField}
                    margin="normal"
                  />
                 </FormControl>
              </Grid>

              <Grid item>
                <h4 className={classes.textHeader} >HoloFuel Account</h4>
                <FormControl className={classes.margin}>
                    <InputLabel htmlFor='hf-account' className={classes.textFormLabel}>Type in your HoloFuel Account Number</InputLabel>
                    <TextInput value={this.state.uiHash} onChange={this.handleChange('hfaccount')}/>
                </FormControl>
               </Grid>

               <Grid item>
                 <h4 className={classes.h4}>Price Ceiling (per Invoice)</h4>
                 <br/>
                 <FormControl className={classes.margin}>
                 <Chip
                   label={`${this.state.max_fuel_per_invoice} HF`}
                   className={classes.chip}
                   color="primary"
                   variant="outlined"
                  />
                 <Slider
                   id="max_fuel_per_invoice"
                   value={this.state.max_fuel_per_invoice}
                   aria-labelledby="max_fuel_per_invoice"
                   onChange={this.handleSliderChange}
                   classes={{
                     container: classes.slider,
                     thumbIconWrapper: classes.thumbIconWrapper,
                   }}
                   min={0}
                   max={50}
                   step={1}
                   thumb={<LensIcon style={{ color: '#4859b8' }} />}
                 />
                  </FormControl>
               </Grid>

               <Grid item>
                 <h4 className={classes.h4}>Maximum Allowed Bad Debt (per Provider)</h4>
                 <br/>
                 <FormControl className={classes.margin}>
                 <Chip
                   label={`${this.state.max_unpaid_value} HF`}
                   className={classes.chip}
                   color="primary"
                   variant="outlined"
                  />
                 <Slider
                   id="max_unpaid_value"
                   value={this.state.max_unpaid_value}
                   aria-labelledby="max_unpaid_value"
                   onChange={this.handleSliderChange}
                   classes={{
                     container: classes.slider,
                     thumbIconWrapper: classes.thumbIconWrapper,
                   }}
                   min={0}
                   max={100}
                   step={1}
                   thumb={<LensIcon style={{ color: '#4859b8' }} />}
                 />
                  </FormControl>
               </Grid>

               <Grid item>
                  <Tooltip title="Clear Values" aria-label="Clear Values">
                    <Fab color="primary" className={classes.formBtns} style={{color:'#e7ebee', background:'#00838d'}} onClick={this.clearValues} >
                      <ClearIcon />
                    </Fab>
                  </Tooltip>

                  <Tooltip title="Submit" aria-label="Submit">
                    <Fab color="primary" className={classes.formBtns} style={{color:'#e7ebee', background:'#00838d'}} type='submit' >
                      <SendIcon />
                    </Fab>
                  </Tooltip>
               </Grid>
              </div>

            </form>
          </Grid>
        </Paper>
      </Grid>
    )
  }
};
export default withStyles(styles)(RegisterHost);

//
