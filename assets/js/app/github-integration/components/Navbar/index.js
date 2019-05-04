import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const HomeNavbar = () => (
  <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand href="#home">Github Integration</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="#your-repos">Your repos</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link href="#deets">User</Nav.Link>
        <Nav.Link href="#logout">Logout</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default HomeNavbar;
