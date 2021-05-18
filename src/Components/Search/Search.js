import React from "react";
import { Form, Button, Container } from "react-bootstrap";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleSearch(this.textInput.current.value);
  };

  render() {
    return (
      <Container fluid>
        <Form style={{ margin: "60px 0px" }} onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Search for Crypto</Form.Label>
            <Form.Control
              placeholder="Enter Symbol or Name..."
              size="lg"
              type="text"
              ref={this.textInput}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Form>
      </Container>
    );
  }
}

export default Search;
