import React from 'react';
import { ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'

class RepositoryList extends React.Component {
  render() {
    return (
      <ListGroup variant="flush" className="repository-list">
          {this.props.repositories.map((repository, index) => {
            const commitsUrl = `/repository/${repository.name}/commits`;
            return (
              <ListGroup.Item key={index}>
                <NavLink to={commitsUrl} exact>{repository.full_name}</NavLink>
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    );
  }
}

RepositoryList.propTypes = {
  repositories: PropTypes.array,
};

RepositoryList.defaultProps = {
  repositories: [],
}

export default RepositoryList;
