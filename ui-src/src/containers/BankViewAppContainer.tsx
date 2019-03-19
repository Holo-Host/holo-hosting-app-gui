import * as React from 'react';
import { Dispatch } from 'redux';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { State } from '../reducers/transactionReducer';
import { GetInfoInstancesAsyncAction, TransactionListAsyncAction } from '../actions/transactionActions';
import TransactionSummary from '.././components/page-views/transaction-summary/TransactionSummary';
import TransferForm, { StateProps, DispatchProps } from '.././components/page-views/transfer-form/TransferForm';
import Contact from '../components/page-views/contact/Contact';
import Confirm from '../components/page-sub-components/confirm/Confirm';
import Verify from '../components/page-sub-components/verify/Verify';
import Header from '../components/page-sub-components/header/Header';
import Footer from '../components/page-sub-components/footer/Footer';

export interface State {
  route: string,
  modal: boolean,
  form: Array<{}>
}

class MainAppContainer extends React.Component<{}, State> {
  constructor (props: any) {
    super(props);
    this.state = {
      route: 'transactionSummary',
      modal: false,
      form: [{}]
    }
    this.showModal = this.showModal.bind(this);
    this.confirmSubmit = this.confirmSubmit.bind(this);
  }

  router = (route: any) => {
      if (route === 'form') {
        return <TransferForm setModal={this.showModal} setForm={this.setFormState} />
      }
      else if (route === 'confirm') {
        return <Confirm form={this.state.form} setTransferRoute={this.setPage}/>;
      }
      else if (route === 'transactionSummary') {
        return <TransactionSummary />;
      }
      else if (route === 'contact') {
        return <Contact />;
      }
  }

  setFormState = (form: Array<{}>) => {
    this.setState({ form });
  }

  setPage = (route: string) => {
    this.setState({ route: route });
  }

  confirmSubmit = () => {
    this.setState({
      modal: false,
      route: 'confirm'
    });
  }

  showModal = (modal: any) => {
    this.setState({ modal });
  }

  renderModal = () => {
    if (!this.state.modal) { return; }
    console.log('Modal State ON: Showing Modal');
    return (
      <div className='modalWindow'>
        <div className='modal-content'>
          <a href='#' className='close-button' onClick={() => {this.showModal(false);}} />
          <Verify form={this.state.form} showModal={() => this.showModal(true)} confirmSubmit={() => this.confirmSubmit()}/>
        </div>
      </div>
    );
  }

  public render () {
    console.log(this.state);
    return (
			<div className='divMain'>
				<Header setRoute={this.setPage.bind(this)}/>

        <section className='mainSection'>
					{this.router(this.state.route)}
				</section>

				<input type='checkbox' name='selectOpenMenu' id='selectOpenMenu' className='hide' />
				<label htmlFor='selectOpenMenu' className='lblOpenMenu smallDisplay'>
					<span className='openItem'></span>
					<span className='closeItem'></span>
				</label>

				<Footer/>

        <input type='checkbox' name='selectShowFooter' id='selectShowFooter' defaultChecked={true} className='hide' />
				{this.renderModal()}
			</div>
  	);
  }
};


const mapStateToProps = ({ transactionReducer }: any): StateProps => {
  // console.log("transactionReducer", transactionReducer);
  return {
    list_of_instance_info: transactionReducer.list_of_instance_info,
    list_of_transactions: transactionReducer.list_of_transactions
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    get_info_instances : () => {console.log("dispatching get_info_instances "); dispatch(GetInfoInstancesAsyncAction.create([]))},
    list_transactions : () => {console.log("dispatching list_transactions"); dispatch(TransactionListAsyncAction.create({}))}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainAppContainer);
