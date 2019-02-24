import React, {Component} from 'react';
import {Container, Row, Col, Input, Button} from 'reactstrap';

import './css/addtask.css';

class AddTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      target: '',
      size: '',
    }
  }

  render() {
    return(
      <>
        <h1 className="title">Add Task</h1>
        <Container className="sections-container">
          <Row className="property-row-titles">
            <Col xs="6" className="column"><strong>Property</strong></Col>
            <Col xs="6" className="second-column column"><strong>Value</strong></Col>
          </Row>
          <Row className="property-row">
            <Col xs="6" className="column">Name:</Col>
            <Col xs="6" className="column second-column input-column">
              <Input placeholder="Name" />
            </Col>
          </Row>
          <Row className="property-row">
            <Col xs="6" className="column">Target:</Col>
            <Col xs="6" className="column second-column input-column">
              <Input placeholder="127.0.0.1" />
            </Col>
          </Row>
          <Row className="property-row">
            <Col xs="6" className="column">Chunk Size:</Col>
            <Col xs="6" className="column second-column input-column">
              <Input placeholder="10000" />
            </Col>
          </Row>
          <Row className="submit-row">
            <Col xs="12" className="submit-column">
              <Button color="success">Submit</Button>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default AddTask;
