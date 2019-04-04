import React from 'react';
import classnames from 'classnames';
import compose from 'recompose/compose';
import { translate, changeLocale, Toolbar, TextInput } from 'react-admin';
import { Field, reduxForm } from 'redux-form';
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
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import withStyles from '@material-ui/core/styles/withStyles';
import SendIcon from '@material-ui/icons/Send';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutline';
// LOCAL Imports
import SaveButtonComponent from "../../app-components/SaveButton";

const styles = {
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
    marginLeft: '5em',
    marginRight: '5em'
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
    padding: '10em',
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
  }
};

const RegisterToolbar = props => (
  <Toolbar {...props}>
      <Tooltip title="Submit Values" aria-label="Submit Values">
      <SaveButtonComponent
          label={<SendIcon/>}
          redirect="show"
          submitOnEnter={false}
          onClick={this.clearValues}
      />
      </Tooltip>
      {/* <SaveButton
          label={translate("posts.action.save_and_edit")}
          redirect="show"
          submitOnEnter={true}
      />   */}
      <Tooltip title="Clear Values" aria-label="Clear Values">
      <Button
          label={<ClearIcon/>}
          onClick={this.clearValues}
      />
      </Tooltip>
  </Toolbar>
);

class RegisterProvider extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      kyc_details: "",
      hfaccount: '',
      spacing: '16',
    };
  };

  componentDidMount() {
    console.log("ARE ALL THE DISPATCHED ACTIONS HERE??!?!?!?!")
    // this.props.get_all_hApps();
  }

  handleChange = (title) => (event) => {
    this.setState({ [title]: event.target.value });
  };

  clearValues = () => {
    this.setState({
      kyc_details: "",
      hfaccount: '',
    })
  }

  handleDnaHashChange = (dnaNum) => (event) => {
    const newDnaHashList = this.state.dnaHashes;
    dnaNum++;
    const testValue = newDnaHashList[dnaNum] = event.target.value;

    this.setState({ dnaHashes: newDnaHashList });
  };

  handleSubmit = () => {
    this.props.register_as_provider({provider_doc:{kyc_proof:""}});
    setTimeout(this.props.is_registered_as_provider, 2000);

    this.clearValues();
  };

  render () {
    // console.log("this.state", this.state);
    // console.log("this.props", this.props);

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
                  <RegisterToolbar />
                </Grid>
              </div>

            </form>
          </Grid>
        </Paper>
      </Grid>
    )
  }
};

export default withStyles(styles)(RegisterProvider);

// <Tooltip title="Clear Values" aria-label="Clear Values">
//   <Fab color="primary" className={classes.formBtns} style={{color:'#e7ebee', background:'#00838d'}} onClick={this.clearValues} >
//     <ClearIcon />
//   </Fab>
// </Tooltip>
//
// <Tooltip title="Submit" aria-label="Submit">
//   <Fab color="primary" className={classes.formBtns} style={{color:'#e7ebee', background:'#00838d'}} type='submit' >
//     <SendIcon />
//   </Fab>
// </Tooltip>
