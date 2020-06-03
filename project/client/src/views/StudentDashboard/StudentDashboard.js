import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Courses from "../OfficeHours/Courses";
import axios from 'axios';


class StudentDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      courses: [],
      showForm: false
    };
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  render() {
    // let modalClose = () => this.setState({ showForm: false });
    var colours = ["text-warning", "text-success", "text-danger", "text-info", "text-muted"];
    var renderedOutput = this.state.courses.map(course =>
      <Col lg={3} sm={6}>
        <Courses
          bigIcon={<i className={"pe-7s-notebook " + colours[Math.floor(Math.random() * 4)]} />}
          course="course"
          courseCode={course}
          icon={<i className="fa fa-arrow-circle-up" />}
          iconText="Show Office Hours"
        />
      </Col>);

    return (
      <div className="StudentDashboard content" key={this.props.key}>
        <Grid fluid>
          <Row>
            {renderedOutput}
          </Row>
        </Grid>
      </div>
    );
  }

  // get the student user
  async getCurrentUser() {
    const user =  await axios.get('/student/profile');
    this.setState({ user: user.data });

    // set the courses enrolled by student
    this.setState({ courses: user.data.classesEnrolled });
  }
}

export default StudentDashboard;
