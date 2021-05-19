import React from "react";
import Search from "../Search/Search";
import News from "../News/News";
import LatestInfo from "../LatestInfo/LatestInfo";

const axios = require("axios");
class Home extends React.Component {
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
    const response = await axios.get(`${process.env.REACT_APP_CRYPTO_TRACKS_API}/coins`);
    const coins = response.data;
    let searchTuples = coins.map(coin => [coin.searchTerms, coin.symbol])
    let validSearchTerms = searchTuples.reduce((a, b) => a.concat(b[0]), []);
    this.setState({ 
      coins: searchTuples,
      searchTerms: validSearchTerms,
    });
  }

  getSymbol = (needle) => {
    let match = this.state.coins.find(entry => entry[0].includes(needle))
    return match[1];
  }

  handleSearch = async (infoSearched) => {
    if (!infoSearched || !this.state.searchTerms.includes(infoSearched.toLowerCase())) {
      console.warn('Invalid Search');
      // TODO: Some Error Component
    } else {
      try {
        console.log(this.getSymbol(infoSearched));
        let newResponse = await axios.get(
          `${process.env.REACT_APP_CRYPTO_TRACKS_API}/news?q=${infoSearched}`
        );
        let coinResponse = await axios.get(
          `${process.env.REACT_APP_CRYPTO_TRACKS_API}/coin-latest?symbol=${this.getSymbol(infoSearched)}`
        )
        // console.log("News Works", newResponse);
        console.log("Latest Price Works", coinResponse[0]);
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

  render() {
    return (
      <>
        <Search handleSearch={this.handleSearch} suggestions={this.state.searchTerms} />
        {this.state.haveSearched ? <LatestInfo price={this.state.coinLatest} /> : ""}
        {this.state.haveSearched ? <News news={this.state.newsResults} /> : ""}
      </>
    );
  }
}

export default Home;
