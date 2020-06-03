var mongoose = require("mongoose");

var StudentSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    classesEnrolled: {type: Array, required: false},
});

var Student = mongoose.model("students", StudentSchema);
module.exports = Student;
