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

class RegisterhAppForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      app_name:'',
      uiHash: '',
      dnaHashes: [],
      description: '',
      categories: [],
      tags: [],
      dnaAmount: [''],
      spacing: '16',
      domainUrl: ''
    };
  };

  componentDidMount() {
    console.log("Check / verify accessible dispatched actions....")
    // this.props.get_all_hApps();
  }


  addDnaLine = () => {
    // hack to add add'l lines... refactor
    const newAmount = this.state.dnaAmount;
    newAmount.push('i');

    this.setState({
      dnaAmount: newAmount
    })
  }

  removeDnaLine = () => {
    // hack to add add'l lines... refactor
    const newAmount = this.state.dnaAmount;
    newAmount.pop('i');

    this.setState({
      dnaAmount: newAmount
    })
  }

  handleChange = (title) => (event) => {
    this.setState({ [title]: event.target.value });
  };

  clearValues = () => {
    this.setState({
      app_name: '',
      uiHash: '',
      dnaHashes: [""],
      description: '',
      categories: [],
      tags: [],
      dnaAmount: [''],
      domainUrl:''
    })
  }

  handleDnaHashChange = (dnaNum) => (event) => {
    const newDnaHashList = this.state.dnaHashes;
    dnaNum + 1;
    const testValue = newDnaHashList[dnaNum] = event.target.value;

    this.setState({ dnaHashes: newDnaHashList });
  };

  handlesubmithAppBundle = async () => {
    let hApp_call_res;
    const app_bundle= {
      ui_hash: this.state.uiHash,
      dna_list: this.state.dnaHashes
    }

    try {
      new Promise((resolve, reject) => {
        resolve(
          this.props.register_hApp_bundle({app_bundle})
        )
        hApp_call_res = "call complete";
      })
    }
    catch(err) {
      console.log("Error occured when regeistering app", err);
      hApp_call_res = "call errored"
    }

    console.log("hApp_call_res", hApp_call_res);
    return hApp_call_res;
  };

  handleSubmit = () => {
    const app_bundle= {
      ui_hash: this.state.uiHash,
      dna_list: this.state.dnaHashes
    }

    const app_details = {
      name: this.state.app_name,
      details:this.state.description
    };

    const domain_name = {
      dns_name: this.state.domainUrl
    }

    this.props.register_hApp_bundle({ app_bundle, app_details, domain_name })
    // console.log("app_register_call", app_register_call)

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


              <Grid item>
                <h4 className={classes.h4}>hApp Name</h4>
                <FormControl className={classes.margin}>
                  <TextField
                    id="app_name"
                    label="App Name"
                    value={this.state.app_name}
                    onChange={this.handleChange('app_name')}
                    className={classes.textField}
                    margin="normal"
                  />
                 </FormControl>
              </Grid>

              <Grid item>
                <h4 className={classes.textHeader} >UI Details</h4>
                <FormControl className={classes.margin}>
                    <InputLabel htmlFor='ui-hash' className={classes.textFormLabel}>Type in the UI Hash</InputLabel>
                    <TextInput value={this.state.uiHash} onChange={this.handleChange('uiHash')}/>
                </FormControl>
               </Grid>

               <Grid item>
                 <h4 className={classes.textHeader} style={{display:'inline-flex', marginRight:'5px'}}>DNA Details</h4>
                  <span onClick={this.addDnaLine} style={{display:'inline-flex'}}>
                    <AddIcon style={{color:'#0e094b'}}/>
                  </span>
                  <span onClick={this.removeDnaLine} style={{display:'inline-flex'}}>
                    <RemoveIcon style={{color:'#0e094b'}}/>
                  </span>
                  <br/>
                 <FormControl className={classes.margin}>
                    <InputLabel htmlFor="dna-hash" className={classes.textFormLabel}>Type in each DNA Hash</InputLabel>
                    {this.state.dnaAmount.map((value, i) => (
                      <TextInput key={i} value={this.state.dnaHashes[i] } onChange={this.handleDnaHashChange(i)}/>
                    ))}
                 </FormControl>
                </Grid>

                <Grid item>
                  <h4 className={classes.h4}>hApp Summary</h4>
                  <FormControl className={classes.margin}>
                    <TextField
                      id="description"
                      label="Description"
                      multiline
                      rowsMax="4"
                      value={this.state.description}
                      onChange={this.handleChange('description')}
                      className={classes.textField}
                      margin="normal"
                    />
                   </FormControl>
                </Grid>

                <Grid item>
                  <h4 className={classes.h4}>Domain URL</h4>
                  <FormControl className={classes.margin}>
                    <TextField
                      id="domainUrl"
                      label="Domain Url"
                      value={this.state.domainUrl}
                      onChange={this.handleChange('domainUrl')}
                      className={classes.textField}
                      margin="normal"
                    />
                   </FormControl>
                </Grid>

                <div style={{marginTop:'150px', border:'5px solid white'}}>
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
export default withStyles(styles)(RegisterhAppForm);

//
