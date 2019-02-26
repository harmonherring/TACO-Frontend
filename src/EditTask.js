import React, {Component} from 'react';
import {Container, Row, Col, Input, Button} from 'reactstrap';
import {FaCheck, FaTrash} from 'react-icons/fa';
import Tasks from './Tasks.js';
import {Link, Route} from 'react-router-dom';

import './css/edit.css';

class EditTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id:'',
      name:'fds',
    }
  }

  componentDidMount = () => {
    // Get the active task
    this.fetchData(this.getActiveElement());
  }

  getActiveElement = () => {
    let element = window.location.href.split("/");
    element = element[element.length-1];
    return element;
  }

  fetchData = (currentId) => {
    fetch("https://taco.csh.rit.edu/tasks/" + currentId)
    .then(response => response.json())
    .then(jsonresponse => this.getAttributes(jsonresponse[0]))
  }

  getAttributes = (data) => {
    console.log(data);
    this.setState({
      id:data.id,
      name:data.name,
      chunksize:data.chunksize,
      target:data.target,
      port:data.port,
    });
  }

  updateName = (event) => {
    this.setState({
      name:event.target.value,
    });
  }

  updateTarget = (event) => {
    this.setState({
      target:event.target.value,
    });
  }

  updatePort = (event) => {
    this.setState({
      port:event.target.value,
    });
  }

  updateChunksize = (event) => {
    this.setState({
      chunksize:event.target.value,
    });
  }

  updateTask = (history) => {
    fetch("https://taco.csh.rit.edu/tasks/" + this.state.id +
          "?name=" + this.state.name +
          "&target=" + this.state.target +
          "&port=" + this.state.port +
          "&chunksize=" + this.state.chunksize, {
            method:"PUT",
          }).then(() => history.push('/tasks'));
  }

  deleteTask = (history) => {
    fetch("https://taco.csh.rit.edu/tasks/" + this.state.id, {
      method:"DELETE",
    }).then(() => history.push('/tasks'));
  }

  render() {
    return(
      <>
      <h1 className="title">Viewing Task "{this.state.name}"</h1>
      <Container className="sections-container">
        <Row className="first-row">
          <Col xs="6"><strong>Task ID</strong></Col>
          <Col xs="6" className="second-column">{this.state.id}</Col>
        </Row>
        <Row className="nth-row">
          <Col xs="6"><strong>Name</strong></Col>
          <Col xs="6" className="second-column"><Input onChange={this.updateName} value={this.state.name} placeholder="Name" className="input-row"/></Col>
        </Row>
        <Row className="nth-row">
          <Col xs="6"><strong>Target</strong></Col>
          <Col xs="6" className="second-column"><Input onChange={this.updateTarget} value={this.state.target} placeholder="Target" className="input-row"/></Col>
        </Row>
        <Row className="nth-row">
          <Col xs="6"><strong>Port</strong></Col>
          <Col xs="6" className="second-column"><Input onChange={this.updatePort} value={this.state.port} placeholder="Port" className="input-row"/></Col>
        </Row>
        <Row className="nth-row">
          <Col xs="6"><strong>Chunk Size</strong></Col>
          <Col xs="6" className="second-column"><Input onChange={this.updateChunksize} value={this.state.chunksize} placeholder="Chunksize" className="input-row"/></Col>
        </Row>
        <Row className="nth-row">
          <Col xs="6"><strong>Actions</strong></Col>
          <Col xs="6" className="second-column">
            <Route render={({history}) => (
              <>
              <Button className="action-button"
                      color="success"
                      onClick={() => {this.updateTask(history); }}>
                  <FaCheck className="icon" />
              </Button>
              <Button className="action-button"
                      onClick={() => this.deleteTask(history)}
                      color="danger">
                <FaTrash className="icon" />
              </Button>
              </>
            )} />
          </Col>
        </Row>
      </Container>
      </>
    );
  }
}

export default EditTask;
