import * as React from 'react';
// custom stylesheet
import '../../styles/page-styles/scaffold-styles.css';

const Contact = (props: any) => {
  return(
    <div className='profile'>
      <h3>Contact Page</h3>hc test | test/node_modules/faucet/bin/cmd.js
      <ul className='profile-content'>
        <li>
          <h4>Phone Number</h4>
          <p>777-777-7777</p>
        </li>
        <li>
          <h4>Email</h4>
          <p>holo@host.com</p>
        </li>
        <li>
          <h4>Holo Host Website</h4>
          <a href='https://holo.host/'><p>holo.host</p></a>
        </li>
      </ul>
    </div>
  );
};

export default Contact;
