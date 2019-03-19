import * as React from 'react';
// custom stylesheet :
import '../../styles/page-styles/scaffold-styles.css';

const Header = (props: any) => {
  return(
    <div>
      <div className='btnMenu' >
        <label htmlFor='select-menu'>
          <i className='fa fa-bars'/>
        </label>
      </div>
      <input type='checkbox' id='select-menu' />
      <nav className='menu'>
        <div className='title'>Holofuel</div>
       <ul>
          <li><label htmlFor='select-menu' onClick={() => props.setRoute('transactionSummary')}>Transaction Summary</label></li>
          <li><label htmlFor='select-menu' onClick={() => props.setRoute('form')}>Account Transfer</label></li>
          <li><label htmlFor='select-menu' onClick={() => props.setRoute('contact')}>About</label></li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
