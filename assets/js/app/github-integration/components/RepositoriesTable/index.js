import React from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'

class RepositoriesTable extends React.Component {
  render() {

    return (
      <Table striped bordered hover className="repositories-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {this.props.repositories.map(repository => {
            const commitsUrl = `/repository/${repository.name}/commits`;
            return (
              <tr key={repository.full_name}>
                <td><NavLink to={commitsUrl} exact>{repository.full_name}</NavLink></td>
                <td>{repository.created_at}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

RepositoriesTable.propTypes = {
  repositories: PropTypes.array,
};

RepositoriesTable.defaultProps = {
  repositories: [],
}

export default RepositoriesTable;
