import React, { Component } from "react";
import { Form, Button, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import { withAuth0 } from "@auth0/auth0-react";

import './Search.css';

// Largely Based on https://www.digitalocean.com/community/tutorials/react-react-autocomplete
class Search extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };

  static defaultProps = {
    suggestions: []
  };

  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      // The active selection's index
      activeSuggestion: 0,
      // The suggestions that match the user's input
      filteredSuggestions: [],
      // Whether or not the suggestion list is shown
      showSuggestions: false,
      // What the user has entered
      userInput: ""
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleSearch(this.textInput.current.value);
  };

  onChange = e => {
    const { suggestions } = this.props;
    const userInput = this.textInput.current.value;

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const { isAuthenticated } = this.props.auth0;
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul className="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                className = "suggestion-active";
              }

              return (
                <li className={className} key={index} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div className="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
      }
    }

    return (
      <Container fluid>
        <Form style={{ margin: "10vh 0px" }} onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label style={{ fontSize: '20px'}}>Search for Crypto</Form.Label>
            <Form.Control
              placeholder="Enter Symbol or Name..."
              size="lg"
              type="text"
              ref={this.textInput}
              onChange={onChange}
              onKeyDown={onKeyDown}
              value={userInput}
            />
            {suggestionsListComponent}
          </Form.Group>
          <Button style={{margin: '10px 10px'}} variant="primary" type="submit">
            Search
          </Button>
          { this.props.haveSearched && isAuthenticated ? <Button style={{margin: '10px 10px'}} variant="primary" onClick={() => this.props.addUserCoin(this.props.activeCoin)}>Add Coin</Button> : ''}
        </Form>
      </Container>
    );
  }
}
      
export default withAuth0(Search);
