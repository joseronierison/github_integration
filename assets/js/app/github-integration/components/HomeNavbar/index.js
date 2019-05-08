import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import UserMenu from '../UserMenu';

const HomeNavbar = props => (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand><NavLink to="/" exact className="navbar-link">Github Integration</NavLink></Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto" />
      <Nav>
        <UserMenu {...props} />
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default HomeNavbar;
