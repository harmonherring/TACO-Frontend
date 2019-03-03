import React, {Component} from "react";
import {NavLink as RRNavLink, Link, Route, BrowserRouter} from 'react-router-dom';
import Clients from './Clients.js';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavLink,
    NavItem,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';



export class Navigation extends Component {
    constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }

    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    render() {
      return (
        <Navbar color="light" light expand="md">
        <NavbarBrand to="/" tag={RRNavLink}><strong>T&#183;A&#183;C&#183;O</strong></NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Clients
              </DropdownToggle>
              <DropdownMenu>
                <NavItem>
                  <NavLink to='/clients' tag={RRNavLink} active={window.location.hash === '/clients'}>All Clients</NavLink>
                </NavItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Tasks
              </DropdownToggle>
              <DropdownMenu>
                <NavItem>
                  <NavLink to='/tasks' tag={RRNavLink} active={window.location.hash === '/tasks'}>All Tasks</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to='/tasks/add' tag={RRNavLink} active={window.location.hash === '/tasks/add'}>Add Task</NavLink>
                </NavItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
      );
    }
  }

export default Navigation;
