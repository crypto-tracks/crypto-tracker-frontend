import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
import LoginButton from '../Auth0/LoginButton';
import LogoutButton from '../Auth0/LogoutButton';


class Header extends React.Component {

  render() {
    const { isAuthenticated } = this.props.auth0;
    return (
      <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Crypto-Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        { isAuthenticated
          ? <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavDropdown title="" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/">Home</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>{ isAuthenticated ? <LogoutButton /> : <LoginButton /> }</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="ml-auto">

            </Nav>
          </Navbar.Collapse>
          : <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <LoginButton />
            </Nav>
          </Navbar.Collapse>
        }
      </Navbar>
    );
  }
}

export default withAuth0(Header);