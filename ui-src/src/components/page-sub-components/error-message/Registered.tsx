import * as React from 'react';
import QueueAnim from 'rc-queue-anim';

const BothMatch = () => (
  <div className="error-container text-center" style={{margin:"20vh"}}>
    <div className="error" style={{textAlign:'center', margin:'0 auto'}}>
      <h2 style={{justifyContent:'center', color:"#0e094b", padding: 20, width: '40%', margin: '0 auto', background:'#fcfeff', border: '4px solid #00838d', fontWeight:'normal'}}>
        You are currently registered as both a Host and Provider.
      </h2>
    </div>
  </div>
);

const Registered = () => (
  <div className="page-error">
    <QueueAnim type="bottom">
      <div key="1">
        <BothMatch />
      </div>
    </QueueAnim>
  </div>
);

export default Registered;
