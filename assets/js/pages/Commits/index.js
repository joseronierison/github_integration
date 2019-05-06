import React, { Fragment } from 'react';
import { Container, Row, Col, Breadcrumb } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { HomeNavbar, CommitsList } from '../../app/github-integration';
import api from '../../api';
import actions from '../../actions';

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  loadUser: payload => dispatch(actions.loadUser(payload)),
  loadCommits: (repoName, payload) => dispatch(actions.loadCommits(repoName, payload)),
  loadRepositories: payload => dispatch(actions.loadRepositories(payload)),
});

class Commits extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.goHome = this.goHome.bind(this);
  }

  componentWillMount() {
    const repoName = this.props.match.params.repo_name;

    this.setState({repoName});

    api.getUser().then(response => this.props.loadUser(response));
    api.getRepositories().then(response => this.props.loadRepositories(response));
    api.retrieveRepoCommits(repoName).then(response => this.props.loadCommits(repoName, response));
  }

  goHome(event) {
    event.preventDefault();

    this.props.history.push('/');
  }

  render() {
    const repo = this.props.user.repositories.find((repository) => repository.name === this.state.repoName);

    if (!this.props.user.profile || !repo || !repo.commits) {
      return <span>Loading..</span>;
    }

    return (
      <Fragment>
        <HomeNavbar profile={this.props.user.profile} />

        <Container>
          <Row className="justify-content-md-left bread-crumb-row">
            <Breadcrumb>
              <Breadcrumb.Item href="/" onClick={this.goHome}>Home</Breadcrumb.Item>
              <Breadcrumb.Item active>{repo.full_name}</Breadcrumb.Item>
            </Breadcrumb>
          </Row>
          <Row className="justify-content-md-center commits-list-row">
            <Col>
              <CommitsList repository={repo} />
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

Commits.propTypes = {
  loadUser: PropTypes.func.isRequired,
};

Commits.defaultProps = {
  user: {
    profile: {
      name: "loading name..",
      username: "loading username..",
    },
  },
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Commits);
