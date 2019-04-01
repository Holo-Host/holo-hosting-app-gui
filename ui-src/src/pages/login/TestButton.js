import React from 'react';
import { connect } from 'react-redux';
import { fetchAgent } from '../categories/categories_actions';

class ApproveButton extends React.Component {
    handleClick = () => {
        const { fetchAgent } = this.props;
        fetchAgent();
    }

    render() {
        return <button onClick={this.handleClick}>Test WHOAMI CALL</button>;
    }
}

// ApproveButton.propTypes = {
//     fetchAgent: PropTypes.func.isRequired,
// };

export default connect(null, { fetchAgent })(ApproveButton);
