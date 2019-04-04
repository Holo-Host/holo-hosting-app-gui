import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-admin';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { registerAsProvider, isRegisteredAsProvider } from './dashboard_actions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';

import NotRegistered from './NotRegisteredMessage';
import RegisteredDash from './RegisteredDash';

const styles = theme => ({
    main: {
        flex: '1',
        marginLeft: '1.5em',
        marginTop: '2.5em',
    },
    title: {
        padding: '0 16px',
    }
});

class RegisterProvider extends React.Component {
    componentDidMount () {
      this.props.isRegisteredAsProvider();
    }
    registerProvider = () => {
      this.props.registerAsProvider({provider_doc:{kyc_proof:""}});
    }

    render() {
        const { registered_as_provider, classes } = this.props;
        return (
          <div className={classes.main}>
            {registered_as_provider ?
              <div>
                <Typography className={classes.title} color="textSecondary">
                  {translate('pos.dashboard.registerProvider.is_provider_title')}
                </Typography>

                <div className={classes.media} >
                  <RegisteredDash />
                </div>
              </div>

            :

              <div>
                <Typography className={classes.title} color="textSecondary">
                  {translate('pos.dashboard.registerProvider.not_provider_title')}
                </Typography>

                <div className={classes.media} >
                  <NotRegistered type="provider" />
                </div>

                <Button onClick={this.registerProvider}>
                  <HomeIcon style={{ paddingRight: '0.5em' }} />
                </Button>
              </div>
            }
          </div>
      )
    }
}

const mapStateToProps = state => ({
    whoami: state.whoami,
    registered_as_provider: state.registered_hApp_bundles,
    locale: state.i18n.locale
});
const enhance = compose(
    connect(mapStateToProps, { registerAsProvider, isRegisteredAsProvider }),
    withStyles(styles),
    translate
);

export default enhance(RegisterProvider);
