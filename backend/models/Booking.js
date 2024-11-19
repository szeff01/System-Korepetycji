const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

const BookingModel = mongoose.model("Booking", BookingSchema);

module.exports = BookingModel;
