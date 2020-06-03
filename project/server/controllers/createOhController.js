var express = require('express');
var mongoose = require("mongoose");
const Teacher = require('../models/teacher');
const Meeting = require('../models/meeting');
const OfficeHours = require('../models/officehour');
var app = express();

// Create an office hour.
app.post('/teacher/create-office-hours', function (req, res) {
  var heldBy = req.body.heldBy; // It's the teacher's email.
  var startTime = req.body.startTime;
  var endTime = req.body.endTime;
  var lengthOfBookings = req.body.lengthOfBookings;
  var date = req.body.date;
  var courseName = req.body.courseName.toUpperCase();
  var booking = req.body.booking;

  Teacher.findOne({email: heldBy}, function (err, user) {
    if (err) {
      console.log(err);
      return res.status(400).json({err: "Bad request"});
    }

    if (!user || user.toString() === "") {
      return res.status(404).json(
          {err: 'No instructor with the given email exists: ' + heldBy});
    }
    console.log("Verified the instructor successfully!");

    var presence_count = 0;

    // Check if there is an office hour created by this instructor that clashes with the new office hour.
    OfficeHours.find({heldBy: heldBy}).where('date').equals(date).where(
        'startTime').gte(startTime).where('startTime').lt(
        endTime).countDocuments({},
        function (err, count) {
          if (err) {
            console.log(err);
            return res.status(400).json({err: "Bad request"});
          }
          presence_count += count;

          OfficeHours.find({heldBy: heldBy}).where('date').equals(date).where(
              'endTime').lte(endTime).where('endTime').gt(
              startTime).countDocuments({},
              function (err, count) {
                if (err) {
                  console.log(err);
                  return res.status(400).json({err: "Bad request"});
                }
                presence_count += count;

                OfficeHours.find({heldBy: heldBy}).where('date').equals(
                    date).where(
                    'endTime').gte(endTime).where('startTime').lte(
                    startTime).countDocuments({},
                    function (err, count) {
                      if (err) {
                        console.log(err);
                        return res.status(400).json({err: "Bad request"});
                      }
                      presence_count += count;

                      if (presence_count !== 0) {
                        errorMessage = 'There is a clash with another office hour for this slot '
                            + startTime + " - " + endTime;
                        return res.status(403).json({err: errorMessage});
                      }

                      // Add the officeHour to the database.
                      var officeHour = new OfficeHours({
                        heldBy: heldBy,
                        startTime: startTime,
                        endTime: endTime,
                        lengthOfBookings: lengthOfBookings,
                        date: date,
                        courseName: courseName,
                        booking: booking
                      });

                      officeHour.save(function (err) {
                        if (err) {
                          console.log(err);
                          return res.status(400).json({err: "Bad request!"});
                        } else {
                          return res.status(200).json({status: "Success!"});
                        }
                      });
                    });
              });
        });
  });
});

//get office hours by course (course should be included in the request body)
app.get('/teacher/get-office-hours', function (req, res) {
  OfficeHours.find({courseName: req.query.courseName.toUpperCase()},
      function (err, officehours) {
        console.log("query is " + req.query.courseName.toUpperCase());
        if (err) {
          console.log(err);
          return res.status(400).json({err: "Bad Request"});
        }

        if (!officehours) {
          return res.status(404).json(
              {err: "no office hours for this course currently"});
        }

        return res.status(200).json(officehours);
      });
});

app.delete('/teacher/delete-office-hours', function (req, res) {
  OfficeHours.findOneAndDelete({
        heldBy: req.body.heldBy,
        startTime: req.body.startTime,
        date: req.body.date,
        courseName: req.body.courseName.toUpperCase()
      },
      function (err, officehours) {
        console.log("Query: delete the OH on:  " + req.body.date);
        if (err) {
          console.log(err);
          return res.status(400).json({err: "Bad Request"});
        }

        if (!officehours || officehours === "") {
          return res.status(404).json(
              {err: "The specified OH was not found."});
        }
        var ohId = officehours._id;

        Meeting.deleteMany({officeHour_id: ohId},
            function (err, result) {
              if (err) {
                return res.status(400).json({err: "Bad request"});
              } else {
                return res.status(200).json(
                    {status: "Successfully deleted the OH and all its meetings."});
              }
            });
      });

});

module.exports = app;
