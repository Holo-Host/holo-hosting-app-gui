import * as React from 'react';
// custom stylesheet :
import '../../styles/page-styles/scaffold-styles.css';

const Memo = (props: any) => {
  return(
		<fieldset>
			<label className='main-label'>Memo (OPTIONAL: Maximum of {props.maxlen} characters)</label>
			<textarea maxLength={props.maxlen} id='memoText' onChange={props.onChange} value={props.memo.text}/>
			<span>{props.maxlen - props.memo.len} characters remaining.</span>
		</fieldset>
  );
};

export default Memo;
