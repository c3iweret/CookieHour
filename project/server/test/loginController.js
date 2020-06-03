//Require the dev-dependencies
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
var mongoose = require("mongoose");
var assert = require('assert');
http = require('http');

chai.use(chaiHttp);
//Our parent block
describe('Login', () => {

  describe('login existing student user', () => {
    it('it should successfuly log in student', (done) => {
      let student = {"email": "misan@email.com", "password": "misan"};
      let response = {status: "Success"};
      chai.request(server)
      .post('/student/login')
      .send(student)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eql(response);
        done();
      });
    });
  });

  describe('login student with correct email but wrong password', () => {
    it('it should return "invalid username or password" error message',
        (done) => {
          let student = {"email": "misan@email.com", "password": "misannn"};
          let error = {
            "err": "invalid username or password"
          };
          chai.request(server)
          .post('/student/login')
          .send(student)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.eql(error);
            done();
          });
        });
  });

  describe('login student with wrong email', () => {
    it('it should "no student with that username" error message', (done) => {
      let student = {"email": "misannn@email.com", "password": "misannn"};
      let error = {
        "err": "No student with username: " + "misannn@email.com"
      };
      chai.request(server)
      .post('/student/login')
      .send(student)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.eql(error);
        done();
      });
    });
  });

  describe('login existing teacher user', () => {
    it('it should successfuly log in teacher', (done) => {
      let student = {"email": "matt@email.com", "password": "matt"};
      let response = {status: "Success"};
      chai.request(server)
      .post('/teacher/login')
      .send(student)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eql(response);
        done();
      });
    });
  });

  describe('login teacher with correct email but wrong password', () => {
    it('it should return "invalid username or password" error message',
        (done) => {
          let student = {"email": "matt@email.com", "password": "misannn"};
          let error = {
            "err": "invalid username or password"
          };
          chai.request(server)
          .post('/teacher/login')
          .send(student)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.eql(error);
            done();
          });
        });
  });

  describe('login teacher with wrong email', () => {
    it('it should "no teacher with that username" error message', (done) => {
      let student = {"email": "misannn@email.com", "password": "misannn"};
      let error = {
        "err": "No teaching staff with username: " + "misannn@email.com"
      };
      chai.request(server)
      .post('/teacher/login')
      .send(student)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.eql(error);
        done();
      });
    });
  });

});
