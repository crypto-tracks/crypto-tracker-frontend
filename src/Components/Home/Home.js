import React from 'react';
import axios from 'axios';
import Search from '../Search/Search';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      haveSearched: false,
      infoSearched: ''
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
        let response = await axios.get(`https://www.google.com/search?q=${infoSearched}`);
        console.log('works', response);
      } catch (err) {
        console.log(err);
      }
    }
  }


  render() {
    return (
      <>
        <Search handleSearch={this.handleSearch} />
      </>
    )
  }
}

export default Home;