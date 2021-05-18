import React from 'react';

import './App.css';
import Header from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import { withAuth0 } from '@auth0/auth0-react';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <Home />
      </header>
    </div>
  );
}

export default withAuth0(App);
