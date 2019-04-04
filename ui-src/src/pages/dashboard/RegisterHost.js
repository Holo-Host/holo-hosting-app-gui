import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-admin';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { registerAsHost, isRegisteredAsHost } from './dashboard_actions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DnsIcon from '@material-ui/icons/Dns';

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

class RegisterHost extends React.Component {
   componentDidMount () {
     this.props.isRegisteredAsHost();
   }
   registerHost = () => {
     this.props.registerAsHost({host_doc:{kyc_proof:""}});
   }

    render() {
        const { registered_as_host, classes,translate } = this.props;
        return (
          <div className={classes.main}>
            {registered_as_host ?
              <div>
                <Typography className={classes.title} color="textSecondary">
                  {translate('pos.dashboard.registerHost.is_host_title')}
                </Typography>
                <RegisteredDash />
              </div>

            :

              <div>
                <Typography className={classes.title} color="textSecondary">
                {translate('pos.dashboard.registerHost.not_host_title')}
                </Typography>

                <NotRegistered type="host" />

                <Button onClick={this.registerHost}>
                  <DnsIcon style={{ paddingRight: '0.5em' }} />
                </Button>
              </div>
            }
          </div>
      )
    }
}

const mapStateToProps = state => ({
    whoami: state.whoami,
    registered_as_host: state.registered_hApp_bundles,
    locale: state.i18n.locale
});
const enhance = compose(
    connect(mapStateToProps, { registerAsHost, isRegisteredAsHost }),
    withStyles(styles),
    translate
);

export default enhance(RegisterHost);
