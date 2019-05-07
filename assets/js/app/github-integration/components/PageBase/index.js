import React from 'react';
import PropTypes from 'prop-types';

class PageBase extends React.Component {
  render() {
    return (
      <Fragment>
        <HomeNavbar profile={this.props.user.profile} />

        {this.props.children}
      </Fragment>
    );
  }
}

PageBase.propTypes = {
};

export default PageBase;
