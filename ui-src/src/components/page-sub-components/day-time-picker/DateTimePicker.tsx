import * as React from 'react';
import classnames from 'classnames';
import * as moment from 'moment';
// react-dates module imports:
import { DateRangePicker } from 'react-dates';
// import { DayPickerRangeController, FocusedInputShape } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
// custom mui styles :
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
// local imports
import { StateProps, DispatchProps } from '../../../containers/HoloFuelAppRouterContainer';
import { ReactInputParam } from '../../../utils/types';
import FabSearchBtn from '../input-fields/FabSearchBtn';
import DropDownInputFilter from '../input-fields/DropDownInputFilter';
import styles from '../../styles/page-styles/DefaultPageMuiStyles';
// import IconHandler from '../icon-handler/IconHandler';
// import { get_current_datetime } from '../../utils/global-helper-functions';


// const CURRENT_DATE = get_current_datetime().toString();
// const today = new Date();
// const yesterday = today.getDate() - 1;
// const lastRecord= new Date(today.getFullYear() - 7, today.getMonth(), today.getDate());

type Moment = moment.Moment;

export interface OwnProps {
  // These are props the component has received from its parent component
  classes: any,
  setDateFilter: (startDate: ReactInputParam, endDate:ReactInputParam) => void,
  setTxTypeFilter: (txBatchType: ReactInputParam) => void,
}
export type Props = OwnProps & StateProps & DispatchProps;
export interface State {
  txState: string,
  startDateString: string | null,
  endDateString: string | null,
  momentStartDate : Moment | null ,
  momentEndDate: Moment | null ,
  focusedInput: "startDate" | "endDate" | null
}

class DateTimePicker extends React.Component<Props, State> {
  constructor(props:Props){
    super(props);
    this.state = {
      txState: "All Transactions",
      startDateString: null,
      endDateString: null,
      momentStartDate : null,
      momentEndDate: null,
      focusedInput: null
    }
    this.handleDateChange = this.handleDateChange.bind(this);
  };

  handleDateChange = (momentStartDate: Moment | null, momentEndDate: Moment | null ) => {
    console.log(" >>>>>>>>> momentStartDate within the handleDateChange fn <<<<<<< ", momentStartDate);
    console.log(" >>>>>>>>> momentEndDate within the handleDateChange fn <<<<<<< ", momentEndDate);

    console.log("CURRENT STATE UPON CALL IN handleDateChange", this.state);
    // Change the startDate date and focus the "endDate" input field
    const startDateString = momentStartDate !== null ? momentStartDate.format('YYYY-MM-DD') : null;
    const endDateString = momentEndDate !== null ? momentEndDate.format('YYYY-MM-DD') : null;

     this.setState({
       startDateString,
       endDateString,
       momentStartDate,
       momentEndDate
     });
  }

  handleNewType = () => {
    console.log("Day Time Picker STATE: ", this.state);
    this.props.setTxTypeFilter(this.state.txState);
  };

  submitNewDuration = () => {
    console.log("Day Time Picker STATE: ", this.state);

    this.props.setDateFilter(this.state.endDateString, this.state.startDateString);
  };

  public render() {
    const { classes, ...newProps } = this.props;
    const { momentStartDate, momentEndDate,focusedInput } = this.state;
    const gutterBottom : boolean = true;

    const txStatesdropDownHeader : string = "Transactions by Type";
    const txStatesDropDownList : Array<any> = [
      {name: 'All Transactions'},
      {name: 'Incoming'},
      {name: 'Outgoing'},
      {name: 'Pending'},
      {name: 'Approved'},
      {name: 'Completed'},
    ];

    return (
      <div className={classnames(classes.datetimeinputdiv,"InputFromTo")}>
        <div className={classnames(classes.flexContainer)} style={{marginTop:'-30px'}}>
          <div  className={classnames(classes.flexItem)}>
            <DropDownInputFilter dropdownListData={txStatesDropDownList} dropDownHeader={txStatesdropDownHeader}
            { ...newProps } handleNewType={this.handleNewType} defaultItem={this.state.txState} />
          </div>

          <div className={classes.flexItem} style={{ borderColor:'#799ab6' }}>
            <Typography className={classes.filterTextTitle} variant="subheading" gutterBottom={gutterBottom} component="h4" >
              Filter Transactions by Day
            </Typography>
            <FormControl className={classes.formControl}>
              <DateRangePicker
                startDate={momentStartDate}
                startDateId="unique_start-date_id"
                endDate={momentEndDate}
                endDateId="unique_end-date_id"
                onDatesChange={({ startDate, endDate }) => this.handleDateChange(startDate, endDate)}
                small={true}
                block={false}
                numberOfMonths={1}
                focusedInput={focusedInput}
                onFocusChange={(focusedInput) =>
                  this.setState({ focusedInput })
                }
                openDirection="up"
                hideKeyboardShortcutsPanel={true}
                inputIconPosition="after"
                customInputIcon={
                  <img width="20px" height="20px" src="/assets/icons/calendar.png" alt="calendar_icon" />
                }
              />
            </FormControl>
            <FabSearchBtn handleClick={this.submitNewDuration} />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(DateTimePicker);
