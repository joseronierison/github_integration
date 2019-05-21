import React from 'react';
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CommitList, Loading } from '../../app/github-integration';
import api from '../../api';
import actions from '../../actions';
import Dashboard from '../dashboard';

export class Commits extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.goHome = this.goHome.bind(this);
    this.refreshCommits = this.refreshCommits.bind(this);
    this.refreshInterval = setInterval(this.refreshCommits, 3000);
  }

  componentWillMount() {
    api.getRepositories().then(response => this.props.loadRepositories(response));
    this.refreshCommits();
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  goHome(event) {
    event.preventDefault();

    this.props.history.push('/');
  }

  refreshCommits() {
    api.retrieveCommits().then(response => this.props.loadCommits(response));
  }

  render() {
    if (!this.props.user.latest_commits) {
      return <Dashboard><Loading /></Dashboard>;
    }

    return (
      <Dashboard>
        <Container>
          <Row className="justify-content-md-left bread-crumb-row">
            <Breadcrumb>
              <Breadcrumb.Item href="/" onClick={this.goHome}>Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Last Commits</Breadcrumb.Item>
            </Breadcrumb>
          </Row>
          <Row className="justify-content-md-center commits-list-row">
            <Col>
              <h5>Listing last 30 captured commits</h5>
              <CommitList commits={this.props.user.latest_commits} />
            </Col>
          </Row>
        </Container>
      </Dashboard>
    );
  }
}

Commits.propTypes = {
  loadRepositories: PropTypes.func.isRequired,
  loadCommits: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      repo_name: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  user: PropTypes.shape({
    profile: PropTypes.shape({
      name: PropTypes.string,
      username: PropTypes.string,
    }),
    repositories: PropTypes.arrayOf(PropTypes.shape({
      full_name: PropTypes.string,
      name: PropTypes.string,
    })),
    latest_commits: PropTypes.array,
  }).isRequired,
};

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  loadCommits: payload => dispatch(actions.loadCommits(payload)),
  loadRepositories: payload => dispatch(actions.loadRepositories(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Commits);
