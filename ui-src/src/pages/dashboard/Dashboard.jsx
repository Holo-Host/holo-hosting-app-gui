import React, { Component } from 'react';

import { Responsive, translate, changeLocale } from 'react-admin';  // Title GET_LIST, GET_MANY
import withStyles from '@material-ui/core/styles/withStyles';
import compose from 'recompose/compose';

import WelcomeHost from './WelcomeHost';
import WelcomeProvider from './WelcomeProvider';
import WelcomeMobile from './WelcomeMobile';
import WelcomeAvatar from './WelcomeAvatar';
import MonthlyRevenue from './MonthlyRevenue';
import RegisteredhApps from './RegisteredhApps';
import HostClients from './HostClients';
// import PendingReviews from './PendingReviews';
// import hAppUsers from './HAppUsers';
// import reducerState from '../../utils/injectReducers';

import { connect } from 'react-redux';
import { fetchAgent } from '../categories/categories_actions';
// import { registerProvider, registerHost } from '../dashboard_actions';

const styles = {
    flex: { display: 'flex' },
    flexPlus: { display: 'flex', justifyContent:'center' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
};

class Dashboard extends Component {
    componentDidMount() {
        this.props.fetchAgent();
    }

    render() {
      // console.log("Props in the Dashboard: ",this.props);
      const { whoami } = this.props;
      if(!whoami) {
          return (
              <div className="loader-container">
                  <div className="loader">Loading...</div>
              </div>
          );
      }
      const agentName = JSON.parse(whoami.name);

      return (
          <Responsive
              xsmall={
                  <div>
                      <div style={styles.flexColumn}>
                          <div style={{ marginBottom: '2em' }}>
                              <WelcomeMobile username={agentName.nick} />
                          </div>
                      </div>
                  </div>
              }
              small={
                  <div style={styles.flexColumn}>
                      <div style={styles.singleCol}>
                        <WelcomeMobile username={agentName.nick} />
                      </div>
                      <div style={styles.flexColumn}>
                        <div style={styles.flex}>
                            <RegisteredhApps />
                        </div>
                        <div style={styles.flex}>
                            <MonthlyRevenue />
                        </div>
                        <div style={styles.flex}>
                            <HostClients />
                        </div>
                      </div>
                  </div>
              }
              medium={
                  <div>
                    <div style={styles.flexPlus}>
                      <div style={{margin:'0 auto', margin: '1em'}}>
                        <WelcomeAvatar username={agentName.nick} />
                      </div>
                    </div>
                    <div style={styles.flex}>
                      <div style={styles.leftCol}>
                          <div style={styles.singleCol}>
                              <WelcomeHost agent={agentName} />
                          </div>
                      </div>
                      <div style={styles.rightCol}>
                          <div style={styles.singleCol}>
                            <WelcomeProvider agent={agentName} />
                          </div>
                      </div>
                      {/* <div style={styles.flexColumn}>
                      //   <div style={styles.flex}>
                      //     <RegisteredhApps />
                      //   </div>
                      //   <div style={styles.flex}>
                      //     <MonthlyRevenue />
                      //   </div>
                      //   <div style={styles.flex}>
                      //     <HostClients />
                      //   </div>
                      </div> */}
                    </div>
                  </div>
              }
            />
        );
    }
}

const mapStateToProps = state => ({
    whoami: state.whoami,
    locale: state.i18n.locale
});


const enhance = compose(
    connect(mapStateToProps, {changeLocale, fetchAgent}),
    translate,
    withStyles(styles)
);

export default enhance(Dashboard);
// export default connect(null, { fetchAgent })(Dashboard);

// FROM:
// <div>Monthly Hosting Revenue</div>
// <div>New hApp Bundles</div>

// TO:
// <MonthlyHostingRevenue value={revenue} />
// <NewHappBundles value={newHappBundles} />

///////////////////
// FROM:
// <PendingOrders
//     orders={pendingOrders}
//     users={pendingOrdersUsers}
// />

// TO:
// <HostingStats
//     happbundles={happbundles}
//     users={users}
// />
