var mongoose = require("mongoose");

var MeetingSchema = new mongoose.Schema({
    studentEmail: {type: String, required: true},
    teacherEmail: {type: String, required: true},
    officeHour_id: {type: String, required: true},
    date: {type: String, required: true} /* format: DD/MM/YYYY */,
    startTime: {type: String, required: true} /* format: HH:MM */,
    agenda: {type: String},
    comment: {type: String},
    note: {type: String},
    courseName: {type: String, required: true}
});

var Meeting = mongoose.model("meetings", MeetingSchema);
module.exports = Meeting;
