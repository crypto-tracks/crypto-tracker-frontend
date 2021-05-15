import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";
import reportWebVitals from './reportWebVitals';

// from Auth0 quickstart
ReactDOM.render(
  <Auth0Provider
    domain="crypto-tracks.us.auth0.com"
    clientId="ia2oczsnhx7gaLt5R9PMPnxasQvljWnY"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
