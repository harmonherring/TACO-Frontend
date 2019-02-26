import React, {Component} from 'react';
import {Container, Row, Col, Button, CustomInput} from 'reactstrap';
import {FaTrash} from 'react-icons/fa';

import './css/tasks.css';

class Clients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name:'',
      target:'',
      port:'',
      chunksize:'',
      tasks:[],
      newTaskName:'',
      newTarget:'',
      newPort:'',
      newChunkSize:'',
      allHTMLContent:[],
    }
  }

  fetchClients = () => {
    console.log("Fetching")
    fetch('https://taco.csh.rit.edu/clients')
    .then(response => response.json())
    .then(jsonresponse => this.appendToState(jsonresponse));
  }

  appendToState = (clients) => {
    let content = [];
    for (let i = 0; i < clients.length; i++) {
      console.log("Appending to State");
      content.push(
        <Row className="property-row">
          <Col xs="3" className="column">{clients[i].name}</Col>
          <Col xs="3" className="column line-column">{clients[i].task_id}</Col>
          <Col xs="1" className="column line-column"><CustomInput onClick={this.switch} type="switch" id={clients[i].id}/></Col>
          <Col xs="3" className="column line-column"><Button onClick={() => {this.deleteClient(clients[i].id)}} size="md" color="danger"><FaTrash size="1.02em" className="trash-icon" /></Button></Col>
        </Row>
      );
    }
    this.setState({allHTMLContent: content});
  }

  switch = (event) => {
    console.log(event.target);
  }

  deleteClient = (uid) => {
    fetch("https://taco.csh.rit.edu/clients/" + uid, {
      method: "DELETE",
    }).then(() => this.fetchClients());
  }

  componentDidMount = () => {
    this.fetchClients();
  }

  render() {
    return(
      <>
      <h1 className="title">Clients</h1>
      <Container className="sections-container">
        <Row className="property-row-titles">
          <Col xs="3" className="column title-row"><strong>Name</strong></Col>
          <Col xs="3" className="column line-column title-row"><strong>Task</strong></Col>
          <Col xs="1" className="column line-column title-row"><strong>Active</strong></Col>
          <Col xs="3" className="column line-column title-row"><strong>Action</strong></Col>
        </Row>
        {this.state.allHTMLContent}
      </Container>
      </>
    );
  }
}

export default Clients;
