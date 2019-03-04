import React, {Component} from 'react';
import {Container, Row, Col, Button, CustomInput} from 'reactstrap';
import {FaTrash} from 'react-icons/fa';
import Dropdown from 'react-dropdown';
import {Link} from 'react-router-dom';
import Loading from './Loading.js';
import './css/tasks.css';
import './css/dropdown.css';
import loadGIF from './assets/loading.gif';

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
      tasks_list:[],
      loading:true,
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
          <Col xs="3" className="column"><Link to={"clients/edit/" + clients[i].uid} >{clients[i].name}</Link></Col>
          <Col xs="3" className="column line-column"><div className="dropdown-container"><Dropdown options={this.state.tasks_list} onChange={(event) => this.selectTask(event, clients[i].uid)} value={this.getTasksFromList(clients[i].task_id)} /></div></Col>
          <Col xs="3" className="column line-column">{clients[i].last_online}</Col>
          <Col xs="3" className="column line-column"><Button onClick={() => {this.deleteClient(clients[i].uid)}} size="md" color="danger"><FaTrash size="1.02em" className="icon" /></Button></Col>
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

  deleteClient = (uid) => {
    fetch("https://taco.csh.rit.edu/clients/" + uid, {
      method: "DELETE",
    }).then(() => this.fetchClients());
  }

  createTaskDict = (tasks) => {
    let tasks_list = [];
    for (let i = 0; i < tasks.length; i++) {
      tasks_list.push({value:tasks[i]['uid'].toString(), label:tasks[i]['name']});
    }
    this.setState({tasks_list: tasks_list});
  }

  componentDidMount = () => {
    this.setState({loading:true});
    this.fetchTasks()
    .then(() => this.fetchClients())
    .then(() => this.setState({loading:false}));
  }

  render() {
    if (this.state.loading) {
      return (
          <Loading />
        );
    } else {
      return(
        <>
        <h1 className="title">Clients</h1>
        <Container className="sections-container">
          <Row className="property-row-titles">
            <Col xs="3" className="column title-row title-column"><strong>Name</strong></Col>
            <Col xs="3" className="column line-column title-row title-column"><strong>Task</strong></Col>
            <Col xs="3" className="column line-column title-row title-column"><strong>Last Online</strong></Col>
            <Col xs="3" className="column line-column title-row title-column"><strong>Action</strong></Col>
          </Row>
          {this.state.allHTMLContent}
        </Container>
        </>
      );
    }
  }
}

export default Clients;
