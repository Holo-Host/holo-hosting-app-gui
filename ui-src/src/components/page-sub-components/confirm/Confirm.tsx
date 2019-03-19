import * as React from 'react';
// local sub-component imports :
import Summary from '../summary/Summary';
// custom stylesheet :
import '../../styles/page-styles/scaffold-styles.css';

const Confirm = (props: any) => {
  let today: any = new Date();
  let dd: any = today.getDate();
  let mm: any = today.getMonth() + 1; //  January is 0!
  const yyyy: any = today.getFullYear();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  today = mm + '/' + dd + '/' + yyyy;

  return (
		<div className='confirm'>
			<div className='notice success'>
				<i className='fa fa-smile-o'/>
				<p>Your transfer has been successfully completed on {today} with confirmation number {Math.random() * 10000000000000000}</p>
			</div>
			<h3>Summary</h3>
			<Summary form={props.form}/>
      <div className='button-holder'>
       <input type='button' className='button CTAButton' value='Do Another Transaction' onClick={() => props.restartTransferForm('form')}/>
      </div>
		</div>
  );
};

export default Confirm;
