import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import Meeting from './Meeting';
import '../../assets/css/officehour.css';

export class OHDay extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            bookingTimes: [],
            timeIntervals: []
        };
        this.calculateMinutes = this.calculateMinutes.bind(this);
        this.calculateIntervals = this.calculateIntervals.bind(this);
        this.findBookings = this.findBookings.bind(this);
    }

    componentDidMount() {
      this.setState({showForm: true}); 
      this.calculateIntervals();
      this.findBookings();
    }

    render() {
      var renderedOutput = this.state.timeIntervals.map(slot =>
        <Meeting 
          timeSlot={slot}
          ohDate={this.props.ohDate}
          date={this.props.date}
          courseCode={this.props.courseCode}
          heldBy={this.props.heldBy}
        />
      );

    return (
      <div>
      <h2><span>{this.props.ohDate}</span></h2>
      <div className="card card-stats" >
        <div className="content">
            <Row>
              <Col xs={4}>
                <Row>
                <div className="icon-big text-center icon-warning">
                  <i className={"pe-7s-users " + this.props.color} />
                  <p className={this.props.color}>{this.props.courseCode}</p>
                </div>
                </Row>
                <Row>
                <div className="ohInfoTime">
                  <p>{this.props.ohTime}</p>
                  <p>({this.calculateMinutes()} minutes)</p>
                </div>
                </Row>
                <Row>
                  <p className="duration">{this.props.duration + " mins/meeting"}</p>
                </Row>
              </Col>
              <Col xs={8}>
                <div className="bookingRender">
                  {renderedOutput}
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
      </div>
    </div>
    );
  }

  // calculate the duration of the office hour in minutes
  calculateMinutes(){
    var time = this.props.ohTime.split(' - ');
    var startTime = time[0].split(":");
    var endTime = time[1].split(":");

    // create date objects to create the time intervals
    var today = new Date();
    var startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), startTime[0], startTime[1]);
    var endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), endTime[0], endTime[1]);
    // console.log(startDate.getHours()+":"+startDate.getMinutes() + " - " + endDate.getHours()+":"+endDate.getMinutes());

    var difference = endDate - startDate; // This will give difference in milliseconds
    var resultInMinutes = Math.round(difference / 60000);
    return resultInMinutes;
  }

  // calculating the oh slots via length of booking time for the entire oh duration - [[time, ""]]
  calculateIntervals(){
    var time = this.props.ohTime.split(' - ');
    var startTime = time[0].split(":");
    var endTime = time[1].split(":");

    // create date objects to create the time intervals
    var today = new Date();
    var startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), startTime[0], startTime[1]);
    var endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), endTime[0], endTime[1]);
    // console.log(startDate.getHours()+":"+startDate.getMinutes() + " - " + endDate.getHours()+":"+endDate.getMinutes());

    this.state.timeIntervals.push([time[0], ""]);
    while (startDate < endDate) {
        startDate.setTime(startDate.getTime() + this.props.interval*60000);
        this.state.timeIntervals.push([startDate.getHours()+":"+(startDate.getMinutes() === 0 ? '00' : 
            startDate.getMinutes()), ""]);
    }
    this.state.timeIntervals.pop();
  }

  // associate the time slots with a booking if there is one - [[time, student_email]]
  findBookings() {
      var intervals = this.state.timeIntervals;
      var bookings = this.props.bookings ? Object.entries(this.props.bookings) : [];
      // console.log("bookings");
      // console.log(bookings);

      for (var i=0; i<intervals.length; i++) {
          for (var j=0; j<bookings.length; j++) {
              if (intervals[i][0] === bookings[j][0]) {
                  intervals[i][1] = bookings[j][1];
              }
          }
      }
      this.state.bookingTimes = intervals;
      // console.log(this.state.bookingTimes);
  }
}

export default OHDay;
