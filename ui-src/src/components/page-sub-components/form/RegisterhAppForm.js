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
// LOCAL Imports
import TextInput from '../input-fields/TextInput';
import asyncValidate from '../../../utils/asyncValidate';
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
  }
});

class RegisterhAppForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      uiHash: '',
      dnaHashes: [],
      description: '',
      categories: [],
      tags: [],
      listOfTags: [ // change out with API once plugged in...
        "minesweeper",
        "microsoft_games",
        "90s_games",
        "live_streaming",
        "chat",
        "kanban_board"
      ],
      listOfCategories: [ // change out with API once plugged in...
        "games",
        "movies",
        "developer_tools",
        "admin_tools",
      ],
      dnaAmount: [''],
      spacing: '16',
    };
  };

  componentDidMount() {
    console.log("ARE ALL THE DISPATCHED ACTIONS HERE??!?!?!?!")
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
      uiHash: '',
      dnaHashes: [""],
      description: '',
      categories: [],
      tags: [],
      dnaAmount: ['']
    })
  }

  handleDnaHashChange = (dnaNum) => (event) => {
    const newDnaHashList = this.state.dnaHashes;
    dnaNum + 1;
    const testValue = newDnaHashList[dnaNum] = event.target.value;

    this.setState({ dnaHashes: newDnaHashList });
  };

  handleSubmit = () => {
    const hAppAPIBundle = {ui_hash: this.state.uiHash, dna_list: this.state.dnaHashes}
    this.props.register_hApp_bundle(hAppAPIBundle)
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
                      <TextInput key={i} value={this.state.dnaHashes[i]} onChange={this.handleDnaHashChange(i)}/>
                    ))}
                 </FormControl>
                </Grid>

{/*                <Grid item>
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
                   <h4 className={classes.h4}>hAPP Category</h4>
                   <FormControl className={classes.margin}>
                    <RadioGroup
                      name="categories"
                      aria-label="Categories"
                      value={this.state.categories}
                      onChange={this.handleChange('categories')}
                    >
                    {this.state.listOfCategories.map(category => (
                      <FormControlLabel value={category} control={<Radio color="default" style={{textTransform:"capitalize"}} />} label={category.split("_").join(" ")} key={category} />
                     ))}
                    </RadioGroup>
                  </FormControl>
                </Grid>

                <Grid item>
                  <h4 className={classes.h4}>hApp Identifiers</h4>
                  <FormControl className={classes.margin}>
                    <InputLabel htmlFor="tags">Tags</InputLabel>
                    <Select
                      multiple
                      onChange={this.handleChange('tags')}
                      input={<Input id="select-multiple" />}
                      value={this.state.tags}
                    >
                    {this.state.listOfTags.map(tag => (
                       <MenuItem value={tag} key={tag} style={{textTransform:"capitalize"}}>{tag.split("_").join(" ")}</MenuItem>
                     ))}
                    </Select>
                  </FormControl>
                </Grid>
*/}
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
