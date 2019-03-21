import React from 'react';
import { connect } from 'react-redux';
import { registerHost } from './dashboard_actions';
import Button from '@material-ui/core/Button';
import DnsIcon from '@material-ui/icons/Dns';
// import { translate } from 'react-admin';

class RegisterHost extends React.Component {
    render() {
        return (
          <Button onClick={this.props.registerHost}>
            <DnsIcon style={{ paddingRight: '0.5em' }} />
              I am not a Registered Host
          </Button>
      )}
}

export default connect(null, { registerHost })(RegisterHost);
