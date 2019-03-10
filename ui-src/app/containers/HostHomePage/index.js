/* HomePage :  This is the first thing users see of our App, at the '/' route */

// Main Imports:
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Redux & State-Control Imports
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/AppRouter/selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  // FetchAgentStringAsyncAction, // ,
  fetch_agent,
  // ,
} from './actions';
import { loadRepos } from '../AppRouter/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import saga from './saga';
import reducer from './reducer';

// Component Imports
import CenteredSection from '../../components/CenteredSection/index';

// Message Imports
import messages from './messages';

export class HostHomePage extends React.Component {
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  render() {
    console.log('INSIDE THE HOST HOMEPAGE', this.props);

    const { loading, error, repos } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };

    return (
      <article>
        <Helmet>
          <title>Host Homepage</title>
          <meta name="description" content="Holo Host: Host Homepage" />
        </Helmet>
        <div>
          <CenteredSection>
            <h1>
              <FormattedMessage {...messages.header} />
            </h1>
          </CenteredSection>

          <section>
            <form onSubmit={this.props.onSubmitForm}>
              <label htmlFor="username">
                <FormattedMessage {...messages.formMessage} />
                <input
                  id="username"
                  type="text"
                  placeholder="mxstbr"
                  value={this.props.username}
                  onChange={this.props.onChangeUsername}
                />
              </label>
            </form>
          </section>
        </div>
      </article>
    );
  }
}

HostHomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  username: PropTypes.string,
  onSubmitForm: PropTypes.func,
  onChangeUsername: PropTypes.func,
};

/** ****************** * HC Action - Redux Handlers * ******************* */
export const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),

  repos: makeSelectRepos(),
  username: makeSelectUsername(),
});

const mapDispatchToProps = dispatch => ({
  fetch_agent_string: () => {
    console.log('dispatching fetch_agent_string');
    dispatch(FetchAgentStringAsyncAction.create([]));
  },
  onChangeUsername: event => dispatch(changeUsername(event.target.value)),
  onSubmitForm: event => {
    if (event !== undefined && event.preventDefault) event.preventDefault();
    dispatch(loadRepos());
  },
});

/** ****************** ****************************** * ******************* */

// export default connect(mapStateToProps, mapDispatchToProps)(HostHomePage);
//
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'hosthome', reducer });
const withSaga = injectSaga({ key: 'hosthome', saga });
//
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HostHomePage);

/*
* NOTE: while this component should technically be a stateless functional
* component (SFC), hot reloading does not currently support SFCs. Thus, until
* hot reloading is accessible for SFCs, this remain a linting exception.
*/
