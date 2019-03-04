import React, {Component} from 'react';
import {Container, Row, Col, Input, Button, CustomInput} from 'reactstrap';
import {FaCheck, FaTrash} from 'react-icons/fa';
import Tasks from './Tasks.js';
import {Link, Route} from 'react-router-dom';
import Loading from './Loading.js';
import Dropdown from 'react-dropdown';

import './css/edit.css';

const AttackTypes = [
  {value:"Ping_Flood", label:"Ping Flood"},
  {value:"Ping_Of_Death", label:"Ping of Death"},
  {value:"DNS_Amplification", label:"DNS Amplification"},
  {value:"HTTP_Flood", label:"HTTP Flood"},
];

class EditTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uid:'',
      name:'',
      chunksize:0,
      target:'',
      port:0,
      active:0,
      attack_type:'',
      loading:false,
    }
  }

  componentDidMount = () => {
    this.setState({loading:true});
    this.fetchData(this.getActiveElement())
    .then(() => this.setState({loading:false}));
  }

  getActiveElement = () => {
    let element = window.location.href.split("/");
    element = element[element.length-1];
    return element;
  }

  fetchData = (currentId) => {
    return fetch("https://taco.csh.rit.edu/tasks/" + currentId)
    .then(response => response.json())
    .then(jsonresponse => this.getAttributes(jsonresponse[0]))
  }

  getAttributes = (data) => {
    this.setState({
      uid:data.uid,
      name:data.name,
      chunksize:data.chunksize,
      target:data.target,
      port:data.port,
      active:data.active,
      attack_type:data.attack_type,
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
    fetch("https://taco.csh.rit.edu/tasks/" + this.state.uid +
          "?name=" + this.state.name +
          "&target=" + this.state.target +
          "&port=" + this.state.port +
          "&chunksize=" + this.state.chunksize, {
            method:"PUT",
          }).then(() => history.push('/tasks'));
  }

  toggleActivity = () => {
    fetch("https://taco.csh.rit.edu/tasks/"+this.state.uid+"/toggle", {
      method: "PUT",
    }).then(() => this.fetchData(this.state.uid));
  }

  deleteTask = (history) => {
    fetch("https://taco.csh.rit.edu/tasks/" + this.state.id, {
      method:"DELETE",
    }).then(() => history.push('/tasks'));
  }

  updateAttackType = (new_attack) => {
    fetch("http://localhost:5000/tasks/" + this.state.uid
          + "?attack_type=" + new_attack, {
            method:"PUT",
          });
  }

  render() {
    if (this.state.loading) {
      return(<Loading />);
    } else {
      return (
        <>
        <h1 className="title">Viewing Task "{this.state.name}"</h1>
        <Container className="sections-container">
          <Row className="first-row">
            <Col xs="6"><strong>Task ID</strong></Col>
            <Col xs="6" className="second-column">{this.state.uid}</Col>
          </Row>
          <Row className="nth-row">
            <Col xs="6"><strong>Name</strong></Col>
            <Col xs="6" className="second-column"><Input onChange={this.updateName} value={this.state.name} placeholder="Name" className="input-row"/></Col>
          </Row>
          <Row className="nth-row">
            <Col xs="6"><strong>Active</strong></Col>
            <Col xs="6" className="second-column"><CustomInput onChange={this.toggleActivity} type="switch" id="activeSwitch" checked={this.state.active ? "checked" : "" }/></Col>
          </Row>
          <Row className="nth-row">
            <Col xs="6"><strong>Attack Type</strong></Col>
            <Col xs="3" className="column line-column"><Dropdown options={AttackTypes} onChange={(event) => this.updateAttackType(event.value)} value={this.state.attack_type} /></Col>
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
}

export default EditTask;
