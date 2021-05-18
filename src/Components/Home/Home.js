import React from 'react';
import Search from '../Search/Search';

const axios = require('axios');
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      haveSearched: false,
      infoSearched: '',
      newsResults: []
    };
  }

  showSearch = () => {
    this.setState({ haveSearched: false });
  }

  handleSearch = async (infoSearched) => {
    if (!infoSearched) {
      // console.log('info searched');
    } else {
      try {
        let response = await axios.get(`${process.env.REACT_APP_CRYPTO_TRACKS_API}/news?q=${infoSearched}`);
        console.log('works', response);
        this.setState({newsResults: response.data});
      } catch (err) {
        console.log(err);
      }
    }
  }


  render() {
    return (
      <>
        <Search handleSearch={this.handleSearch} />
        <News new={this.state.newsResults} />
      </>
    )
  }
}

export default Home;