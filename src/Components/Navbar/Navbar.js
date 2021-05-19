import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
import LoginButton from '../Auth0/LoginButton';
import LogoutButton from '../Auth0/LogoutButton';

import './Navbar.css';

// TODO: Populate Tracked Coins from user saved coins
// TODO: Replace Hardcoded Values

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
              <NavDropdown style={{'fontSize': '20px'}} title="Tracked Crypto" id="collapsible-nav-dropdown">
                <Button style={{width: "100%"}} variant="secondary" onClick={() => this.props.handleSearch('xrp')}>XRP</Button>
                <Button style={{width: "100%"}} variant="secondary" onClick={() => this.props.handleSearch('btc')}>BTC</Button>
                <Button style={{width: "100%"}} variant="secondary" onClick={() => this.props.handleSearch('doge')}>DOGE</Button>
                <Button style={{width: "100%"}} variant="secondary" onClick={() => this.props.handleSearch('ltc')}>LTC</Button>
                <Button style={{width: "100%"}} variant="secondary" onClick={() => this.props.handleSearch('celo')}>CELO</Button>
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