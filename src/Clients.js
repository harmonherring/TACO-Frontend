import React, {Component} from 'react';
import {Container, Row, Col, Button, CustomInput} from 'reactstrap';
import {FaTrash} from 'react-icons/fa';
import Dropdown from 'react-dropdown';
import {Link} from 'react-router-dom';

import './css/tasks.css';
import './css/dropdown.css';

const test = [{value: 'one', label:'One'}, {value:'two', label:'Two'}];

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
      tasks_dict:{},
      tasks_list:[],
      test: ['penis', 'other', 'maybe'],
    }
  }

  fetchClients = () => {
    return fetch('https://taco.csh.rit.edu/clients')
    .then(response => response.json())
    .then(jsonresponse => this.appendToState(jsonresponse));
  }

  fetchTasks = () => {
    return fetch('https://taco.csh.rit.edu/tasks')
    .then(response => response.json())
    .then(jsonresponse => this.createTaskDict(jsonresponse));
  }

  appendToState = (clients) => {
    let content = [];
    for (let i = 0; i < clients.length; i++) {
      content.push(
        <Row className="property-row">
          <Col xs="3" className="column"><Link to={"clients/edit/" + clients[i].id} >{clients[i].name}</Link></Col>
          <Col xs="3" className="column line-column"><div className="dropdown-container"><Dropdown options={this.state.tasks_list} onChange={(event) => this.selectTask(event, clients[i].id)} value={this.getTasksFromList(clients[i].task_id)} /></div></Col>
          <Col xs="1" className="column line-column"><CustomInput onChange={() => this.toggleActivity(clients[i].id)} type="switch" id={clients[i].id} checked={clients[i].active ? "checked" : ""}/></Col>
          <Col xs="3" className="column line-column"><Button onClick={() => {this.deleteClient(clients[i].id)}} size="md" color="danger"><FaTrash size="1.02em" className="icon" /></Button></Col>
        </Row>
      );
    }
    this.setState({allHTMLContent: content});
  }

  selectTask = (event, id) => {
    fetch("https://taco.csh.rit.edu/clients/" + id + "?task_id=" + event.value, {
      method:"PUT",
    });
  }

  getTasksFromList = (task_id) => {
    for (let i = 0; i < this.state.tasks_list.length; i++) {
      if (this.state.tasks_list[i].value == task_id) {
        return this.state.tasks_list[i];
      }
    }
  }

  toggleActivity = (uid) => {
    fetch("https://taco.csh.rit.edu/clients/"+uid+"/toggle", {
      method: "PUT",
    }).then(() => this.fetchClients());
  }

  deleteClient = (uid) => {
    fetch("https://taco.csh.rit.edu/clients/" + uid, {
      method: "DELETE",
    }).then(() => this.fetchClients());
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

  componentDidMount = () => {
    this.fetchTasks().then(() => this.fetchClients());
  }

  render() {
    return(
      <>
      <h1 className="title">Clients</h1>
      <Container className="sections-container">
        <Row className="property-row-titles">
          <Col xs="3" className="column title-row title-column"><strong>Name</strong></Col>
          <Col xs="3" className="column line-column title-row title-column"><strong>Task</strong></Col>
          <Col xs="1" className="column line-column title-row title-column"><strong>Active</strong></Col>
          <Col xs="3" className="column line-column title-row title-column"><strong>Action</strong></Col>
        </Row>
        {this.state.allHTMLContent}
      </Container>
      </>
    );
  }
}

export default Clients;
