import React, { Component } from 'react';
import { Modal, Button, Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import '../../assets/css/modal.css';

class BookMeeting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      userProfile: "",
      meeting: null,
      date: "",
      time: "",
      agenda: "",
      comment: "",
      note: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.editSubmit = this.editSubmit.bind(this);
    this.deleteMeeting = this.deleteMeeting.bind(this);
    this.getMeeting = this.getMeeting.bind(this);
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.getAgenda = this.getAgenda.bind(this);
    this.getComment = this.getComment.bind(this);
    this.getNote = this.getNote.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleTime = this.handleTime.bind(this);
    this.handleAgenda = this.handleAgenda.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.handleNote = this.handleNote.bind(this);
    this.exportMeeting = this.exportMeeting.bind(this);
  }

  componentDidMount() {
    if (this.state.userProfile === "")
      this.getCurrentUser();
  }

  render() {
    // variables
    var currDate = this.state.date !== "" ? this.state.date : this.props.date;
    var currTime = this.state.time !== "" ? this.state.time : this.props.timeSlot[0];                          
    var currAgenda = this.state.agenda !== "" ? this.state.agenda : this.getAgenda();
    var currComment = this.state.comment !== "" ? this.state.comment : this.getComment();
    var currNote = this.state.note !== "" ? this.state.note : this.getNote();
    
    // views
    var bookedMeetingDetail = <Row className="modalRow">
                                <Col lg={4} sm={4}>
                                <p>Course: {this.props.courseCode}</p>
                                </Col>
                                <Col lg={4} sm={4}>
                                <p>Instructor: {this.props.heldBy}</p>
                                </Col>
                                <Col lg={4} sm={4}>
                                <p>Booked: {this.props.timeSlot[1]}</p>
                                </Col>
                            </Row>
    var notbookedMeetingDetail = <Row className="modalRow">
                                    <Col lg={6} sm={6}>
                                    <p>Course: {this.props.courseCode}</p>
                                    </Col>
                                    <Col lg={6} sm={6}>
                                    <p>Instructor: {this.props.heldBy}</p>
                                    </Col>
                                </Row>
    if (this.state.userProfile === "teacher") {
      var viewContent = <Row className="modalRow">
                            <label className="label"> Note: </label>
                            <textarea className='overlay-field bigArea' type='text' rows="3"
                              placeholder={this.getNote()} name='note' onChange={this.handleChange}> 
                              {currNote}
                            </textarea>
                          </Row>
      var editAgenda = <div>
                      <label className="label"> Agenda: </label>
                      <p className="agenda">{this.getAgenda()}</p>
                      </div>
    } else { 
      var viewContent = "" 
      var editAgenda = <Row className="modalRow">
                        <label className="label"> Agenda: </label>
                        <textarea className='overlay-field bigArea' type='text' rows="3" required
                          placeholder={this.getAgenda()} name='agenda' onChange={this.handleChange}> 
                          {currAgenda}
                        </textarea>
                      </Row>
    }
    var inputForBooking = <Row className="modalRow">
                            <label className="label"> Agenda: </label>
                            <textarea className='overlay-field' type='text' rows="3" required
                              placeholder='What you would like to address in this meeting' name='agenda'
                              onChange={this.handleChange} />
                        </Row>
    var editableContent = <div>
                          <Row className="modalRow">
                            <Col lg={6} sm={6}>
                              <label className="label"> Date: </label>
                              <textarea className='overlay-field' type='text' required
                                placeholder={this.props.date} name='date' onChange={this.handleChange}> 
                                {currDate}
                              </textarea>
                            </Col>
                            <Col lg={6} sm={6}>
                              <label className="label"> Time: </label>
                              <textarea className='overlay-field' type='text' required
                                placeholder={this.props.timeSlot[0]} name='time' onChange={this.handleChange}> 
                                {currTime}
                              </textarea>
                            </Col>
                          </Row>
                          {editAgenda}
                          <Row className="modalRow">
                            <label className="label"> Comment: </label>
                            <textarea className='overlay-field bigArea' type='text' rows="3"
                              placeholder={this.getComment()} name='comment' onChange={this.handleChange}> 
                              {currComment}
                            </textarea>
                          </Row>
                          {viewContent}
                          </div>

    if (this.state.userProfile === "teacher") {
      // if viewing a booked meeting
      if (this.props.timeSlot[1] !== "") {
        var exportButton = <Button className="pe-7s-next-2 export" onClick={this.exportMeeting}></Button>
        var meetingDetail = bookedMeetingDetail;
        var content = editableContent;
        var button = <Button className='overlayFormButton' type='submit'>Save</Button>
        var deleteButton = <Button className='deleteButton' onClick={this.deleteMeeting}>Delete</Button>
        var submitType = this.editSubmit;
      } else {
        var meetingDetail = notbookedMeetingDetail;
        var content = "No Booking Yet";
        var button = ""
      }
    } else { //student
      if (this.props.timeSlot[1] === "") {
        var meetingDetail = notbookedMeetingDetail;
        var content = inputForBooking;
        var button = <Button className='overlayFormButton' type='submit'>Book</Button>
        var deleteButton = ""
        var submitType = this.handleSubmit;
      } else { //student viewing own booking
        var exportButton = <Button className="pe-7s-next-2 export" onClick={this.exportMeeting}></Button>
        var meetingDetail = bookedMeetingDetail;
        var content = editableContent;
        var button = <Button className='overlayFormButton' type='submit'>Save</Button>
        var deleteButton = <Button className='deleteButton' onClick={this.deleteMeeting}>Delete</Button>
        var submitType = this.editSubmit;
      }
    }

    return (
    <Modal id="meetingModal"
      {...this.props}
      size="lg"
      centered="true"
    >
      <form id='overlayForm' name='createHike' onSubmit={submitType} encType="multipart/form-data">
        <Modal.Header closeButton>
          <Modal.Title>
          {exportButton}
          {this.props.ohDate} - {this.props.timeSlot[0]}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Grid fluid>
          {meetingDetail}
          {/* agenda/comment section */}
          {content}
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          {button}
          {deleteButton}
          {/* <Button className='closeButton' onClick={this.props.onHide}>Cancel</Button> */}
        </Modal.Footer>
      </form>
    </Modal>
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
                  if (this.props.timeSlot[1] !== "")
                      this.getMeeting();
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

  async getMeeting() {
    if (this.state.userProfile === "teacher") {
      var url = '/meeting/get-meeting?client=teacher';
    } else {
      var url = '/meeting/get-meeting?client=student';
    }
    
    await axios({
        method: "get",
        url: url,
        params: {
          teacherEmail: this.props.heldBy,
          studentEmail: this.props.timeSlot[1],
          startTime: this.props.timeSlot[0],
          date: this.props.date,
          courseName: this.props.courseCode.toUpperCase()
        }
        })
        .then(res => {
          // console.log(res.data)
          this.setState({ meeting: res.data });
        })
        .catch(err => console.log(err))
  }

  async deleteMeeting() {
    await axios({
      method: "delete",
      url: '/meeting/delete?client='+this.state.userProfile,
      params: {
        teacherEmail: this.props.heldBy,
        studentEmail: this.props.timeSlot[1],
        date: this.props.date,
        startTime: this.props.timeSlot[0],
        courseName: this.props.courseCode.toUpperCase()
      }
      })
      .then(res => {
        console.log(res.data)
        window.location.reload();
      })
      .catch(err => console.log(err))
  }

  getAgenda() {
    if (this.state.meeting) {
      // console.log(this.state.meeting[0].agenda)
      return this.state.meeting[0].agenda;
    }
  }

  getComment() {
    if (this.state.meeting) {
      return this.state.meeting[0].comment;
    }
  }

  getNote() {
    if (this.state.meeting) {
      return this.state.meeting[0].note;
    }
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;

    this.setState({
    [name]: target.value
    });
  }

  async handleSubmit(event){
    event.preventDefault();
    const { agenda } = this.state;

    var data = {
      teacherEmail: this.props.heldBy,
      studentEmail: this.state.user.email,
      startTime: this.props.timeSlot[0],
      date: this.props.date,
      agenda: agenda,
      courseName: this.props.courseCode
    }

    try {
      const response = await axios.post('/meeting/create/student', data);
      console.log(response);
      window.location.reload();
    } catch (err) {
        alert(err );
    }
  }

  editSubmit(event){
    event.preventDefault();
    const { date, time, agenda, comment, note } = this.state;

    this.handleDate(date, time);
    this.handleAgenda(agenda);
    this.handleComment(comment);
    this.handleNote(note);
  }

  async handleDate(date, time) {
    var data = {
      oldTime: this.props.timeSlot[0],
      newTime: time,
      oldDate: this.props.date,
      newDate: date
    }
    // alert("state date: " + this.state.date + " vs meeting date: " + this.props.date)
    if (this.state.date !== "" && this.state.date !== this.props.date && this.state.time !== "") {
      try {
          const response = await axios.patch('/meeting/reschedule-date?client='+this.state.userProfile, data);
          console.log(response);
          window.location.reload();
      } catch (err) {
          alert(err );
      }
    } else { // date didnt change, so just handle time change
      this.handleTime(time);
    }
  }

  async handleTime(time) {
    var data = {
      oldTime: this.props.timeSlot[0],
      date: this.props.date,
      newTime: time
    }
    // alert("state time: " + this.state.time + " vs meeting time: " + this.props.timeSlot[0])
    if (this.state.time !== "" && this.state.time !== this.props.timeSlot[0]) {
      try {
          const response = await axios.patch('/meeting/reschedule-time', data);
          console.log(response);
          window.location.reload();
      } catch (err) {
          alert(err );
      }
    }
  }

  async handleAgenda(agenda) {
    var data = {
      startTime: this.props.timeSlot[0],
      date: this.props.date,
      agenda: agenda,
    }
    // alert("state agenda: " + this.state.agenda + " vs meeting agenda: " + this.state.meeting[0].agenda)
    if (this.state.agenda !== "" && this.state.agenda !== this.state.meeting[0].agenda) {
      try {
          const response = await axios.patch('/meeting/edit-agenda/student', data);
          console.log(response);
          window.location.reload();
      } catch (err) {
          alert(err );
      }
    }
  }

  async handleComment(comment) {
    var data = {
      teacherEmail: this.props.heldBy,
      studentEmail: this.props.timeSlot[1],
      startTime: this.props.timeSlot[0],
      date: this.props.date,
      comment: comment
    }
    // alert("state comment: " + this.state.comment + " vs meeting comment: " + this.state.meeting[0].comment)
    if (this.state.comment !== "" && this.state.comment !== this.state.meeting[0].comment) {
      try {
          const response = await axios.patch('/meeting/edit-comment?client='+this.state.userProfile, data);
          console.log(response);
          window.location.reload();
      } catch (err) {
          alert(err );
      }
    }
  }

  async handleNote(note) {
    var data = {
      startTime: this.props.timeSlot[0],
      date: this.props.date,
      note: note,
    }
    // alert("state note: " + this.state.note + " vs meeting note: " + this.state.meeting[0].note)
    if (this.state.note !== "" && this.state.note !== this.state.meeting[0].note) {
      try {
          const response = await axios.patch('/meeting/edit-note/teacher', data);
          console.log(response);
          window.location.reload();
      } catch (err) {
          alert(err );
      }
    }
  }

  async exportMeeting() {
    await axios({
      method: "get",
      url: 'meeting/meeting-ical-file',
      params: {
        teacherEmail: this.props.heldBy,
        studentEmail: this.props.timeSlot[1],
        startTime: this.props.timeSlot[0],
        date: this.props.date,
        courseName: this.props.courseCode.toUpperCase()
      }
      })
      .then(res => {
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }
}

export default BookMeeting;
