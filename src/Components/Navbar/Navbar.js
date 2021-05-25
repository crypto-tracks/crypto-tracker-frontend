import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
import LoginButton from '../Auth0/LoginButton';
import LogoutButton from '../Auth0/LogoutButton';

import './Navbar.css';

// TODO: Populate Tracked Coins from user saved coins
// TODO: Replace Hardcoded Values

class Header extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth0;
    let coins = this.props.userCoins.map((coin, index) => (
      <div key={index}>
        <Button style={{width: "25%"}} variant="danger" onClick={() => this.props.deleteUserCoin(coin)}>Remove</Button>
        <Button style={{width: "75%"}} variant="secondary" onClick={() => this.props.handleSearch(coin)}>{coin}</Button>
      </div>
    ));
    return (
      <Navbar fixed="top" collapseOnSelect expand="false" bg="dark" variant="dark">
        <Navbar.Brand href="/">Crypto Tracks</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        { isAuthenticated
          ? <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto navbarScroll">
              {coins}
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