import React from "react";

import "./App.css";
import Header from "./Components/Navbar/Navbar";
import LatestInfo from "./Components/LatestInfo/LatestInfo";
import Search from "./Components/Search/Search";
import News from "./Components/News/News";
import { withAuth0 } from "@auth0/auth0-react";
import IsLoadingAndError from "./IsLoadingAndError";
import { BrowserRouter as Router } from "react-router-dom";

const axios = require("axios");
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      haveSearched: false,
      infoSearched: "",
      coinLatest: "",
      coins: [],
      searchTerms: [],
      userCoins: [],
    };
  }

  // Helper Promise Delay
  timeout = (delay) => {
    return new Promise((res) => setTimeout(res, delay));
  };

  getUserCoins = async () => {
    // This is a bit of a hack...
    while (this.props.auth0.isLoading === true) {
      await this.timeout(200);
    }
    console.log("Auth0 User: ", this.props.auth0.user);
    if (this.props.auth0.user !== undefined) {
      const response = await axios.get(
        `${process.env.REACT_APP_CRYPTO_TRACKS_API}/tracked/read/${this.props.auth0.user.email}`
      );
      console.log("Response: ", response);
      this.setState({
        userCoins: response.data.coins,
        userEmail: response.data.email,
      });
    }
  };

  addUserCoin = async () => {
    // TODO: Assign response to state
    await axios.post(`${process.env.REACT_APP_CRYPTO_TRACKS_API}/tracked/update`, {
      symbol: this.state.coinLatest.symbol,
      email: this.props.auth0.user.email,
    });
    this.getUserCoins();
  };

  deleteUserCoin = async (coin) => {
    console.log(coin);
    console.log(this.props.auth0.user.email);
    // TODO: Assign response to state
    await axios.delete(`${process.env.REACT_APP_CRYPTO_TRACKS_API}/tracked/delete`, {
      data: {
        symbol: coin,
        email: this.props.auth0.user.email,
      },
    });
    this.getUserCoins();
  };

  getCoins = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_CRYPTO_TRACKS_API}/coins`
    );
    const coins = response.data;
    let searchTuples = coins.map((coin) => [coin.searchTerms, coin.symbol]);
    let validSearchTerms = searchTuples.reduce((a, b) => a.concat(b[0]), []);
    this.setState({
      coins: searchTuples,
      searchTerms: validSearchTerms,
    });
  };

  getSymbol = (needle) => {
    let match = this.state.coins.find((entry) => entry[0].includes(needle));
    return match[1];
  };

  handleSearch = async (infoSearched) => {
    if (!infoSearched || !this.state.searchTerms.includes(infoSearched)) {
      console.warn("Invalid Search");
      // TODO(stretch): Some Error Component
    } else {
      try {
        // console.log(this.getSymbol(infoSearched));
        let newResponse = await axios.get(
          `${process.env.REACT_APP_CRYPTO_TRACKS_API}/news?q=${infoSearched}`
        );
        let coinResponse = await axios.get(
          `${
            process.env.REACT_APP_CRYPTO_TRACKS_API
          }/coin-latest?symbol=${this.getSymbol(infoSearched)}`
        );
        // console.log("News Works: ", newResponse.data);
        // console.log("Latest Price Works: ", coinResponse.data[0]);
        this.setState({
          newsResults: newResponse.data,
          coinLatest: coinResponse.data[0],
          haveSearched: true,
        });
        console.log("Coin Latest: ", coinResponse.data[0].symbol);
      } catch (err) {
        console.log(err);
      }
    }
  };

  async componentDidMount() {
    await this.getCoins();
    await this.getUserCoins();
  }

  //TODO: Add Save / Delete Component Above Latest Info
  render() {
    return (
      <>
        <Router>
          <IsLoadingAndError>
            <div className="App">
              <Header
                handleSearch={this.handleSearch}
                userCoins={this.state.userCoins}
                deleteUserCoin={this.deleteUserCoin}
              />
              <Search
                handleSearch={this.handleSearch}
                suggestions={this.state.searchTerms}
                haveSearched={this.state.haveSearched}
                activeCoin={this.state.coinLatest.symbol}
                addUserCoin={this.addUserCoin}
                loading={this.loading}
              />
              {this.state.haveSearched ? (
                <LatestInfo price={this.state.coinLatest} />
              ) : (
                ""
              )}
              {this.state.haveSearched ? (
                <News news={this.state.newsResults} />
              ) : (
                ""
              )}
            </div>
          </IsLoadingAndError>
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
