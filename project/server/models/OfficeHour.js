var mongoose = require("mongoose");

var OfficeHourSchema = new mongoose.Schema({
    heldBy: {type: String, required: true},
    startTime: {type: String, required: true},
    endTime: {type: String, required: true},
    lengthOfBookings: {type: Number, required: true},
    date: {type: String, required: true},
    courseName: {type: String, required: true},
    booking: {type: Object, required: true}

});

var OfficeHour = mongoose.model("officehours", OfficeHourSchema);
module.exports = OfficeHour;
