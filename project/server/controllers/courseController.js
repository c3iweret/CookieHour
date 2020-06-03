var express = require('express');
var multer = require('multer');
var fs = require('fs');
const readline = require('readline');
var mongoose = require("mongoose");
const Course = require('../models/course');
const Teacher = require('../models/teacher');
var app = express();

/*set directory where the uploaded file must go*/
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-ClassList' + Date.now());
  }
});

/*upload handles input called 'file'*/
var upload = multer({storage});

var menuObj = [];

app.read = function (path) {
  var studentsEnrolled = [];

  fs.readFileSync(path).toString().split('\n').forEach(function (line) {
    if (app.validateEmail(line)) {
      studentsEnrolled.push(line);
      console.log(line);
    }
  });
  fs.unlinkSync(path);
  return studentsEnrolled;
};

app.validateEmail = function (email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

app.post('/course/create', upload.single('classList'), function (req, res) {
  console.log("create course");
  console.log(req.body);
  console.log(req.session.userEmail);
  console.log(req.file);

  const session = {"year": req.body.year, "semester": req.body.semester};
  const fullPath = "./" + req.file.path;
  var studentsEnrolled = app.read(fullPath);

  var emptyOfficeHours = [];



  //create Class
  var course = new Course({
    code: req.body.courseCode,
    numStudents: studentsEnrolled.length,
    session: session,
    name: req.body.courseName.toUpperCase(),
    taughtBy: req.session.userEmail,
    officeHours: emptyOfficeHours,
    studentsEnrolled: studentsEnrolled
  });

  //add course to database
  course.save(function (err) {
    if (err) {
      console.log(err);
      return res.status(400).json({err: "Bad request"});
    } else {
      Teacher.findOneAndUpdate({email: req.session.userEmail},
        { $push: { classesTaught: course._id  } },
        function (error, success) {
              if (error) {
                  console.log(error);
              } else {
                  console.log("updated classesTaught attribute in teacher collection");
              }
          });
      return res.status(200).json({course: course});
    }
  });
});

app.get('/courses', function (req, res) {

  console.log('Get All Courses');

  // Get all hikes
  Course.find({taughtBy: req.session.userEmail}, function (err, allCourses) {
    if (err) {
      throw err;
    }
    // Send back all hikes
    res.send(allCourses);
  });
});

module.exports = app;
