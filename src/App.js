import React from 'react';
import './App.css';
import Header from './Components/Navbar/Navbar.js';
import { withAuth0 } from '@auth0/auth0-react';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
    </div>
  );
}

export default withAuth0(App);
