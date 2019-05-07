import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { HomeNavbar, Loading } from '../app/github-integration';
import api from '../api';
import actions from '../actions';
import Routes from '../routes';

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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
