import React, { Fragment } from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { HomeNavbar, RepositoriesTable } from '../../app/github-integration';
import api from '../../api';
import actions from '../../actions';
import './style.css';

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  loadUser: payload => dispatch(actions.loadUser(payload)),
  loadRepositories: payload => dispatch(actions.loadRepositories(payload)),
});

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.addRepository = this.addRepository.bind(this);
  }

  componentWillMount() {
    this.setState({});
    api.getUser().then(response => this.props.loadUser(response));
    api.getRepositories().then(response => this.props.loadRepositories(response));
  }

  handleChange(event) {
    const value = event.target.value;

    this.setState({
      [event.target.name]: value
    });
  };

  addRepository(event) {
    event.preventDefault();

    api.retrieveRepo(this.state.repo_name)
      .then(response => {
        api.addRepo(response)
          .then(r => {
            const commitsUrl = `/repository/${r.name}/commits`;
            this.props.history.push(commitsUrl)
          })
      });
  }

  render() {
    if (!this.props.user.profile) {
      return <span>Loading</span>;
    }

    return (
      <Fragment>
        <HomeNavbar profile={this.props.user.profile} />

        <Container>
          <Row className="justify-content-md-center search-row">
            <Col>
              <InputGroup size="lg" className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="repository-name">
                    {this.props.user.profile.username}/
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  name="repo_name"
                  onChange={this.handleChange.bind(this)}
                  aria-describedby="repository-name" />
                <InputGroup.Append>
                  <Button variant="outline-secondary" onClick={this.addRepository}>Add</Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <RepositoriesTable repositories={this.props.user.repositories} history={this.props.history} />
          </Row>
        </Container>
      </Fragment>
    );
  }
}

Home.propTypes = {
  loadUser: PropTypes.func.isRequired,
};

Home.defaultProps = {
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
)(Home);
