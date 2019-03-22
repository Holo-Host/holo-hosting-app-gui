import * as React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { Redirect } from 'react-router-dom';
// mui custom styling imports :
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
// local imports :
import { StateProps, DispatchProps } from '../../../containers/HomeRouterContainer';
import { HashString } from '../../../utils/types';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import Tooltip from '@material-ui/core/Tooltip';
import styles from '../../styles/page-styles/DefaultPageMuiStyles'


export interface OwnProps {
  // These are props the component has received from its parent component
  classes: any,
  showTransferBar: (txType:any) => void,

  allAgentHashAddresses: [string] | null,
  currentAgent: { agent: { Hash: HashString, Name: string } },
  fetchAgent: () => void,

  genCategory: (category: any) => void,
  fetchCategories: () => void,

  genAgentHashAddress: (hashAddress: any) => void
  fetchAgentHashAddresses: () => void

  setDefaultHash: (defaultHash: {header: any, body:any}) => void,
  fetchDefaultHash: () => Promise<any>,
}
export type Props = OwnProps & StateProps & DispatchProps;
export interface State {
  // The components optional internal state
  hAppBundleHashAddress: string,
  validate: { hashState: string },
  errorMessage: string,
  promptMessage: string,
  submitted: boolean,
}

class CreateNewSettings extends React.Component<Props, State>  {
  constructor(props: any) {
    super(props);
    this.state = {
      hAppBundleHashAddress: "",
      validate: { hashState: "" },
      errorMessage: "",
      promptMessage: "",
      submitted: false,
    }
    this.validateHash = this.validateHash.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.createhAppBundleHash = this.createhAppBundleHash.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public validateHash(hash:any) {
    // const hashValidationRex = <HASH VALIDATION GOES HERE...>
    // const { validate } = this.state;
    // if (hashValidationRex.test(hash)) {
    //   validate.hash = 'has-success';
    //   this.setState({ hash });
    //   return true;
    // }
    // else {
    //   validate.hashState = 'has-danger'
    //   return false
    // }
  }

  public componentDidMount(){
    // this.props.fetchCurrenthAppBundleHash().then(()=>{
    //   this.setState({...this.state, defaultHashTemplateTitle: this.props.currentDefaultHashTemplate!.title})
    // });
  }

  public handleChange = (eventCurrentTarget: any) => {
       // console.log("the event currentTarget: ", eventCurrentTarget);
       switch(eventCurrentTarget.id) {
         case "hAppBundleHashAddress":
            this.setState({ hAppBundleHashAddress: eventCurrentTarget!.value });
             break;

          // other cases go here...

          default:
             break;
        }
     }

     public createPrimaryHash = async (event:any) => {
       event.preventDefault();
       const { hAppBundleHashAddress } = this.state;
       console.log("HERE IS >> this.state.hAppBundleHashAddress : ", hAppBundleHashAddress);

       const validateHash = this.validateHash(hAppBundleHashAddress);
       console.log("Is Agent Hash Validated? >>>", validateHash);

       if(hAppBundleHashAddress && validateHash ) {
         console.log("Here are the hAppBundleHashAddress details: ", hAppBundleHashAddress);

         const genHashBundle = { hash: hAppBundleHashAddress }
         JSON.stringify(genHashBundle);
         console.log("genHashBundle foragenty Hash API CALL", genHashBundle);
         // await this.props.genhAppBundleHashAddress(genHashBundle);
       }
     }

    public redirect = () => {
      this.setState({submitted: true})
    }

    public handleSubmit = (event: any) => {
      event.preventDefault(event);
      // console.log("HANDLESUBMIT event >>> ", event);
      // console.log("HANDLESUBMIT this.state >>> ", this.state);
      // this.createhAppBundleHash(event);
    }

  public render() {
    const { classes } = this.props;
    const gutterBottom : boolean = true;
    // console.log("SETTINGS this.props : ", this.props);
    const { hAppBundleHashAddress} = this.state;

      return (
        <div className="CreateNewSettings">
          <div className="form" onSubmit={this.handleSubmit}>

          {this.state.errorMessage !== "" && this.state.promptMessage !== "" ?
            <div>
              <hr style={{width:"30%"}}/>
              <h2 className="title">{this.state.errorMessage}</h2>
              <h2 className="title">{this.state.promptMessage}</h2>
              <hr style={{width:"30%"}}/>
            </div>
          :
            <div/>
          }

            <Typography className={classnames(classes.h3extraTopMargin, classes.h3)} variant="caption" gutterBottom={gutterBottom} component="h4" >
              hApp Budle Hash
            </Typography>

            <FormControl className={classes.margin}>
              <TextField
                className={classes.margin}
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  },
                }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
                type="text"
                label="hApp Bundle Hash"
                variant="outlined"
                name="hAppBundleHashAddress"
                value={hAppBundleHashAddress}
                onChange={e => this.handleChange(e!.currentTarget)}
                id="primary-hash-input"
              />
            </FormControl>

            <br/>
            <br/>
            <br/>

            <Link to='/home' className={classes.subheaderLink}>
              <Tooltip title="Save" aria-label="Save">
                <Fab
                  color="default"
                  style={{color:'#e7ebee', background:'#00838d'}}
                  className={classes.formBtns}
                  >
                    <SaveIcon />
                  </Fab>
                </Tooltip>
              </Link>



            {this.state.submitted ?
                <Redirect
                  to={{
                    pathname: "/",
                  }}
                />
              : <div/>
              }

          </div>
        </div>
    );
  }
}

export default withStyles(styles)(CreateNewSettings);
