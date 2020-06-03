import React, { Component } from 'react';
import { Modal, Button, Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import '../../assets/css/modal.css';

class AddCourseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courseCode: "",
      courseName: "",
      sessionYear: "",
      sessionSemester : "",
      classList: null,
      fileLoaded: 0

    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    }


  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        centered="true"
      >
        <form id='overlayForm' name='createHike' onSubmit={this.handleSubmit} encType="multipart/form-data">
          <Modal.Header closeButton>
            <Modal.Title>
              Create A Course
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Grid fluid>
              <Row className="modalRow">
                <Col lg={6} sm={6}>
                  <label className="label"> Course Code: </label>
                  <input className='overlay-field' type='text' placeholder='ex. CSC302' name='courseCode' required
                    onChange={this.handleChange} />
                </Col>
                <Col lg={6} sm={6}>
                  <label className="label"> Session: </label>
                  <input className='overlay-field' type='text' placeholder='YYYY-YYYY' name='sessionYear' required
                    onChange={this.handleChange} />
                </Col>
              </Row>
              <Row className="modalRow">
                <Col lg={6} sm={6}>
                  <label className="label"> Course Name: </label>
                  <input className='overlay-field' type='text' placeholder='course name' name='courseName' required
                    onChange={this.handleChange} />
                </Col>
                <Col lg={6} sm={6}>
                <label className="label"> Semester: </label>
                  <input className='overlay-field' type='text' placeholder='semester' name='sessionSemester' required
                    onChange={this.handleChange} />
                </Col>
              </Row>
              <Row className="modalRow">
                <Col lg={6} sm={6}>
                  <label className="label"> ClassList: </label>
                  <input className='upload' type='file' name='classList' required onChange={this.handleFileChange} />
                </Col>
              </Row>
            </Grid>
          </Modal.Body>
          <Modal.Footer>
            <Button className='overlayFormButton' type='submit'>Create</Button>
            {/* <Button className='closeButton' onClick={this.props.onHide}>Cancel</Button> */}
          </Modal.Footer>
        </form>
      </Modal>
    );

  }
  handleChange(event) {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: target.value
    });
  }

  handleFileChange = event => {
    this.setState({
      classList: event.target.files[0],
      fileLoaded: 0,
    })
  }
  async handleSubmit(event){
    event.preventDefault();
    const { courseCode, courseName,sessionYear,sessionSemester,classList } = this.state;

    var data = new FormData();
    data.append("classList", classList);
    data.append("courseCode",courseCode);
    data.append("courseName",courseName);
    data.append("semester",sessionSemester);
    data.append("year",sessionYear);

        try {
           const response =  await axios.post('/course/create', data);
           console.log(response);
           window.location.reload();
        } catch (err) {
          alert(err );
        }
  }

}
// {onUploadProgress: ProgressEvent => {
//  this.setState({
//    fileLoaded: (ProgressEvent.loaded / ProgressEvent.total*100)
//  })

export default AddCourseForm;
