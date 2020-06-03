var mongoose = require("mongoose");

var CourseSchema = new mongoose.Schema({
    code: {type: String, required: true},
    numStudents: {type: Number, required: true},
    session: {type: Object, required: true},
    name: {type: String, required: true},
    taughtBy: {type: String, required: true},
    officeHours: {type: Array, required: false},
    studentsEnrolled: {type: Array, required: false}

});

var Course = mongoose.model("courses", CourseSchema);
module.exports = Course;
