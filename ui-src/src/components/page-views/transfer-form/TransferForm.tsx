import * as React from 'react';
import * as _ from 'lodash';
// local sub-component imports :
import HiddenFields from '../../page-sub-components/hidden-fields/HiddenFields';
import Memo from '../../page-sub-components/memo/Memo';
import Select from '../../page-sub-components/select/Select';
// utils import :
// import { toAccounts, fromAccounts } from '../../../utils/seed-data/mock-data';
import { getToday } from '../../../utils/helper-fns';
// custom stylesheet :
import '../../styles/page-styles/scaffold-styles.css';


export interface OwnProps {
  // These are props the component has received from its parent component
  // e.g. what you write in <ExampleComponent ...>
  setForm: (formState: any) => void,
  setModal: (modalState: any) => void
}

export interface StateProps {
// Props that are set by mapStateToProps
}
export interface DispatchProps {
// Props that are set by mapDispatchToProps
}
export type Props = OwnProps & StateProps;

export interface State {
  // The components optional internal state
  fromAccount: any | null,
  toAccount: any | null,
  transferType: string,
  amount: number,
  memo: {
    text: string,
    len: number
  },
  fromAccounts: any | null,
  toAccounts: any | null,
  startDate: any,
  endDate: any | null,
  frequency: string | null,
  errors: {
    startDate: any | null,
    transferType: any | null,
    toAccount: any | null,
    fromAccount: any | null,
    amount: any | undefined
  }
}


class TransferForm extends React.Component<Props, State> {
  constructor (props: any) {
    super(props);
    this.state = {
      fromAccount: null,
      toAccount: null,
      transferType: '',
      amount: 0,
      memo: {
        text: '',
        len: 0
      },
      fromAccounts: [],
      toAccounts : [],
      startDate: null,
      endDate: null,
      frequency: null,
      errors: {
        startDate: null,
        transferType: null,
        toAccount: null,
        fromAccount: null,
        amount: 0
      }
    };
    this.validate = this.validate.bind(this);
    this.changeStartDate = this.changeStartDate.bind(this);
    this.changeFrom = this.changeFrom.bind(this);
    this.changeTo = this.changeTo.bind(this);
    this.changeTransfer = this.changeTransfer.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.changeMemo = this.changeMemo.bind(this);
    this.restart = this.restart.bind(this);
  }

  componentDidMount () {
    // Set Date
    const date: any = getToday();
    this.setState({
      startDate: date,
      toAccounts:[], // populate with live data (currently === mock-data)
      fromAccounts:[]
     });
  }

  restart = () => {
    this.setState({
      fromAccount: null,
      toAccount: null,
      transferType: '',
      amount: 0,
      memo: {
        text: '',
        len: 0
      },
      startDate: null,
      endDate: null,
      frequency: null,
      errors: {
        startDate: null,
        transferType: null,
        toAccount: null,
        fromAccount: null,
        amount: 0
      }
    });
  }

	// Handle Form Submitting
  handleSubmit = (event: any) => {
    event.preventDefault();
    if (!this.validate()) return;
    const formStateObject = [
			{ 'From Account': this.state.fromAccount },
			{ 'To Account': this.state.toAccount },
			{ 'Transfer Type': this.state.transferType },
			{ 'Date' : this.state.startDate },
			{ 'End Date' : this.state.endDate },
			{ 'Frequency': this.state.frequency },
			{ 'Amount': '$' + this.state.amount },
			{ 'Memo': this.state.memo.text }
    ];
    this.props.setForm(formStateObject)
    this.props.setModal(true);
  }

	// Helper Render Function
  showHiddenFields = (radio: any) => {
    if (radio === 'One Time Transfer') {
      return (
				<fieldset className={(this.state.errors.startDate) ? 'error' : ''}>
					<label className='main-label'>Transfer Date</label>
					<input type='date' value={this.state.startDate} onChange={e => this.changeStartDate(e)}/>
					<i className='fa fa-calendar fa-fw'/>
				</fieldset>
      );
    } else if (radio === 'Automatic Transfer') {
      return (
				<HiddenFields startDate={this.state.startDate} endDate={this.state.endDate} frequency={this.state.frequency}
					changeStartDate={this.changeStartDate.bind(this)}
					changeEndDate={this.changeEndDate.bind(this)}
					changeFrequency={this.changeFrequency.bind(this)} errors={this.state.errors}
        />
			);
    }
  }

// Principal helper functions :
  changeFrom = (option: any) => {
    const fromAccount = option.value;
    let toAccounts = [...this.state.fromAccounts];
    toAccounts = _.without(toAccounts,_.find(toAccounts,['id',fromAccount]));
    const toAccount = (fromAccount === this.state.toAccount) ? 0 : this.state.toAccount;
    this.setState({ fromAccount,toAccounts, toAccount });
  }

  validate = () => {
    let valid = true;
    if (!(this as any).state.fromAccount) this.setState({ errors: { ...this.state.errors, fromAccount: 'From Account Field is Required' } });
    if (!(this as any).state.toAccount) this.setState({ errors: { ...this.state.errors, toAccount: 'To Account Field is Required' } });
    if (!(this as any).state.startDate) this.setState({ errors: { ...this.state.errors, startDate: 'Start Date Field is Required' } });
    if (!(this as any).state.amount) this.setState({ errors: { ...this.state.errors, amount: 'Amount Field is Required' } });
    if (!(this as any).state.transferType) this.setState({ errors: { ...this.state.errors, transferType: 'Transfer Type Field is Required' } });

    else if (this.state.transferType === 'Automatic Transfer') {
      if (!this.state.endDate) this.setState({ errors: { ...this.state.errors, endDate: 'End Date Field is Required' } });
      if (!this.state.frequency) this.setState({ errors: { ...this.state.errors, frequency: 'Frequency Field is Required' } });
    }

    if (this.state.errors) valid = false;
    console.log(this.state.errors);
    return valid;
  }

  changeTo (event: any) {this.setState({ toAccount: event.target.value });}
  changeAmount (event: any) {this.setState({ amount: event.target.value });}
  changeMemo (event: any) {this.setState({ memo: { text: event.target.value,len: event.target.value.length } });}
  changeTransfer (event: any) {this.setState({ transferType: event.target.value, endDate: null, frequency: null });}
  changeFrequency (event: any) {this.setState({ frequency: event.target.value });}
  changeStartDate (event: any) {this.setState({ startDate: event.target.value });}
  changeEndDate (event: any) {this.setState({ endDate: event.target.value });}


  public render () {
    console.log(this.state);
    return (
      <div>
        <h3>Transfer Funds</h3>
        <form onSubmit={this.handleSubmit}>

          <Select onChange={() => this.changeFrom} account={this.state.fromAccount} title='From account'
            css_class={(this.state.errors.fromAccount) ? 'half-width error' : 'half-width'} serverResponse={this.state.fromAccounts}/>

          <Select onChange={() => this.changeTo} account={this.state.toAccount} title='To account'
            css_class={(this.state.errors.toAccount) ? 'half-width right error' : 'half-width right'} serverResponse={this.state.toAccounts}/>

          <fieldset className={(this.state.errors.transferType) ? 'half-width error' : 'half-width'}>
            <label className='main-label'>Transfer Type</label>
            <input type='radio' name='rad_transferType' id='radTransferType_ott' value='One Time Transfer'
              onClick={() => this.changeTransfer}/>
            <label htmlFor='radTransferType_ott'>One-Time Transfer</label><br/>
            <input type='radio' name='rad_transferType' id='radTransferType_at' value='Automatic Transfer'
              onClick={() => this.changeTransfer}/>
            <label htmlFor='radTransferType_at'>Automatic Transfer</label>
          </fieldset>

          <fieldset className={(this.state.errors.amount) ? 'half-width right error' : 'half-width right'}>
            <label  className='main-label'>Amount</label>
            <i className='fa fa-dollar fa-fw'/>
            <input type='number' value={this.state.amount} onChange={() => this.changeAmount}/>
          </fieldset>

          {this.showHiddenFields(this.state.transferType)}

          <Memo onChange={() => this.changeMemo} memo={this.state.memo} maxlen={120}/>

          <fieldset className='button-holder'>
            <input type='button' className='button simpleButton' value='Cancel' />
            <input type='submit' className='button CTAButton' value='Next' />
          </fieldset>

        </form>
      </div>
		);
  }
}

export default TransferForm;
