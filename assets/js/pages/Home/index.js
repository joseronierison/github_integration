import React from 'react';
import { Container, Row, Col, InputGroup, FormControl, Button, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import { RepositoryList, Loading } from '../../app/github-integration';
import Dashboard from '../dashboard';
import api from '../../api';
import actions from '../../actions';
import './style.css';

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  loadRepositories: payload => dispatch(actions.loadRepositories(payload)),
});

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.addRepository = this.addRepository.bind(this);
    this.toggleAddingRepo = this.toggleAddingRepo.bind(this);
    this.searchInputRef = React.createRef();
  }

  componentWillMount() {
    this.setState({
      addingRepo: false,
      error: false
    });

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
    if(!this.state.repo_name) {
      return;
    }

    this.toggleAddingRepo();

    api.retrieveRepo(this.state.repo_name)
      .then(response => {
        api.addRepo(response)
          .then(r => {
            const commitsUrl = `/repository/${r.name}/commits`;
            this.props.history.push(commitsUrl)
          })
          .catch(error => {
            this.setState({error: "We could not add this repository in the database."});
            this.toggleAddingRepo();
          });
      })
      .catch(error => {
        this.setState({error: `We could not find the provided repository "${this.props.user.profile.username}/${this.state.repo_name}".`});
        this.toggleAddingRepo();
      });
  }

  toggleAddingRepo() {
    this.setState({addingRepo: !this.state.addingRepo});
  }

  render() {
    const handleHide = () => this.setState({ error: false });

    if (!this.props.user.profile) {
      return <Dashboard><Loading /></Dashboard>;
    }

    return (
      <Dashboard>
        <Alert show={!!this.state.error} className="adding-repo-alert" variant="dark">
          <Alert.Heading>Error adding repository!</Alert.Heading>
          <p>
            {this.state.error}
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={handleHide} variant="outline-dark">Close</Button>
          </div>
        </Alert>
        <Container>
          <Row className="justify-content-md-center search-row">
            <Col>
              <InputGroup size="lg" className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="repository-name">
                    {this.props.user.profile.username}/
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl disabled={(this.state.addingRepo)? "disabled" : ""}
                  name="repo_name"
                  onChange={this.handleChange.bind(this)}
                  aria-describedby="repository-name" />
                <InputGroup.Append>
                  <Button variant="outline-secondary" onClick={this.addRepository} disabled={(this.state.addingRepo)? "disabled" : ""}>
                    {(!this.state.addingRepo)? "Add" : <ReactLoading height={24} width={24} type="cubes" color="rgb(53, 126, 221)" /> }
                  </Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <RepositoryList repositories={this.props.user.repositories} history={this.props.history} />
          </Row>
        </Container>
      </Dashboard>
    );
  }
}

Home.propTypes = {
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
