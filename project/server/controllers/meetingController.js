var express = require('express');
var mongoose = require("mongoose");
const Meeting = require('../models/meeting');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const OfficeHours = require('../models/officehour');
const ical = require('ical-generator');
const cal = ical();
const multer = require('multer');
const upload = multer({storage: multer.memoryStorage()});

var app = express();

function verifyTime(time, lengthofbooking) {
  if (time === "00") {
    return true;
  } else {
    var time_int = parseInt(time, 10);
    return Number.isInteger(time_int / lengthofbooking);
  }
}

//create meeting (for student)
app.post('/meeting/create/student', function (req, res) {
  var date = req.body.date;
  var startTime = req.body.startTime;
  var id;

  //verify student exists
  Student.findOne({email: req.body.studentEmail}, function (err, user) {
    if (err) {
      return res.status(400).json(
          {err: "bad request"});
    }
    if (!user) {
      return res.status(404).json(
          {err: 'no such user ' + req.body.studentEmail});
    } else {
      //console.log("verified student successfully!");
    }

    OfficeHours.find({date: req.body.date, heldBy: req.body.teacherEmail},
        function (err, officehour) {
          if (err) {
            console.log(err);
            return res.status(400).json({err: "Bad Request"});
          }

          //check if office hour exists for the date and time
          else if (officehour.length < 1) {
            return res.status(404).json(
                {err: "office hours for that date does not exist"});
          } else {
            //store office hour id
            id = officehour[0]._id;

            //verify time is valid per booking length
            var startTime_v = startTime.split(":");
            var validTime = verifyTime(startTime_v[1],
                officehour[0].lengthOfBookings);
            if (!validTime) {
              return res.status(400).json({err: "Invalid booking time"});
            } else {
              //remove colon and change times to int
              var student_startTime = startTime.replace(':', '');
              var office_startTime = officehour[0].startTime.replace(':', '');
              var office_endTime = officehour[0].endTime.replace(':', '');

              //verify start time falls within office hour interval
              if (parseInt(student_startTime, 10) < parseInt(office_startTime,
                  10)) {
                return res.status(400).json({err: "invalid start time"});
              } else if (parseInt(student_startTime, 10) >= parseInt(
                  office_endTime, 10)) {
                return res.status(400).json({err: "invalid start time"});
              } else {
                //check if meeting slot is available
                var bookings = officehour[0].booking;
                if (bookings[startTime]) {
                  return res.status(400).json(
                      {err: "chosen meeting time is already taken"});
                } else {
                  //insert student into slot
                  bookings[startTime] = req.body.studentEmail;

                  OfficeHours.findOneAndUpdate({_id: officehour[0]._id},
                      {booking: bookings},
                      function (err, officehour) {
                        if (err) {
                          return res.status(400).json({err: "Bad request"});
                        }
                      });

                  //create meeting
                  var meeting = new Meeting({
                    studentEmail: req.body.studentEmail,
                    teacherEmail: req.body.teacherEmail,
                    officeHour_id: id,
                    date: req.body.date,
                    startTime: req.body.startTime,
                    agenda: req.body.agenda,
                    courseName: req.body.courseName.toUpperCase()
                  });

                  //add meeting to database
                  meeting.save(function (err) {
                    if (err) {
                      return res.status(400).json({err: "Bad request"});
                    } else {
                      return res.status(200).json({status: "Success"});
                    }
                  });
                }
              }
            }
          }
        });
  });
});

//edit meeting agenda (for student) - takes in date, start time and new agenda
app.patch('/meeting/edit-agenda/student', function (req, res) {
  Meeting.updateOne({date: req.body.date, startTime: req.body.startTime},
      {agenda: req.body.agenda},
      function (err, meeting) {
        if (err) {
          return res.status(400).json({err: "Bad request"});
        }

        if (meeting["nModified"] === 0) {
          return res.status(404).json({err: "can't find meeting"});
        }

        return res.status(200).json({status: "agenda successfully updated"});
      });
});

//edit meeting comment (for student) - takes in date, start time and new comment
app.patch('/meeting/edit-comment', function (req, res) {
  console.log("Comment edited by: " + req.query.client);
  Meeting.updateOne({
        date: req.body.date,
        startTime: req.body.startTime,
        studentEmail: req.body.studentEmail,
        teacherEmail: req.body.teacherEmail
      },
      {comment: req.body.comment},
      function (err, meeting) {
        if (err) {
          return res.status(400).json({err: "Bad request"});
        }

        if (meeting["nModified"] === 0) {
          return res.status(404).json({err: "can't find meeting"});
        }

        return res.status(200).json({status: "comment successfully updated"});
      });
});

app.delete('/meeting/delete-comment', function (req, res) {
  Meeting.update({
        date: req.body.date,
        startTime: req.body.startTime,
        studentEmail: req.body.studentEmail,
        teacherEmail: req.body.teacherEmail
      },
      {$unset: {comment: 1}},
      function (err, meeting) {
        if (err) {
          return res.status(400).json({err: "Bad request"});
        }

        if (!meeting || meeting.toString() === "") {
          res.status(404).json({err: "can't find meeting"});
        }

        return res.status(200).json({status: "Comment successfully deleted"});
      });
});

//reschedule meeting time(for student & instructor) - takes in meeting date, new time and old time
app.patch('/meeting/reschedule-time', function (req, res) {
  console.log("rescheduling time")
  // console.log(req.body)
  //find meeting to reschedule
  Meeting.find({date: req.body.date, startTime: req.body.oldTime},
      function (err, meeting) {
        if (err) {
          console.log(err);
          return res.status(400).json({err: "Bad Request"});
        }

        //check if meeting exists for the date and time
        if (meeting.length === 0) {
          return res.status(404).json(
              {err: "meeting for that time does not exist"});
        }

        //find office hours and check if new time / date is booked
        OfficeHours.findOne({_id: meeting[0].officeHour_id},
            function (err, officehour) {
              if (err) {
                console.log(err);
                return res.status(400).json({err: "Bad Request"});
              }

              var newTime = req.body.newTime;
              var booking = officehour.booking;

              //verify time is valid per booking length
              var startTime_v = newTime.split(":");
              var validTime = verifyTime(startTime_v[1],
                  officehour.lengthOfBookings);
              if (!validTime) {
                return res.status(400).json({err: "Invalid booking time"});
              } else {
                //remove colon and change times to int
                var student_startTime = newTime.replace(':', '');
                var office_startTime = officehour.startTime.replace(':', '');
                var office_endTime = officehour.endTime.replace(':', '');

                //verify start time falls within office hour interval
                if (parseInt(student_startTime, 10) < parseInt(office_startTime,
                    10)) {
                  return res.status(400).json({err: "invalid start time"});
                } else if (parseInt(student_startTime, 10) >= parseInt(
                    office_endTime, 10)) {
                  return res.status(400).json({err: "invalid start time"});
                }

              //check if new time is available
              if (booking[newTime]) {
                return res.status(400).json(
                    {err: "Requested time not available"});
              }

              //add student to booking object
              else {
                delete booking[meeting[0].startTime];
                booking[newTime] = meeting[0].studentEmail;
              }

              //update booking for office hours
              OfficeHours.findOneAndUpdate({_id: officehour._id},
                  {booking: booking},
                  function (err, officehour) {
                    if (err) {
                      return res.status(400).json({err: "Bad request"});
                    } else {
                      Meeting.updateOne(
                          {date: req.body.date, startTime: req.body.oldTime},
                          {startTime: req.body.newTime},
                          function (err, result) {
                            if (err) {
                              return res.status(400).json({err: "Bad request"});
                            }

                            if ((result["nModified"] === 0)) {
                              return res.status(404).json(
                                  {err: "can't find meeting"});
                            }

                            return res.status(200).json(
                                {status: "successfully rescheduled"});
                          });
                    }
                  });
                }
            });

      });
});

//reschedule meeting date and time (for student & instructor ) - takes in old and new date, new time and old time
app.patch('/meeting/reschedule-date', function (req, res) {
  //find meeting to reschedule
  Meeting.find({date: req.body.oldDate, startTime: req.body.oldTime},
      function (err, meeting) {
        if (err) {
          console.log(err);
          return res.status(400).json({err: "Bad Request"});
        }

        //check if meeting exists for the date and time
        if (meeting.length === 0) {
          return res.status(404).json(
              {err: "meeting for that date and time does not exist"});
        }

        //store student email
        var studentEmail = meeting[0].studentEmail;

        //find office hours and check if new time / date is booked
        OfficeHours.findOne({date: req.body.newDate},
            function (err, officehour) {
              if (err) {
                console.log(err);
                return res.status(400).json({err: "Bad Request"});
              }

              //check if office hours exists for new date
              if (!officehour) {
                return res.status(404).json(
                    {err: "office hours for date requested does not exist"});
              }

              var newTime = req.body.newTime;
              var newDate = req.body.newDate;
              var booking = officehour.booking;

              //check if new time is available
              if (booking[newTime]) {
                return res.status(400).json(
                    {err: "Requested time not available"});
              }

              //add student to booking object
              else {
                booking[newTime] = meeting[0].studentEmail;
              }

              //update booking for office hours
              OfficeHours.findOneAndUpdate({date: newDate}, {booking: booking},
                  function (err, officehour) {
                    if (err) {
                      return res.status(400).json({err: "Bad request"});
                    }

                    //update date and time of meeting object
                    else {

                      //verify time is valid per booking length
                      var startTime_v = newTime.split(":");
                      var validTime = verifyTime(startTime_v[1],
                          officehour.lengthOfBookings);
                      if (!validTime) {
                        return res.status(400).json({err: "Invalid booking time"});
                      } else {
                        //remove colon and change times to int
                        var student_startTime = newTime.replace(':', '');
                        var office_startTime = officehour.startTime.replace(':', '');
                        var office_endTime = officehour.endTime.replace(':', '');

                        //verify start time falls within office hour interval
                        if (parseInt(student_startTime, 10) < parseInt(office_startTime,
                            10)) {
                          return res.status(400).json({err: "invalid start time"});
                        } else if (parseInt(student_startTime, 10) >= parseInt(
                            office_endTime, 10)) {
                          return res.status(400).json({err: "invalid start time"});
                        }

                      Meeting.updateOne(
                          {date: req.body.oldDate, startTime: req.body.oldTime},
                          {startTime: newTime, date: newDate},
                          function (err, result) {
                            if (err) {
                              return res.status(400).json({err: "Bad request"});
                            }

                            if ((result["nModified"] === 0)) {
                              return res.status(404).json(
                                  {err: "can't find meeting"});
                            }

                            OfficeHours.findOne({date: req.body.oldDate},
                                function (err, officehour) {
                                  if (err) {
                                    console.log(err);
                                    return res.status(400).json(
                                        {err: "Bad Request"});
                                  }

                                  //delete booking from previous officeHours
                                  var oldOfficeHourBooking = officehour.booking;
                                  delete oldOfficeHourBooking[meeting[0].startTime];

                                  //update old office hours with student email deleted
                                  OfficeHours.findOneAndUpdate(
                                      {date: req.body.oldDate},
                                      {booking: oldOfficeHourBooking},
                                      function (err, result) {
                                        if (err) {
                                          return res.status(400).json(
                                              {err: "Bad request"});
                                        }

                                        if (!result) {
                                          return res.status(404).json(
                                              {err: "can't find office hours"});
                                        }

                                        return res.status(200).json(
                                            {status: "successfully rescheduled"});
                                      });
                                });
                          });
                    }
                  }
                  });
            });
      });
});

//deletes meeting for student - takes in meeting date and time as query (can also be used for instructor)
app.delete('/meeting/delete', function (req, res) {

  //find meeting to delete
  Meeting.findOneAndDelete({
        date: req.query.date,
        startTime: req.query.startTime
      },
      function (err, meeting) {
        if (err) {
          return res.status(400).json({err: "Bad request"});
        }

        if(!meeting){
          return res.status(404).json({err: "Meeting does not exist"});
        }

        //check if meeting to delete exists
        else if (meeting.length === 0) {
          return res.status(404).json({err: "Meeting not found"});
        }

        //delete booking in office hours
        else {
          var officehour_id = meeting.officeHour_id;

          //find related office hour
          OfficeHours.findOne({_id: officehour_id},
              function (err, officehour) {
                if (err) {
                  return res.status(400).json({err: "Bad request"});
                } else if (!officehour) {
                  return res.status(404).json(
                      {err: "Office hour does not exist"});
                } else {
                  var booking = officehour.booking;

                  //delete student email from booking object
                  delete booking[req.query.startTime];

                  //update office hours booking
                  OfficeHours.findOneAndUpdate({_id: officehour_id},
                      {booking: booking},
                      function (err, result) {
                        if (err) {
                          return res.status(400).json({err: "Bad request"});
                        } else if (!result) {
                          return res.status(404).json(
                              {err: "can't find office hours"});
                        } else {
                          return res.status(200).json(
                              {status: "successfully deleted meeting"});
                        }
                      });
                }
              });
        }
      });
});

//add or edit meeting note (for instructor) - takes in date, start time and new note
app.patch('/meeting/edit-note/teacher', function (req, res) {
  //check that teacher is editing notes for his own meeting (meeting for the right course)
  Meeting.find({date: req.body.date, startTime: req.body.startTime},
      function (err, meeting) {
        if (err) {
          return res.status(400).json({err: "Bad request"});
        }

        if (meeting.length === 0) {
          return res.status(404).json({err: "Meeting not found"});
        }

        if (meeting[0].teacherEmail !== req.session.userEmail) {
          return res.status(401).json({err: "Unathorized access"});
        }

        //update note
        Meeting.updateOne({date: req.body.date, startTime: req.body.startTime},
            {note: req.body.note},
            function (err, meeting) {
              if (err) {
                return res.status(400).json({err: "Bad request"});
              }

              if (meeting["nModified"] === 0) {
                return res.status(404).json(
                    {err: "can't find meeting", meeting: meeting});
              }

              return res.status(200).json(
                  {status: "note successfully updated"});
            });

      });
});

// Example of use: "/meeting/get-meeting?client=student"
app.get('/meeting/get-meeting', function (req, res) {
  console.log("Meeting get requested by: " + req.query["client"]);
  // console.log(req.query)
  Meeting.find({
        date: req.query.date,
        startTime: req.query.startTime,
        studentEmail: req.query.studentEmail,
        teacherEmail: req.query.teacherEmail,
        courseName: req.query.courseName.toUpperCase()
      },
      function (err, meeting) {
        if (err) {
          return res.status(400).json({err: "Bad request"});
        }

        //check if meeting to exists
        else if (meeting.length === 0) {
          return res.status(404).json({err: "Meeting not found"});
        }

        if (req.query.client !== "teacher") {
          meeting[0].note = "";
        }

        return res.status(200).json(meeting);
      });
});

//delete meeting note (for instructor) - takes in date and start time
app.delete('/meeting/delete-note/teacher', function (req, res) {

  //check that teacher is deleting notes for his own meeting (meeting for the right course)
  Meeting.find({date: req.body.date, startTime: req.body.startTime},
    function(err, meeting){
      if(err) {
        return res.status(400).json({err: "Bad request"});
      }

      if(meeting.length == 0){
        return res.status(404).json({err: "Meeting not found"});
      }

      if(meeting.teacherEmail != req.session.userEmail){
        return res.status(401).json({err: "Unathorized access"});
      }

      //delete note
      Meeting.updateOne({date: req.body.date, startTime: req.body.startTime},
          {$unset: {note: ""}},
          function (err, meeting) {
            if (err) {
              return res.status(400).json({err: "Bad request"});
            }

            if (meeting["nModified"] === 0) {
              return res.status(404).json({err: "can't find meeting", meeting: meeting});
            }

            return res.status(200).json({status: "note successfully deleted"});
      });

  });
});


app.get('/meeting/meeting-ical-file', function (req, res) {
  Meeting.findOne({
        date: req.query.date,
        startTime: req.query.startTime,
        studentEmail: req.query.studentEmail,
        teacherEmail: req.query.teacherEmail,
        courseName: req.query.courseName
      },
      function (err, meeting) {
        if (err) {
          return res.status(400).json({err: "Bad request"});
        }

        //check if meeting to exists
        else if (meeting.length === 0) {
          return res.status(404).json({err: "Meeting not found"});
        }

        OfficeHours.findOne({_id: meeting.officeHour_id},
            function (err, officehour) {
              if (err) {
                return res.status(400).json({err: "Bad request"});
              } else if (!officehour) {
                return res.status(404).json(
                    {err: "Office hour does not exist"});
              } else {
                var startTime_v = meeting.startTime.split(":");
                var date_v = meeting.date.split("/");
                date_n = new Date(parseInt(date_v[2]), parseInt(date_v[1]) - 1,
                    parseInt(date_v[0]), parseInt(startTime_v[0]),
                    parseInt(startTime_v[1]));
                date_end = new Date(parseInt(date_v[2]),
                    parseInt(date_v[1]) - 1,
                    parseInt(date_v[0]), parseInt(startTime_v[0]),
                    parseInt(startTime_v[1])) + 60000
                    * officehour.lengthOfBookings;
                cal.createEvent({
                  start: date_n,
                  end: date_end,
                  summary: meeting.courseName + ": Office Hour Meeting",
                  description: meeting.agenda,
                });
                path_custom = __dirname + "/event-" + meeting._id + ".ics";
                cal.save(path_custom);

                return res.status(200).json({status: "Success"}).download(
                    path_custom);
              }
            });
      });
});

module.exports = app;
