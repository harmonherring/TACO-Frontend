import React, {Component} from 'react';
import {Container, Row, Col, Button, Input, CustomInput} from 'reactstrap';
import {FaSave, FaTrash} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import Loading from './Loading.js';

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
      newActivity: 0,
      allHTMLContent:[],
      loading:false,
    }
  }

  fetchTasks = () => {
    return fetch('https://taco.csh.rit.edu/tasks')
    .then(response => response.json())
    .then(jsonresponse => this.appendToState(jsonresponse));
  }

  appendToState = (tasks) => {
    let content = [];
    for (let i = 0; i < tasks.length; i++) {
      content.push(
        <Row key={tasks[i].uid} className="property-row">
          <Col xs="3" className="column"><Link to={"tasks/edit/" + tasks[i].uid} >{tasks[i].name}</Link></Col>
          <Col xs="1" className="column line-column"><CustomInput onClick={() => this.updateActivity(tasks[i].uid)} type="switch" id={tasks[i].uid} checked={tasks[i].active ? "checked" : ""}/></Col>
          <Col xs="3" className="column line-column">{tasks[i].target}</Col>
          <Col xs="1" className="column line-column">{tasks[i].port}</Col>
          <Col xs="2" className="column line-column">{tasks[i].chunksize}</Col>
          <Col xs="2" className="column line-column"><Button onClick={() => {this.deleteTask(tasks[i].uid)}} size="md" color="danger"><FaTrash size="1.02em" className="icon" /></Button></Col>
        </Row>
      );
    }
    this.setState({allHTMLContent: content});
  }

  componentDidMount = () => {
    this.setState({loading:true});
    this.fetchTasks()
    .then(() => this.setState({loading:false}));
  }

  updateName = (event) => {
    this.setState({
      newTaskName: event.target.value,
    });
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

  updateActivity = (uid) => {
    if (uid) {
      fetch("https://taco.csh.rit.edu/tasks/"+uid+"/toggle", {
        method: "PUT",
      }).then(() => this.fetchTasks());
    } else {
      this.setState({
        newActivity: this.state.newActivity ? 0 : 1,
      });
    }
  }

  createTask = () => {
    if (this.state.newPort &&
        this.state.newTarget &&
        this.state.newTaskName &&
        this.state.newChunkSize) {
          fetch("https://taco.csh.rit.edu/tasks?name="
                + this.state.newTaskName + "&target="
                + this.state.newTarget + "&port="
                + this.state.newPort + "&chunksize="
                + this.state.newChunkSize + "&active="
                + this.state.newActivity, {
            method: "PUT",
          }).then(() => this.fetchTasks());

          this.setState({
            newPort:'',
            newTarget:'',
            newTaskName:'',
            newChunkSize:'',
            newActivity: 0,
          });
    }
  }

  deleteTask = (uid) => {
    fetch("https://taco.csh.rit.edu/tasks/" + uid, {
      method: "DELETE",
    }).then(() => this.fetchTasks());
  }

  render() {
    if (this.state.loading) {
      return(<Loading />);
    } else {
      return (
        <>
        <h1 className="title">Tasks</h1>
        <Container className="sections-container">
          <Row className="property-row-titles">
            <Col xs="3" className="column title-row"><strong>Name</strong></Col>
            <Col xs="1" className="column line-column title-row"><strong>Active</strong></Col>
            <Col xs="3" className="column line-column title-row"><strong>Target</strong></Col>
            <Col xs="1" className="column line-column title-row"><strong>Port</strong></Col>
            <Col xs="2" className="column line-column title-row"><strong>Chunk Size</strong></Col>
            <Col xs="2" className="column line-column title-row"><strong>Action</strong></Col>
          </Row>
          {this.state.allHTMLContent}
          <Row className="additions-row">
            <Col xs="3" className="column title-row"><Input className="input-row" placeholder="Name" value={this.state.newTaskName} onChange={this.updateName}/></Col>
            <Col xs="1" className="column line-column title-row"><CustomInput onClick={() => this.updateActivity()} type="switch" id="newActivity" checked={this.state.newActivity ? "checked" : ""}/></Col>
            <Col xs="3" className="column line-column title-row"><Input className="input-row" placeholder="127.0.0.1" value={this.state.newTarget} onChange={this.updateTarget}/></Col>
            <Col xs="1" className="column line-column title-row"><Input className="input-row" placeholder="80" value={this.state.newPort} onChange={this.updatePort}/></Col>
            <Col xs="2" className="column line-column title-row"><Input className="input-row" placeholder="10000" value={this.state.newChunkSize} onChange={this.updateChunk}/></Col>
            <Col xs="2" className="column line-column title-row"><Button color="success" onClick={this.createTask} className="submit-button"><FaSave className="icon" size="1.02em"/></Button></Col>
          </Row>
        </Container>
        </>
      );
    }
  }
}

export default Tasks;
