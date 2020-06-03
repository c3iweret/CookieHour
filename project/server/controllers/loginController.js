var express = require('express');
var mongoose = require("mongoose");
const Student = require('../models/student');
const Teacher = require('../models/teacher');
var app = express();

app.get('/student/profile', function (req, res) {
  console.log("get student profile");
  Student.findOne({email: req.session.userEmail}, function (err, user) {
    if (err) {
      console.log(err);
      return res.status(400).json({err: "Bad request"});
    }
    if (!user) {
      console.log("no such user");
      return res.status(404).json({err: 'no such user'});
    } else {
      // Success response
      res.status(200).json(user);
    }
  });
});

app.get('/teacher/profile', function (req, res) {
  console.log("get teacher profile");
  Teacher.findOne({email: req.session.userEmail}, function (err, user) {
    if (err) {
      console.log(err);
      return res.status(400).json({err: "Bad request"});
    }
    if (!user) {
      console.log("no such user");
      return res.status(404).json({err: 'no such user'});
    } else {
      // Success response
      res.status(200).json(user);
    }
  })
});

app.get('/user', function (req, res) {
  console.log("get user status");
  Teacher.findOne({email: req.session.userEmail}, function (err, user) {
    if (err) {
      console.log(err);
      return res.status(400).json({err: "Bad request"});
    }
    if (!user) {
      console.log("not a teacher user");
      Student.findOne({email: req.session.userEmail}, function (err, user) {
        if (err) {
          console.log(err);
          return res.status(400).json({err: "Bad request"});
        }
        if (!user) {
          console.log("no such student user");
          return res.status(404).json({err: 'no such user'});
        } else {
          // Success response - student
          res.status(200).json("student");
        }
      });
    } else {
      // Success response - teacher
      res.status(200).json("teacher");
    }
  })
});

app.post('/student/login', function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  Student.findOne({email: email}, function (err, user) {
    if (err) {
      console.log(err);
      return res.status(400).json({err: "Bad request"});
    }
    if (!user) {
      console.log("no such user");
      return res.status(404).json({err: "No student with username: " + email});
    } else if (user) {
      // check if password matches
      if (user.password != password) {
        //console.log("invalid username or password");
        return res.status(401).json({err: 'invalid username or password'});
      } else {
        // Set cookie to be username
        req.session.userEmail = user.email;
        // Redirect to logged in page
        // Success response
        res.status(200).json({status: "Success"});
      }
    }
  });
});

app.post('/teacher/login', function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  Teacher.findOne({email: email}, function (err, user) {
    if (err) {
      console.log(err);
      return res.status(400).json({err: "Bad request"});
    }
    if (!user) {
      return res.status(404).json(
          {err: "No teaching staff with username: " + email});
    } else if (user) {
      // check if password matches
      if (user.password !== password) {
        return res.status(401).json({err: 'invalid username or password'});
      } else {

        // Set cookie to be username
        req.session.userEmail = user.email;
        // Redirect to logged in page
        res.status(200).json({status: "Success"});
      }
    }
  });

});

module.exports = app;
