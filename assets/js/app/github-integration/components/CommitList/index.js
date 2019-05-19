import React from 'react';
import { ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const CommitList = props => (
  <ListGroup variant="flush">
    {props.commits.map((commit) => {
        const repoUrl = `/repository/${commit.repository_name}/commits`;
        return (
          <ListGroup.Item key={commit.sha}>
            <NavLink className="repo-nav-link" to={repoUrl} exact>{commit.repository_name}</NavLink> <br />
            <a href={commit.url} target="_blank" rel="noopener noreferrer">{commit.sha}</a> <br />
            <span><b>{commit.author}</b> - {commit.message}</span>
          </ListGroup.Item>);
      })}
  </ListGroup>);

CommitList.propTypes = {
  commits: PropTypes.arrayOf(PropTypes.shape({
    sha: PropTypes.string,
    repository_name: PropTypes.string,
    message: PropTypes.string,
    url: PropTypes.string,
    author: PropTypes.string,
  })).isRequired,
};

export default CommitList;
