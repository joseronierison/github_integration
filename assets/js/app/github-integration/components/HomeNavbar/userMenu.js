import React from 'react';
import { Dropdown } from 'react-bootstrap';
import PropTypes from 'prop-types';

class CustomToggle extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    this.props.onClick(e);
  }

  render() {
    return (
      <button className="navbar-link" onClick={this.handleClick}>
        {this.props.children}
      </button>
    );
  }
}

CustomToggle.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

class UserMenu extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-basic">
          {this.props.profile.name}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="/logout">Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

UserMenu.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};

export default UserMenu;
