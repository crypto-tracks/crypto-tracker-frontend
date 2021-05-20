import React from "react";

import "./App.css";
import Header from "./Components/Navbar/Navbar";
import LatestInfo from "./Components/LatestInfo/LatestInfo";
import Search from "./Components/Search/Search";
import News from "./Components/News/News";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { withAuth0 } from "@auth0/auth0-react";

const axios = require("axios");
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      haveSearched: false,
      infoSearched: "",
      coins: [],
      searchTerms: [],
    };
  }

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
    if (
      !infoSearched ||
      !this.state.searchTerms.includes(infoSearched.toLowerCase())
    ) {
      console.warn("Invalid Search");
      // TODO(stretch): Some Error Component
    } else {
      try {
        // console.log(this.getSymbol(infoSearched));
        let newResponse = await axios.get(
          `${process.env.REACT_APP_CRYPTO_TRACKS_API}/news?q=${infoSearched}`
        );
        let coinResponse = await axios.get(
          `${process.env.REACT_APP_CRYPTO_TRACKS_API
          }/coin-latest?symbol=${this.getSymbol(infoSearched)}`
        );
        // console.log("News Works: ", newResponse.data);
        // console.log("Latest Price Works: ", coinResponse.data[0]);
        this.setState({
          newsResults: newResponse.data,
          coinLatest: coinResponse.data[0],
          haveSearched: true,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  async componentDidMount() {
    await this.getCoins();
  }

  //TODO: Add Save / Delete Component Above Latest Info
  render() {
    return (
      <Router>
        <div className="App">
          <Header handleSearch={this.handleSearch} />
          <Switch>
            <Route exact path="/">
              <Search
                handleSearch={this.handleSearch}
                suggestions={this.state.searchTerms}
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
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default withAuth0(App);
