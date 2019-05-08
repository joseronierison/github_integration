import React from 'react';
import { ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CommitList = props => (
  <ListGroup variant="flush">
    {props.repository.commits.map(commit => (
      <ListGroup.Item key={commit.sha}>
        <a href={commit.url} target="_blank" rel="noopener noreferrer">{commit.sha}</a> <br />
        <span><b>{commit.author}</b> - {commit.message}</span>
      </ListGroup.Item>))
    }
  </ListGroup>);

CommitList.propTypes = {
  repository: PropTypes.shape({
    commits: PropTypes.array,
  }).isRequired,
};

export default CommitList;
