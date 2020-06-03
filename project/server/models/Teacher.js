var mongoose = require("mongoose");

var TeacherSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    classesTaught: {type: Array, required: false},
});

var Teacher = mongoose.model("teachers", TeacherSchema);
module.exports = Teacher;
