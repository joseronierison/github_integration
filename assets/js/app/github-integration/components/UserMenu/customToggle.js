import React from 'react';
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

export default CustomToggle;
