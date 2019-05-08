import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { HomeNavbar, Loading } from '../app/github-integration';
import api from '../api';
import actions from '../actions';

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  loadUser: payload => dispatch(actions.loadUser(payload)),
});

class Dashboard extends React.Component {
  componentWillMount() {
    api.getUser().then(response => this.props.loadUser(response));
  }

  render() {
    if (!this.props.user.profile) {
      return <Loading />;
    }

    return (
      <Fragment>
        <HomeNavbar profile={this.props.user.profile} />

        {this.props.children}
      </Fragment>
    );
  }
}

Dashboard.propTypes = {
  loadUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    profile: PropTypes.shape({
      name: PropTypes.string,
      username: PropTypes.string,
    }),
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
