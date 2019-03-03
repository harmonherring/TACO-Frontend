import React, {Component} from 'react';
import Dropdown from 'react-dropdown';
import {Container, Row, Col, Input, Button, CustomInput} from 'reactstrap';
import {FaCheck, FaTrash} from 'react-icons/fa';
import {Route} from 'react-router-dom';
import Loading from './Loading.js';

import './css/edit.css'

class EditClient extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id:'',
      name:'',
      active:0,
      task_id:'',
      last_online:'',
      tasks_list:[],
      loading:false,
    }
  }

  componentDidMount = () => {
    this.setState({loading:true});
    this.fetchTasks()
    .then(() => this.fetchData(this.getActiveElement()))
    .then(() => this.setState({loading:false}));
  }

  getActiveElement = () => {
    let element = window.location.href.split("/");
    element = element[element.length-1];
    return element;
  }

  fetchData = (currentId) => {
    return fetch("https://taco.csh.rit.edu/clients/" + currentId)
    .then(response => response.json())
    .then(jsonresponse => this.getAttributes(jsonresponse))
  }

  fetchTasks = () => {
    return fetch('https://taco.csh.rit.edu/tasks')
    .then(response => response.json())
    .then(jsonresponse => this.createTaskDict(jsonresponse));
  }

  getAttributes = (data) => {
    this.setState({
      id:data.id,
      name:data.name,
      task_id:data.task_id,
      active:data.active,
      last_online:data.last_online,
    });
  }

  updateName = (event) => {
    this.setState({
      name:event.target.value,
    });
  }

  toggleActivity = () => {
    fetch("https://taco.csh.rit.edu/clients/"+this.state.id+"/toggle", {
      method: "PUT",
    }).then(() => this.fetchData(this.state.id));
  }

  updateClient = (history) => {
    fetch("https://taco.csh.rit.edu/clients/" + this.state.id +
          "?name=" + this.state.name, {
            method:"PUT",
          }).then(() => history.push('/clients'));
  }

  deleteClient = (history) => {
    fetch("https://taco.csh.rit.edu/clients/" + this.state.id
          + "?name=" + this.state.name, {
      method:"DELETE",
    }).then(() => history.push('/clients'));
  }

  getTasksFromList = (task_id) => {
    for (let i = 0; i < this.state.tasks_list.length; i++) {
      if (this.state.tasks_list[i].value == task_id) {
        return this.state.tasks_list[i];
      }
    }
  }

  createTaskDict = (tasks) => {
    let tasks_dict = {};
    let tasks_list = [];
    for (let i = 0; i < tasks.length; i++) {
      tasks_dict[tasks[i]['id']] = tasks[i]['name'];
      tasks_list.push({value:tasks[i]['id'].toString(), label:tasks[i]['name']});
    }
    this.setState({tasks_dict: tasks_dict, tasks_list: tasks_list});
  }

  selectTask = (event) => {
    fetch("https://taco.csh.rit.edu/clients/" + this.state.id + "?task_id=" + event.value, {
      method:"PUT",
    });
  }

  render() {
    if (this.state.loading) {
      return(<Loading />);
    } else {
      return (
        <>
        <h1 className="title">Viewing Client "{this.state.name}"</h1>
        <Container className="sections-container">
          <Row className="first-row">
            <Col xs="6"><strong>Client ID</strong></Col>
            <Col xs="6" className="second-column">{this.state.id}</Col>
          </Row>
          <Row className="nth-row">
            <Col xs="6"><strong>Name</strong></Col>
            <Col xs="6" className="second-column"><Input onChange={this.updateName} value={this.state.name} placeholder="Name" className="input-row"/></Col>
          </Row>
          <Row className="nth-row">
            <Col xs="6"><strong>Task</strong></Col>
            <Col xs="6" className="second-column"><Dropdown options={this.state.tasks_list} onChange={this.selectTask} value={this.getTasksFromList(this.state.task_id)} /></Col>
          </Row>
          <Row className="nth-row">
            <Col xs="6"><strong>Active</strong></Col>
            <Col xs="6" className="second-column"><CustomInput onChange={this.toggleActivity} type="switch" id="activeSwitch" checked={this.state.active ? "checked" : "" }/></Col>
          </Row>
          <Row className="nth-row">
            <Col xs="6"><strong>Last Online</strong></Col>
            <Col xs="6" className="second-column">{this.state.last_online}</Col>
          </Row>
          <Row className="nth-row">
            <Col xs="6"><strong>Actions</strong></Col>
            <Col xs="6" className="second-column">
              <Route render={({history}) => (
                <>
                <Button className="action-button"
                        color="success"
                        onClick={() => {this.updateClient(history); }}>
                    <FaCheck className="icon" />
                </Button>
                <Button className="action-button"
                        onClick={() => this.deleteClient(history)}
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
}

export default EditClient;
