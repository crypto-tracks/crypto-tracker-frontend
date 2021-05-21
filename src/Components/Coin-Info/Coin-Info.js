import React from "react";
import { withAuth0 } from '@auth0/auth0-react';
// import card

class CoinInfo extends React.Component {
  render() {
    const { } = this.props.auth0;
    return (
      <>
      </>
    );
  }
}

  export default withAuth0(CoinInfo);

  //  pass props in the new component, each coin has coin info
// coin key value pairs
//  html scaf id/name/symbol ect inside header divs ect