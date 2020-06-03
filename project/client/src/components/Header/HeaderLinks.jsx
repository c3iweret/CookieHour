import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';

class HeaderLinks extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      user: null,
      userProfile: ""
    };
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  // set user profile (teacher or student) and get the user obj
  async getCurrentUser() {
    await axios.get('/user')
      .then( res => {
        const userProfile = res.data; 
        this.setState({ userProfile });
        if (this.state.userProfile === "student") {
            var url = '/student/profile';
        } else {
            var url = '/teacher/profile';
        }
        if (!this.state.user) {
            axios.get(url)
                .then( res => {
                    const user = res.data;
                    this.setState({ user });
                })
                .catch(err => {
                    console.log(err);
                })
        }
      })
      .catch(err => {
        console.log(err);
      })
}

  componentDidMount() {
    if (this.state.userProfile === "")
            this.getCurrentUser();
  }

  render() {
    const notification = (
      <div>
        <i className="fa fa-globe" />
        <b className="caret" />
        <span className="notification">5</span>
        <p className="hidden-lg hidden-md">Notification</p>
      </div>
    );
    return (
      <div>
        <Nav>
          <NavItem eventKey={1} href="#">
            <i className="fa fa-dashboard" />
            <p className="hidden-lg hidden-md">Dashboard</p>
          </NavItem>
          <NavDropdown eventKey={2} title={notification} noCaret id="basic-nav-dropdown">
            <MenuItem eventKey={2.1}>Notification 1</MenuItem>
            <MenuItem eventKey={2.2}>Notification 2</MenuItem>
            <MenuItem eventKey={2.3}>Notification 3</MenuItem>
            <MenuItem eventKey={2.4}>Notification 4</MenuItem>
            <MenuItem eventKey={2.5}>Another notifications</MenuItem>
          </NavDropdown>
          <NavItem eventKey={3} href="#">
            <i className="fa fa-search" />
            <p className="hidden-lg hidden-md">Search</p>
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={1} href="#">
            {this.getName()}
          </NavItem>
          <NavDropdown eventKey={2} title="Dropdown" id="basic-nav-dropdown-right">
            <MenuItem eventKey={2.1}>Action</MenuItem>
            <MenuItem eventKey={2.2}>Another action</MenuItem>
            <MenuItem eventKey={2.3}>Something</MenuItem>
            <MenuItem eventKey={2.4}>Another action</MenuItem>
            <MenuItem eventKey={2.5}>Something</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={2.5}>Separated link</MenuItem>
          </NavDropdown>
          <LinkContainer to="/">
            <NavItem eventKey={3}>
              <i className="fa fa-sign-out" />
              <p className="hidden-lg hidden-md">Logout</p>
            </NavItem>
          </LinkContainer>
        </Nav>
      </div>
    );
  }

  getName(){
    if(this.state.user){
      return this.state.user.name;
    }
  }
}

export default HeaderLinks;
