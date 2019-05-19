import React from 'react';
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CommitList, Loading } from '../../app/github-integration';
import api from '../../api';
import actions from '../../actions';
import Dashboard from '../dashboard';

export class RepositoryCommits extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.goHome = this.goHome.bind(this);
  }

  componentWillMount() {
    const repoName = this.props.match.params.repo_name;

    this.setState({ repoName });

    api.getRepositories().then(response => this.props.loadRepositories(response));

    api.retrieveRepoCommits(repoName)
      .then(response => this.props.loadRepositoryCommits(repoName, response));
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  goHome(event) {
    event.preventDefault();

    this.props.history.push('/');
  }

  render() {
    const repo = this.props.user.repositories.find(repository =>
      repository.name === this.state.repoName);

    if (!repo || !repo.commits) {
      return <Dashboard><Loading /></Dashboard>;
    }

    return (
      <Dashboard>
        <Container>
          <Row className="justify-content-md-left bread-crumb-row">
            <Breadcrumb>
              <Breadcrumb.Item href="/" onClick={this.goHome}>Home</Breadcrumb.Item>
              <Breadcrumb.Item href="/commits" >All Commits</Breadcrumb.Item>
              <Breadcrumb.Item active>{repo.name}</Breadcrumb.Item>
            </Breadcrumb>
          </Row>
          <Row className="justify-content-md-center commits-list-row">
            <Col>
              <CommitList commits={repo.commits} />
            </Col>
          </Row>
        </Container>
      </Dashboard>
    );
  }
}

RepositoryCommits.propTypes = {
  loadRepositories: PropTypes.func.isRequired,
  loadRepositoryCommits: PropTypes.func.isRequired,
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
  }).isRequired,
};

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  loadRepositoryCommits: (repoName, payload) =>
    dispatch(actions.loadRepositoryCommits(repoName, payload)),
  loadRepositories: payload => dispatch(actions.loadRepositories(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RepositoryCommits);
