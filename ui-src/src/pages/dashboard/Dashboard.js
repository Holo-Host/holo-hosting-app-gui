import React, { Component } from 'react';
import { GET_LIST, GET_MANY, Responsive } from 'react-admin';

import Welcome from './Welcome';
import MonthlyRevenue from './MonthlyRevenue';
import PendingReviews from './PendingReviews';
import NewUsers from './NewUsers';
import dataProviderFactory from '../dataProvider';

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
        const aMonthAgo = new Date();
        aMonthAgo.setDate(aMonthAgo.getDate() - 30);

        dataProviderFactory(process.env.REACT_APP_DATA_PROVIDER).then(
            dataProvider => {
              dataProvider(GET_LIST, 'reviews', {
                  filter: { status: 'pending' },
                  sort: { field: 'date', order: 'DESC' },
                  pagination: { page: 1, perPage: 100 },
              })
              .then(response => response.data)
              .then(reviews => {
                  const nbPendingReviews = reviews.reduce(nb => ++nb, 0);
                  const pendingReviews = reviews.slice(
                      0,
                      Math.min(10, reviews.length)
                  );
                  this.setState({ pendingReviews, nbPendingReviews });
                  return pendingReviews;
              })
              .then(reviews => reviews.map(review => review.user_id))
              .then(userIds =>
                  dataProvider(GET_MANY, 'users', {
                      ids: userIds,
                  })
              )
              .then(response => response.data)
              .then(users =>
                  users.reduce((prev, user) => {
                      prev[user.id] = user; // eslint-disable-line no-param-reassign
                      return prev;
                  }, {})
              )
              .then(users =>
                  this.setState({ pendingReviewsUsers: users })
              );

              dataProvider(GET_LIST, 'users', {
                filter: {
                    has_ordered: true,
                    first_seen_gte: aMonthAgo.toISOString(),
                },
                sort: { field: 'first_seen', order: 'DESC' },
                pagination: { page: 1, perPage: 100 },
              })
              .then(response => response.data)
              .then(newUsers => {
                  this.setState({ newUsers });
                  this.setState({
                      nbNewUsers: newUsers.reduce(nb => ++nb, 0),
                  });
              });
            }
        );
    }

    render() {
        const {
            nbNewUsers,
            nbPendingReviews,
            newUsers,
            pendingReviews,
            pendingReviewsUsers
        } = this.state;
        return (
            <Responsive
                xsmall={
                    <div>
                        <div style={styles.flexColumn}>
                            <div style={{ marginBottom: '2em' }}>
                                <Welcome />
                            </div>
                            <div style={styles.flex}>
                                <div>Hosted Apps</div>
                            </div>
                            <div style={styles.singleCol}>
                              <div>Hosting Stats</div>
                            </div>
                        </div>
                    </div>
                }
                small={
                    <div style={styles.flexColumn}>
                        <div style={styles.singleCol}>
                            <Welcome />
                        </div>
                        <div style={styles.flex}>
                            <div>Hosted Apps</div>
                        </div>
                        <div style={styles.singleCol}>
                            <div>Hosting Stats</div>
                        </div>
                    </div>
                }
                medium={
                    <div style={styles.flex}>
                        <div style={styles.leftCol}>
                            <div style={styles.flex}>
                              <div>Monthly Hosting Revenue</div>
                              <div>New hApp Bundles</div>
                            </div>
                            <div style={styles.singleCol}>
                                <Welcome />
                            </div>
                            <div style={styles.singleCol}>
                              <div>Hosting Stats</div>
                            </div>
                        </div>
                        <div style={styles.rightCol}>
                            <div style={styles.flex}>
                              <div>HappReviews</div>
                              <div>Hosting Settings</div>
                            </div>
                        </div>
                    </div>
                }
            />
        );
    }
}

export default Dashboard;
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
