import React from 'react';
import { ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'

class CommitsList extends React.Component {
  render() {
    return (
      <ListGroup variant="flush">
        {this.props.repository.commits.map((commit, index) => {
          return (
            <ListGroup.Item key={index}>
              <a href={commit.url} target="_blank">{commit.sha}</a> <br />
              <span><b>{commit.author}</b> - {commit.message}</span>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  }
}

CommitsList.propTypes = {
  repository: PropTypes.shape({
    url: PropTypes.string,
    sha: PropTypes.string,
    author: PropTypes.string,
    message: PropTypes.string,
    commits: PropTypes.array,
  }).isRequired,
};

export default CommitsList;
