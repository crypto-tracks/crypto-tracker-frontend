import React from 'react';
import { Form, Button} from 'react-bootstrap';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleSearch(this.textInput.current.value);
  }

render() {
  return (
   <Form onSubmit={this.handleSubmit}>
     <Form.Group>
       <Form.Label>Search for Crypto</Form.Label>
       <Form.Control placeholder="Enter Symbol or Name..." size="lg" type="text" ref={this.textInput} />
     </Form.Group>
     <Button variant="primary" type="submit">
       Search
     </Button>
   </Form>
  );
}
}

export default Search;