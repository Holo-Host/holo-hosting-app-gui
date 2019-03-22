import * as React from 'react';
import QueueAnim from 'rc-queue-anim';

const NoMatch = () => (
  <div className="error-container text-center" style={{margin:"20vh"}}>
    <div className="error" style={{textAlign:'center', margin:'0 auto'}}>
      <h2 style={{justifyContent:'center', color:"#0e094b", padding: 20, width: '40%', margin: '0 auto', background:'#fcfeff', border: '2px solid #bec4dd'}}>
        Sorry, no hApps yet exist.
      </h2>
    </div>
  </div>
);

const ErrorMessage = () => (
  <div className="page-error">
    <QueueAnim type="bottom">
      <div key="1">
        <NoMatch />
      </div>
    </QueueAnim>
  </div>
);

export default ErrorMessage;
