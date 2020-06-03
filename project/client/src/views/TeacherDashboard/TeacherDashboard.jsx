import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import Courses from "../OfficeHours/Courses";
import axios from 'axios';
import AddCourseForm from '../Modals/AddCourseForm';


class TeacherDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      showForm: false,
      courses: []
    };
    this.addClass = this.addClass.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  render() {
    let modalClose = () => this.setState({ showForm: false });
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
      <div className="TeacherDashboard content" key={this.props.key}>
        <Grid fluid>
          <Row>
            {renderedOutput}
          </Row>
        </Grid>
        <button className="index-button" onClick={this.addClass}> Add Class</button>

        <AddCourseForm
          show = { this.state.showForm }
          onHide = { modalClose }
        />
      </div>
    );
  }

  async getCurrentUser() {
    const user =  await axios.get('/teacher/profile');
    this.setState({ user: user.data });
    this.populateClasses();
  }

  addClass(){
    this.setState({showForm: true});
  }

  async populateClasses(){
    const courses =  await axios.get('/courses/');
    var courseCodes = []
    for(let course in courses.data){
      let val = courses.data[course];
      courseCodes.push(val.code);

    }
    if(this.state.user) {
      this.setState({ courses: courseCodes });
    }
  }
}

export default TeacherDashboard;
