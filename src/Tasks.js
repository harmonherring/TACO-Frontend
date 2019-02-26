import React, {Component} from 'react';
import {Container, Row, Col, Button, Input} from 'reactstrap';
import {FaSave, FaTrash} from 'react-icons/fa';

import './css/tasks.css'

class Tasks extends Component {
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

  fetchTasks = () => {
    console.log("Fetching")
    fetch('https://taco.csh.rit.edu/tasks')
    .then(response => response.json())
    .then(jsonresponse => this.appendToState(jsonresponse));
  }

  appendToState = (tasks) => {
    let content = [];
    for (let i = 0; i < tasks.length; i++) {
      console.log("Appending to State");
      content.push(
        <Row key={tasks[i].id} className="property-row">
          <Col xs="3" className="column">{tasks[i].name}</Col>
          <Col xs="3" className="column line-column">{tasks[i].target}</Col>
          <Col xs="2" className="column line-column">{tasks[i].port}</Col>
          <Col xs="2" className="column line-column">{tasks[i].chunksize}</Col>
          <Col xs="2" className="column line-column"><Button onClick={() => {this.deleteTask(tasks[i].id)}} size="md" color="danger"><FaTrash size="1.02em" className="trash-icon" /></Button></Col>
        </Row>
      );
    }
    this.setState({allHTMLContent: content});
  }

  componentDidMount = () => {
    this.fetchTasks();
  }

  updateName = (event) => {
    this.setState({
      newTaskName: event.target.value,
    });
    console.log(event);
  }

  updateTarget = (event) => {
    this.setState({
      newTarget: event.target.value,
    });
  }

  updatePort = (event) => {
    this.setState({
      newPort: event.target.value,
    });
  }

  updateChunk = (event) => {
    this.setState({
      newChunkSize: event.target.value,
    });
  }

  createTask = () => {
    console.log("Create Task")
    if (this.state.newPort &&
        this.state.newTarget &&
        this.state.newTaskName &&
        this.state.newChunkSize) {
          fetch("https://taco.csh.rit.edu/tasks?name="
                + this.state.newTaskName + "&target="
                + this.state.newTarget + "&port="
                + this.state.newPort + "&chunksize="
                + this.state.newChunkSize + "&", {
            method: "PUT",
          }).then(() => this.fetchTasks());

          this.setState({
            newPort:'',
            newTarget:'',
            newTaskName:'',
            newChunkSize:'',
          });
    }
  }

  deleteTask = (uid) => {
    fetch("https://taco.csh.rit.edu/tasks/" + uid, {
      method: "DELETE",
    }).then(() => this.fetchTasks());
  }

  render() {
    return(
      <>
      <h1 className="title">Tasks</h1>
      <Container className="sections-container">
        <Row className="property-row-titles">
          <Col xs="3" className="column title-row"><strong>Name</strong></Col>
          <Col xs="3" className="column line-column title-row"><strong>Target</strong></Col>
          <Col xs="2" className="column line-column title-row"><strong>Port</strong></Col>
          <Col xs="2" className="column line-column title-row"><strong>Chunk Size</strong></Col>
          <Col xs="2" className="column line-column title-row"><strong>Action</strong></Col>
        </Row>
        {this.state.allHTMLContent}
        <Row className="additions-row">
          <Col xs="3" className="column title-row"><Input className="input-row" placeholder="Name" value={this.state.newTaskName} onChange={this.updateName}/></Col>
          <Col xs="3" className="column line-column title-row"><Input className="input-row" placeholder="127.0.0.1" value={this.state.newTarget} onChange={this.updateTarget}/></Col>
          <Col xs="2" className="column line-column title-row"><Input className="input-row" placeholder="80" value={this.state.newPort} onChange={this.updatePort}/></Col>
          <Col xs="2" className="column line-column title-row"><Input className="input-row" placeholder="10000" value={this.state.newChunkSize} onChange={this.updateChunk}/></Col>
          <Col xs="2" className="column line-column title-row"><Button color="success" onClick={this.createTask}><FaSave /></Button></Col>
        </Row>
      </Container>
      </>
    );
  }
}

export default Tasks;
