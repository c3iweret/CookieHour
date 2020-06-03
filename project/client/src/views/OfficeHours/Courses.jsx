import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';

export class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        userStatus: ""
    };
    this.getUser = this.getUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  render() {
    const pathname = (this.state.userStatus === "teacher") ? "/teacher/officehours" : "/student/officehours" ;
    return (
      <div className="card card-stats">
        <LinkContainer
          to={{
            pathname: pathname,
            state: this.props.courseCode
          }}
        >
          <div className="content">
            <Row>
              <Col xs={5}>
                <div className="icon-big text-center icon-warning">
                  {this.props.bigIcon}
                </div>
              </Col>
              <Col xs={7}>
                <div className="courseCode">
                  <p>{this.props.course}</p>
                  {this.props.courseCode.toUpperCase()}
                </div>
              </Col>
            </Row>
            <div className="footer">
              <hr />
              <div className="stats">
                {this.props.icon} {this.props.iconText}
              </div>
            </div>
          </div>
        </LinkContainer>
      </div>
    );
  }

  async getUser() {
    const user = await axios.get('/user');
    this.setState({ userStatus: user.data });
  }
}

export default Courses;
