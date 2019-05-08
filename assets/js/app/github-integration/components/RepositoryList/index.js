import React from 'react';
import { ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const RepositoryList = props => (
  <ListGroup variant="flush" className="repository-list">
    {props.repositories.map((repository) => {
      const commitsUrl = `/repository/${repository.name}/commits`;

      return (
        <ListGroup.Item key={repository.full_name}>
          <NavLink to={commitsUrl} exact>{repository.full_name}</NavLink>
        </ListGroup.Item>
      );
    })}
  </ListGroup>
);

RepositoryList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      full_name: PropTypes.string,
      name: PropTypes.string,
    })
  ),
};

RepositoryList.defaultProps = {
  repositories: [],
};

export default RepositoryList;
