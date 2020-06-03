import React, { Component } from 'react';
import { Modal, Button, Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import '../../assets/css/modal.css';
import MeetingInfo from '../Modals/MeetingInfo';

class Meeting extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: null,
            userProfile: "",
            showForm: false
        };
        this.showModal = this.showModal.bind(this);
        this.getCurrentUser = this.getCurrentUser.bind(this);
    }

    componentDidMount() {
        this.getCurrentUser();
    }

    render() {
        let modalClose = () => this.setState({ showForm: false });
        var studentEmail = this.state.user ? this.state.user.email : "";
        // student can only open modal if their own booking or its available
        if (this.state.userProfile === "student") {
            if (this.props.timeSlot[1] === studentEmail ||
                this.props.timeSlot[1] === "") {
                var meetingRow = "meetingRow"
            } else {
                var meetingRow = "meetingRowTaken"
            }
        // teacher can always view
        } else if (this.state.userProfile === "teacher") {
            var meetingRow = "meetingRow"
        }
        return (
            <div>
                <Row className={meetingRow} onClick={this.showModal}>
                    <Col className="meetingTime" lg={3} sm={3}>
                        <span>{"-- " + this.props.timeSlot[0] + " --"}</span>
                    </Col>
                    <Col className="meetingName" lg={9} sm={9}>
                        <span>{this.props.timeSlot[1]}</span>
                    </Col>
                </Row>
                <MeetingInfo
                    timeSlot = { this.props.timeSlot }
                    ohDate = { this.props.ohDate }
                    date = { this.props.date}
                    courseCode = { this.props.courseCode }
                    heldBy = { this.props.heldBy }
                    show = { this.state.showForm }
                    onHide = { modalClose }
                />
            </div>
        );
    }

    // set user profile (teacher or student) and get the user obj
    async getCurrentUser() {
        await axios.get('/user')
          .then( res => {
            const userProfile = res.data; 
            this.setState({ userProfile });
            // console.log("Meeting.jsx")
            // console.log(this.state.userProfile)
            if (this.state.userProfile === "student") {
                var url = '/student/profile';
            } else {
                var url = '/teacher/profile';
            }
            axios.get(url)
                .then( res => {
                    const user = res.data;
                    this.setState({ user });
                })
                .catch(err => {
                    console.log(err);
                })
          })
          .catch(err => {
            console.log(err);
          })
    }

    // only show the book meeting modal for students
    // teachers can view all booked meetings
    showModal() {
        if (this.state.userProfile === "student") {
            if (this.props.timeSlot[1] === "" || this.props.timeSlot[1] === this.state.user.email) {
                this.setState({showForm: true});
            }
        } else if (this.state.userProfile === "teacher") {
            this.setState({showForm: true});
        }
    }
}

export default Meeting;
