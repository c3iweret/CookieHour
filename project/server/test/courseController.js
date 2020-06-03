//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
var mongoose = require("mongoose");
var assert = require('assert');
http = require('http');
const sinon = require("sinon");
const Course = require('../models/course');
const courseController = require('../controllers/courseController.js');

var expect = chai.expect;
chai.use(chaiHttp);
//Our parent block
describe('Course', () => {

  // describe('add course with teachers name missing', () => {
  //   it('it should throw validation error', (done) => {
  //     courseObj = {
  //       "code": "csc302",
  //       "numStudents": 1,
  //       "session": {"year": "2019", "semester": "winter"},
  //       "name": "Engineering Large Software Systems",
  //       "officeHours": [],
  //       "studentsEnrolled": ["Kyra Stephen"]
  //     };
  //     let response = {err: "Bad request"};
  //     chai.request(server)
  //     .post('/course/create')
  //     .send(courseObj)
  //     .end((err, res) => {
  //       res.should.have.status(500);
  //       done();
  //     });
  //   });
  // });

  describe('validate invalid email', () => {
    it('it should return false', (done) => {
      expect(courseController.validateEmail('something')).to.be.false;
      done();
    });
  });
});
