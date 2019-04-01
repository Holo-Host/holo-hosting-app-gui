import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import green from '@material-ui/core/colors/green';

const styles = {
  root: {
    // marginLeft: 0,
    color: '#046f7b',
    '&$checked': {
      color: '#024d56',
    },
  },
  checked: {},
};

class CheckboxLabels extends React.Component {
  state = {
    checked_provider: false,
    checked_host: false,
    checked_both: false
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });

  };

  render() {
    const { classes } = this.props;

    return (
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checked_provider}
              onChange={this.handleChange('checked_provider')}
              value="checked_provider"
              classes={{
                root: classes.root,
                checked: classes.checked,
              }}
            />
          }
          label="A Provider"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checked_host}
              onChange={this.handleChange('checked_host')}
              value="checked_host"
              classes={{
                root: classes.root,
                checked: classes.checked,
              }}
            />
          }
          label="A Host"
        />
        {/*
          <FormControlLabel
            control={
              <Checkbox
                checked={this.state.checked_both}
                onChange={this.handleChange('checked_both')}
                value="checked_both"
                classes={{
                  root: classes.root,
                  checked: classes.checked,
                }}
              />
            }
            label="Both"
          />
        */}
      </FormGroup>
    );
  }
}

CheckboxLabels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxLabels);
