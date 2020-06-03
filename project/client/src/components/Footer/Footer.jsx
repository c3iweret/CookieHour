import React, { Component } from "react";
import { Grid } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <Grid fluid>
          <nav className="pull-left">
            <ul>
              <li>
                <a>UofT CSC302</a>
              </li>
              {/* <li>
                <a href="#about">About</a>
              </li> */}
            </ul>
          </nav>
          <p className="footer pull-right">
            &copy; {new Date().getFullYear()}{" "}
            <a href="https://github.com/csc302-spring-2019/proj-CookieHour">CookieHour</a>
          </p>
        </Grid>
      </footer>
    );
  }
}

export default Footer;
