import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
// import LoginButton from './LoginButton/LoginButton';
// import LogoutButton from './LogoutButton/LogoutButton';


class Header extends React.Component {

  render() {
    // const { isAuthenticated } = this.props.auth0;
    return (
      <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Crypto-Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/* <Nav.Link href="/bookshelf">Book Shelf</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link> */}
            <NavDropdown title="" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/">Home</NavDropdown.Item>
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ml-auto">
            {/* <LogoutButton /> */}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {/* <LoginButton /> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;