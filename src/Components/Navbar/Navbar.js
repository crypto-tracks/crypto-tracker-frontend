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
        <Navbar.Brand href="/">Crypto Tracks</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        { isAuthenticated
          ? <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto navbarScroll">
              <NavDropdown style={{'font-size': '20px'}} title="Tracked Crypto" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="/">Coin #1</NavDropdown.Item>
                <NavDropdown.Item href="/">Coin #2</NavDropdown.Item>
                <NavDropdown.Item href="/">Coin #3</NavDropdown.Item>
                <NavDropdown.Item href="/">Coin #4</NavDropdown.Item>
                <NavDropdown.Item href="/">Coin #5</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="ml-auto">
              <LogoutButton />
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