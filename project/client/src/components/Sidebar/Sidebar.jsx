import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import HeaderLinks from "../Header/HeaderLinks.jsx";
import imagine from "../../assets/images/sidebar-5.jpg";
import logo from "../../assets/images/temp-logo.png";
import appRoutes from "../../routes/app.jsx";
import axios from 'axios';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userProfile: "",
      width: window.innerWidth
    };
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    this.updateDimensions();
    if (this.state.userProfile === "") {
      this.getCurrentUser(); }
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  render() {
    const sidebarBackground = {
      backgroundImage: "url(" + imagine + ")"
    };
    return (
      <div id="sidebar" className="sidebar" data-color="black" data-image={imagine}>
        <div className="sidebar-background" style={sidebarBackground} />
        <div className="logo">
          <a className="simple-text logo-mini">
            <div className="logo-img">
              <img src={logo} alt="logo_image" />
            </div>
          </a>
          <a className="simple-text logo-normal">
            CookieHour{/* {this.getName()} */}
          </a>
        </div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            {this.state.width <= 991 ? <HeaderLinks /> : null}
            {appRoutes.map((prop, key) => {
              if (prop.name !== "Office Hours") {
                if (this.state.userProfile === "teacher" && prop.user === "teacher" || 
                  this.state.userProfile === "student" && prop.user === "student") {
                  return (
                    <li className={this.activeRoute(prop.path)} key={key}>
                      <NavLink to={prop.path} className="nav-link" activeClassName="active">
                        <i className={prop.icon} />
                        <p>{prop.name}</p>
                      </NavLink>
                    </li>
                  );
                }
              }
              return null;
            })}
          </ul>
        </div>
      </div>
    );
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
}

export default Sidebar;
