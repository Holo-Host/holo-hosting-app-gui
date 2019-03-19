import * as React from 'react';
import classnames from 'classnames';
// import * as ReactDOM from 'react-dom';
// custom mui styles :
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
// local imports
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import FabSearchBtn from './FabSearchBtn';
import styles from '../../styles/page-styles/DefaultPageMuiStyles';

export interface OwnProps {
  classes: any,
  dropDownHeader: string,
  dropdownListData: Array<any>,
  defaultItem: string,
  handleNewType: () => void
}
export type Props = OwnProps & StateProps & DispatchProps;
export interface State {
  dataItem: string
}

class DropDownInputFilter extends React.Component<Props, State> {
  constructor(props:Props){
    super(props);
    this.state = {
      dataItem: '',
    };
  };

  componentDidMount () {
    this.setState({
      dataItem: this.props.defaultItem
    })
  }

  handleChange = (name: any) => (event: any) => {
    console.log("NAME IN DROPDOWN BTN: ", event.target.value);
    let dataItem : string = event.target.value;
    this.setState({ dataItem });
    // this.setState({ [name]: Number(event.target.value) });
  };

  public render() {
    console.log("STATE IN DROPDOWN BTN: ", this.state);
    const { classes, dropdownListData, dropDownHeader, handleNewType } = this.props;
    const gutterBottom : boolean = true;
    const select : boolean = true;

    return (
      <FormControl variant="outlined" className={classes.filterFormControl}>
        <Typography className={classes.filterTextTitle} variant="subheading" gutterBottom={gutterBottom} component="h4" >
          Filter { dropDownHeader }
        </Typography>
        <TextField
          id="tx-state"
          name="tx-state"
          select={select}
          aria-label="tx-state"
          value={this.state.dataItem}
          onChange={this.handleChange("dataItem")}
          SelectProps={{
              MenuProps: {
                className: classes.selectFitlerInput,
              },
            }}
            margin="normal"
            variant="outlined"
            className={classnames(classes.selectFitlerInput)}
            style={{ color:'#799ab6', width:'248px', height:'48px', background:'#c3cdd6', borderRadius:'4px', margin:'0px' }}
         >
            {dropdownListData.map(dataItem => (
              <MenuItem className={classes.dropdownMenuItem} key={dataItem.name + [dataItem]} value={dataItem.name}>
                {dataItem.name}
              </MenuItem>
            ))}
         </TextField>
        <FabSearchBtn handleClick={handleNewType} />
      </FormControl>
  )};
}

export default withStyles(styles)(DropDownInputFilter);
