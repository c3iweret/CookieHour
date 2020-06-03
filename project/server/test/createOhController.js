var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();
var mongoose = require("mongoose");
var assert = require('assert');
http = require('http');
const OfficeHours = require('../models/officehour');

chai.use(chaiHttp);

describe('Office Hour test set', () => {

  describe('add the oh which overlaps with another existing one entirely',
      () => {
        it('should return 403 status and return the error message \'There is a clash with...\'',
            (done) => {
              let officeHour = {
                heldBy: "matt@email.com",
                startTime: "13:00",
                endTime: "14:00",
                lengthOfBookings: 60,
                date: "19/03/2019",
                courseName: "csc302",
                booking: {}
              };
              let response = {
                err: 'There is a clash with another office hour for this slot '
                    + officeHour.startTime + " - " + officeHour.endTime
              };
              chai.request(server)
              .post('/teacher/create-office-hours')
              .send(officeHour)
              .end((err, res) => {
                res.should.have.status(403);
                res.body.should.be.eql(response);
                done();
              });
            });
      });

  describe(
      'add the oh which overlaps with another existing one by start time only',
      () => {
        it('should return 403 status and return the error message \'There is a clash with...\'',
            (done) => {
              let officeHour = {
                heldBy: "matt@email.com",
                startTime: "12:00",
                endTime: "14:00",
                lengthOfBookings: 60,
                date: "19/03/2019",
                courseName: "csc302",
                booking: {}
              };
              let response = {
                err: 'There is a clash with another office hour for this slot '
                    + officeHour.startTime + " - " + officeHour.endTime
              };
              chai.request(server)
              .post('/teacher/create-office-hours')
              .send(officeHour)
              .end((err, res) => {
                res.should.have.status(403);
                res.body.should.be.eql(response);
                done();
              });
            });
      });

  describe(
      'add the oh which overlaps with another existing one by end time only',
      () => {
        it('should return 403 status and return the error message \'There is a clash with...\'',
            (done) => {
              let officeHour = {
                heldBy: "matt@email.com",
                startTime: "13:30",
                endTime: "15:00",
                lengthOfBookings: 60,
                date: "19/03/2019",
                courseName: "csc302",
                booking: {}
              };
              let response = {
                err: 'There is a clash with another office hour for this slot '
                    + officeHour.startTime + " - " + officeHour.endTime
              };

              chai.request(server)
              .post('/teacher/create-office-hours')
              .send(officeHour)
              .end((err, res) => {
                res.should.have.status(403);
                res.body.should.be.eql(response);
                done();
              });
            });
      });

  describe('Try to delete non existing office Hour',
      () => {
        it('should return 404 status and return the error message \'The specified OH was not found.\'',
            (done) => {
              let officeHour = {
                heldBy: "matt@email.com",
                startTime: "13:00",
                endTime: "14:00",
                lengthOfBookings: 60,
                date: "11/03/2089",
                courseName: "csc302",
                booking: {}
              };
              let response = {
                err: "The specified OH was not found."
              };
              chai.request(server)
              .delete('/teacher/delete-office-hours')
              .send(officeHour)
              .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.eql(response);
                done();
              });
            });
      });

  describe('Create an office hour',
      () => {
        it('should return 200 status and create an entry in the database (there must be no entry in the database for the selected time though)',
            (done) => {
              let officeHour = {
                heldBy: "matt@email.com",
                startTime: "13:00",
                endTime: "14:00",
                lengthOfBookings: 60,
                date: "01/05/1810",
                courseName: "csc302",
                booking: {}
              };
              let response = {
                status: 'Success!'
              };
              chai.request(server)
              .post('/teacher/create-office-hours')
              .send(officeHour)
              .end((err, res) => {
                res.body.should.be.eql(response);
                res.should.have.status(200);
                done();
              });
            });
      });

  describe('Delete existing office Hour',
      () => {
        it('should return 200 status and delete the entry in the database (the entry must exist)',
            (done) => {
              let officeHour = {
                heldBy: "matt@email.com",
                startTime: "13:00",
                endTime: "14:00",
                lengthOfBookings: 60,
                date: "01/05/1810",
                courseName: "csc302",
                booking: {}
              };
              let response = {
                status: "Successfully deleted the OH and all its meetings."
              };
              chai.request(server)
              .delete('/teacher/delete-office-hours')
              .send(officeHour)
              .end((err, res) => {
                res.body.should.be.eql(response);
                res.should.have.status(200);
                done();
              });
            });
      });

});