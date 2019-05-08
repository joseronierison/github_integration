import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import CustomToggle from './customToggle';

const UserMenu = props => (
  <Dropdown>
    <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
      {props.profile.name}
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item href="/logout">Logout</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

UserMenu.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default UserMenu;
