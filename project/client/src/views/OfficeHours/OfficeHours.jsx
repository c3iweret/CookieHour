import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import OHDay from "./OHDay";
import axios from 'axios';
import AddOHForm from '../Modals/AddOHForm';


class OfficeHours extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: null,
            userProfile: "",
            showForm: false, 
            officeHours: []
        };
        this.addOH = this.addOH.bind(this);
        this.getOfficeHours = this.getOfficeHours.bind(this);
        this.getCurrentUser = this.getCurrentUser.bind(this);
    }

    componentDidMount() {
        this.course = this.props.location.state;
        //console.log(this.course);
        this.getCurrentUser();
        this.getOfficeHours();
    }

    render() {
        let modalClose = () => this.setState({ showForm: false });
        var colours = ["text-warning", "text-success", "text-danger", "text-info", "text-muted"];
        // number of booked timeslots
        Object.size = function(obj) {
            if (obj)
                return Object.values(obj).filter(x => x !== "").length;
        };
        var renderedOutput = this.state.officeHours.map(officeHour => 
            <Col lg={12} sm={12}>
                <OHDay
                color={colours[Math.floor(Math.random() * 4)]}
                // bigIcon={<i className={"pe-7s-users "} />}
                duration={officeHour.lengthOfBookings}
                courseCode={officeHour.courseName.toUpperCase()}
                ohTime={officeHour.startTime + " - " + officeHour.endTime}
                ohDate={this.determineDate(officeHour)}
                date={officeHour.date}
                heldBy={officeHour.heldBy}
                icon={<i className="fa fa-user-o" />}
                iconText={Object.size(officeHour.booking) + " Bookings"}
                bookings={officeHour.booking}
                interval={officeHour.lengthOfBookings}
                />
            </Col>
        );

        var addOHButton = (this.state.userProfile === "teacher") ? 
            <button className="index-button" onClick={this.addOH}> Add OfficeHour </button> : "";

        return (
            <div className="OfficeHours content">
            <Grid fluid>
                <Row>
                {renderedOutput}
                </Row>
            </Grid>
            {addOHButton}

            <AddOHForm 
                course = {this.course}
                show = { this.state.showForm }
                onHide = { modalClose }
            />
            </div>
        );
    }

    // smth wonky with the date object getDay(), isnt returning correct day..
    determineDate(officeHour) {
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["", "January", "February", "March", "April", "May", "June", "July", "August", 
            "September", "October", "November", "December"];
        var d = officeHour.date.split('/');
        var date = new Date(d[2], d[1], d[0]);
        return weekdays[date.getDay()] + ", " + months[date.getMonth()] + " " + d[0] + ", " + d[2];
    }

    addOH(){
        this.setState({showForm: true});   
    }

    // set user profile (teacher or student) and get the user obj
    async getCurrentUser() {
        await axios.get('/user')
          .then( res => {
            const userProfile = res.data; 
            this.setState({ userProfile });
            // console.log("OfficeHours.jsx")
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

    async getOfficeHours(){
        try {
            const response =  await axios.get('/teacher/get-office-hours?courseName='+this.course);
            this.setState({officeHours: response.data})
            // console.log(this.state.officeHours);
        } catch (err) {
        console.log(err);
        }
    }
}

export default OfficeHours;
