//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
var mongoose = require("mongoose");
var assert = require('assert');
http = require('http');
const Meeting = require('../models/meeting');
const OfficeHours = require('../models/officehour');

chai.use(chaiHttp);
//Our parent block
describe('Meeting', () => {

  describe('add meeting with invalid student user', () => {
    it('it should throw "no such user" error', (done) => {
      let meeting = {
        "studentEmail": "misann@email.com",
        "teacherEmail": "matt@email.com",
        "date": "19/03/2019",
        "startTime": "13:30",
        "day": "Tuesday",
        "agenda": "confused about A1",
        "courseName": "CSC302"
      };
      let response = {err: 'no such user ' + "misann@email.com"};
      chai.request(server)
      .post('/meeting/create/student')
      .send(meeting)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.eql(response);
        done();
      });
    });
  });

  describe('add meeting with already booked slot', () => {
    it('it should throw "chosen time is already taken" error', (done) => {
      let meeting = {
        "studentEmail": "misan@email.com",
        "teacherEmail": "matt@email.com",
        "date": "19/03/2019",
        "startTime": "13:30",
        "agenda": "confused about A1",
        "courseName": "CSC302"
      };
      let response = {err: "chosen meeting time is already taken"};
      chai.request(server)
      .post('/meeting/create/student')
      .send(meeting)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.eql(response);
        done();
      });
    });
  });

  describe('add meeting for nonexistent office hours', () => {
    it('it should throw "office hours for that date does not exist" error',
        (done) => {
          let meeting = {
            "studentEmail": "misan@email.com",
            "teacherEmail": "matt@email.com",
            "date": "05/03/2019",
            "startTime": "13:30",
            "agenda": "confused about A1",
            "courseName": "CSC302"
          };
          let response = {err: "office hours for that date does not exist"};
          chai.request(server)
          .post('/meeting/create/student')
          .send(meeting)
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.eql(response);
            done();
          });
        });
  });

  describe('add meeting that does not agree with length of booking', () => {
    it('it should throw "invalid booking time" error', (done) => {
      let meeting = {
        "studentEmail": "misan@email.com",
        "teacherEmail": "matt@email.com",
        "date": "19/03/2019",
        "startTime": "13:20",
        "agenda": "confused about A1",
        "courseName": "CSC302"
      };
      let response = {err: "Invalid booking time"};
      chai.request(server)
      .post('/meeting/create/student')
      .send(meeting)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.eql(response);
        done();
      });
    });
  });

  describe('add meeting for time outside of office hours interval', () => {
    it('it should throw "invalid start time" error', (done) => {
      let meeting = {
        "studentEmail": "misan@email.com",
        "teacherEmail": "matt@email.com",
        "date": "19/03/2019",
        "startTime": "14:00",
        "agenda": "confused about A1",
        "courseName": "CSC302"
      };
      let response = {err: "invalid start time"};
      chai.request(server)
      .post('/meeting/create/student')
      .send(meeting)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.eql(response);
        done();
      });
    });
  });

  describe('Student add meeting with a comment', () => {
    it('it should return status 200', (done) => {
      let meeting = {
        "studentEmail": "adam@email.com",
        "teacherEmail": "matt@email.com",
        "date": "19/03/2019",
        "startTime": "13:15",
        "agenda": "confused about A1",
        "comment": "this is a comment",
        "courseName": "CSC302"
      };
      let response = {status: 'Success'};
      chai.request(server)
      .post('/meeting/create/student')
      .send(meeting)
      .end((err, res) => {
        res.body.should.be.eql(response);
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('Student - delete a comment to a previously created meeting', () => {
    it('it should return status 200', (done) => {
      let meeting = {
        "studentEmail": "adam@email.com",
        "teacherEmail": "matt@email.com",
        "date": "19/03/2019",
        "startTime": "13:15",
        "courseName": "CSC302"
      };
      let response = {status: 'Comment successfully deleted'};
      chai.request(server)
      .delete('/meeting/delete-comment')
      .query(meeting)
      .end((err, res) => {
        res.body.should.be.eql(response);
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('Student - delete a previously created meeting', () => {
    it('it should return status 200', (done) => {
      let meeting = {
        "studentEmail": "adam@email.com",
        "teacherEmail": "matt@email.com",
        "date": "19/03/2019",
        "startTime": "13:15",
        "courseName": "CSC302"
      };
      let response = {status: 'successfully deleted meeting'};
      chai.request(server)
      .delete('/meeting/delete')
      .query(meeting)
      .end((err, res) => {
        res.body.should.be.eql(response);
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('Student add meeting', () => {
    it('it should return status 200', (done) => {
      let meeting = {
        "studentEmail": "adam@email.com",
        "teacherEmail": "matt@email.com",
        "date": "01/05/2019",
        "startTime": "13:00",
        "agenda": "confused about A1",
        "courseName": "CSC302"
      };
      let response = {status: 'Success'};
      chai.request(server)
      .post('/meeting/create/student')
      .send(meeting)
      .end((err, res) => {
        res.body.should.be.eql(response);
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('Retrieve a meeting by the student', () => {
    it('it should return status 200', (done) => {
      let meeting = {
        "studentEmail": "adam@email.com",
        "date": "01/05/2019",
        "teacherEmail": "matt@email.com",
        "startTime": "13:00",
        "courseName": "CSC302"
      };
      let meeting_in_db = {
        "studentEmail": "adam@email.com",
        "teacherEmail": "matt@email.com",
        "date": "01/05/2019",
        "startTime": "13:00",
        "agenda": "confused about A1",
        "courseName": "CSC302"
      };
      chai.request(server)
      .get('/meeting/get-meeting')
      .query(meeting)
      .end((err, res) => {
        res.body[0].studentEmail.should.be.eql(meeting_in_db.studentEmail);
        res.body[0].teacherEmail.should.be.eql(meeting_in_db.teacherEmail);
        res.body[0].date.should.be.eql(meeting_in_db.date);
        res.body[0].startTime.should.be.eql(meeting_in_db.startTime);
        res.body[0].agenda.should.be.eql(meeting_in_db.agenda);
        res.body[0].courseName.should.be.eql(meeting_in_db.courseName);
        res.body[0].note.should.be.eql("");
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('Retrieve a meeting by the teacher', () => {
    it('it should return status 200', (done) => {
      let meeting = {
        "studentEmail": "adam@email.com",
        "teacherEmail": "matt@email.com",
        "date": "01/05/2019",
        "startTime": "13:00",
        "courseName": "CSC302"
      };
      let meeting_in_db = {
        "studentEmail": "adam@email.com",
        "teacherEmail": "matt@email.com",
        "date": "01/05/2019",
        "startTime": "13:00",
        "agenda": "confused about A1",
        "courseName": "CSC302"
      };
      let response = {status: 'Success'};
      chai.request(server)
      .get('/meeting/get-meeting')
      .query(meeting)
      .end((err, res) => {
        res.body[0].studentEmail.should.be.eql(meeting_in_db.studentEmail);
        res.body[0].teacherEmail.should.be.eql(meeting_in_db.teacherEmail);
        res.body[0].date.should.be.eql(meeting_in_db.date);
        res.body[0].startTime.should.be.eql(meeting_in_db.startTime);
        res.body[0].agenda.should.be.eql(meeting_in_db.agenda);
        res.body[0].courseName.should.be.eql(meeting_in_db.courseName);
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('Instructor - delete a comment to a previously created meeting',
      () => {
        it('it should return status 200', (done) => {
          let meeting = {
            "studentEmail": "adam@email.com",
            "teacherEmail": "matt@email.com",
            "date": "01/05/2019",
            "startTime": "13:00",
            "courseName": "CSC302"
          };
          let response = {status: 'Comment successfully deleted'};
          chai.request(server)
          .delete('/meeting/delete-comment')
          .query(meeting)
          .end((err, res) => {
            res.body.should.be.eql(response);
            res.should.have.status(200);
            done();
          });
        });
      });

  // describe('Instructor - get the calendar for the event',
  //     () => {
  //       it('it should return status 200', (done) => {
  //         let meeting = {
  //           "studentEmail": "adam@email.com",
  //           "teacherEmail": "matt@email.com",
  //           "date": "01/05/2019",
  //           "startTime": "13:00",
  //           "courseName": "CSC302"
  //         };
  //         let response = {status: 'Success'};
  //         chai.request(server)
  //         .get('/meeting/meeting-ical-file')
  //         .query(meeting)
  //         .end((err, res) => {
  //           res.body.should.be.eql(response);
  //           res.should.have.status(200);
  //           done();
  //         });
  //       });
  //     });

  describe('Student - delete a previously created meeting', () => {
    it('it should return status 200', (done) => {
      let meeting = {
        "studentEmail": "adam@email.com",
        "teacherEmail": "matt@email.com",
        "date": "01/05/2019",
        "startTime": "13:00",
        "courseName": "CSC302"
      };
      let response = {status: 'successfully deleted meeting'};
      chai.request(server)
      .delete('/meeting/delete')
      .query(meeting)
      .end((err, res) => {
        res.body.should.be.eql(response);
        res.should.have.status(200);
        done();
      });
    });
  });

});
