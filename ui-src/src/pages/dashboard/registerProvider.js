import React from 'react';
import { connect } from 'react-redux';
import { registerProvider } from './actions';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import { translate } from 'react-admin';

class RegisterProvider extends React.Component {
    render() {
        return (
          <Button onClick={this.props.registerProvider}>
            <HomeIcon style={{ paddingRight: '0.5em' }} />
            I am not a Registered Provider
          </Button>
      )}
}

export default connect(null, { registerProvider })(RegisterProvider);
