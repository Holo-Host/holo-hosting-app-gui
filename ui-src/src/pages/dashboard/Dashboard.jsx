import React, { Component } from 'react';
import { GET_LIST, GET_MANY, Responsive } from 'react-admin';

import Welcome from './Welcome';
// import MonthlyRevenue from './MonthlyRevenue';
// import PendingReviews from './PendingReviews';
// import NewUsers from './NewUsers';
import reducerState from '../../utils/injectReducers';

import { connect } from 'react-redux';
import { fetchAgent } from '../categories/categories_actions';

const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
};

class Dashboard extends Component {
    state = {};

    componentDidMount() {
        this.props.fetchAgent();
    }

    render() {
        console.log("Props on the Dashboard: ",this.props);
        const {whoami} = this.props;
        return (
            <Responsive
                xsmall={
                    <div>
                        <div style={styles.flexColumn}>
                            <div style={{ marginBottom: '2em' }}>
                                <Welcome username={whoami} />
                            </div>
                        </div>
                    </div>
                }
                small={
                    <div style={styles.flexColumn}>
                        <div style={styles.singleCol}>
                            <Welcome username={whoami} />
                        </div>
                    </div>
                }
                medium={
                    <div style={styles.flex}>
                        <div style={styles.leftCol}>
                            <div style={styles.flex}>
                            </div>
                            <div style={styles.singleCol}>
                                <Welcome username={whoami} />
                            </div>
                            <div style={styles.singleCol}>
                            </div>
                        </div>
                        <div style={styles.rightCol}>
                            <div style={styles.flex}>
                            </div>
                        </div>
                    </div>
                }
            />
        );
    }
}

export default connect(null, { fetchAgent })(Dashboard);
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
