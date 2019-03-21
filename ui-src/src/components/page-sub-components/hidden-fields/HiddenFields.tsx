import * as React from 'react';
// custom stylesheet :
import '../../styles/page-styles/scaffold-styles.css';

const HiddenFields = (props: any) => {
  return (
		<div>
			<fieldset className={(props.errors.startDate) ? 'half-width error' : 'half-width'}>
				<label className='main-label'>Start Date</label>
				<input type='date' value={props.startDate} onChange={props.changeStartDate} />
				<i className='fa fa-calendar fa-fw'/>
			</fieldset>
			<fieldset className={(props.errors.endDate) ? 'half-width right error' : 'half-width right'}>
				<label className='main-label'>End Date</label>
				<input type='date' value={props.endDate} onChange={props.changeEndDate} />
				<i className='fa fa-calendar fa-fw'/>
			</fieldset>
			<fieldset className={(props.errors.frequency) ? 'error' : ''}>
				<label className='main-label'>Frequency</label>
				<select value={props.frequency} onChange={props.changeFrequency}>
					<option value='Weekly'>Weekly</option>
					<option value='Bi-Monthly'>1st and 15th of each month</option>
					<option value='Monthly'>Every Month</option>
					<option value='Every Two Months'>Every Two Months</option>
				</select>
				<i className='fa fa-refresh fa-fw'/>
			</fieldset>
		</div>
  );
};

export default HiddenFields;
