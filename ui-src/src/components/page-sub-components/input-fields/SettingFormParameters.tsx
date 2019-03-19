import * as React from 'react';
import { Redirect } from 'react-router-dom';
import classnames from 'classnames';
// mui custom styling imports :
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography'
// local imports :
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import { HashString } from '../../../utils/types';
import OutlinedButton from '../outlined-button/OutlinedButton';
import styles from '../../styles/page-styles/DefaultPageMuiStyles'


export interface OwnProps {
  // These are props the component has received from its parent component
  classes: any,
  showTransferBar: (txType:any) => void,

  allAgentEmailAddresses: [string] | null,
  currentAgent: { agent: { Hash: HashString, Name: string } },
  fetchAgent: () => void,

  genCategory: (category: any) => void,
  fetchCategories: () => void,

  genAgentEmailAddress: (emailAddress: any) => void
  fetchAgentEmailAddresses: () => void

  setDefaultEmail: (defaultEmail: {header: any, body:any}) => void,
  fetchDefaultEmail: () => Promise<any>,
}
export type Props = OwnProps & StateProps & DispatchProps;
export interface State {
  // The components optional internal state
  primaryEmailAddress: string,
  validate: { emailState: string },
  errorMessage: string,
  promptMessage: string,
  submitted: boolean,
}

class CreateNewSettings extends React.Component<Props, State>  {
  constructor(props: any) {
    super(props);
    this.state = {
      primaryEmailAddress: "",
      validate: { emailState: "" },
      errorMessage: "",
      promptMessage: "",
      submitted: false,
    }
    this.validateEmail = this.validateEmail.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.createAgentEmail = this.createAgentEmail.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public validateEmail(email:any) {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { validate } = this.state;
    if (emailRex.test(email)) {
      validate.emailState = 'has-success'
      this.setState({ primaryEmailAddress: email });
      return true;
    }
    else {
      validate.emailState = 'has-danger'
      return false
    }
  }

  public componentDidMount(){
    // this.props.fetchDefaultEmail().then(()=>{
    //   this.setState({...this.state, defaultEmailTemplateTitle: this.props.currentDefaultEmailTemplate!.title})
    // });
  }

  public handleChange = (eventCurrentTarget: any) => {
       // console.log("the event currentTarget: ", eventCurrentTarget);
       switch(eventCurrentTarget.id) {
         case "primaryEmailAddress":
            this.setState({ primaryEmailAddress: eventCurrentTarget!.value });
             break;

          // other cases go here...

          default:
             break;
        }
     }

     public createPrimaryEmail = async (event:any) => {
       event.preventDefault();
       const { primaryEmailAddress } = this.state;
       console.log("HERE IS >> this.state.primaryEmailAddress : ", primaryEmailAddress);

       const validateEmail = this.validateEmail(primaryEmailAddress);
       console.log("Is Agent Email Validated? >>>", validateEmail);

       if(primaryEmailAddress && validateEmail ) {
         console.log("Here are the primaryEmailAddress details: ", primaryEmailAddress);

         const genEmailBundle = { email: primaryEmailAddress }
         JSON.stringify(genEmailBundle);
         console.log("genEmailBundle foragenty Email API CALL", genEmailBundle);
         // await this.props.genprimaryEmailAddress(genEmailBundle);
       }
     }

    public redirect = () => {
      this.setState({submitted: true})
    }

    public handleSubmit = (event: any) => {
      event.preventDefault(event);
      // console.log("HANDLESUBMIT event >>> ", event);
      // console.log("HANDLESUBMIT this.state >>> ", this.state);
      // this.createAgentEmail(event);
    }

  public render() {
    const { classes } = this.props;
    const gutterBottom : boolean = true;
    // console.log("SETTINGS this.props : ", this.props);
    const { primaryEmailAddress} = this.state;

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
              Personal Info
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
                type="email"
                label="Primary Email"
                variant="outlined"
                name="primaryEmailAddress"
                value={primaryEmailAddress}
                onChange={e => this.handleChange(e!.currentTarget)}
                id="primary-email-input"
              />
            </FormControl>

            <br/>
            <br/>
            <br/>

            <OutlinedButton
              text="Save"
              color="primary"
              link="/holofuelsummary"
              showTransferBar={this.props.showTransferBar}
              fnName=""
              style={{display: "block", margin:"auto", width:"5%", padding:"30px"
            }}
            />

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
