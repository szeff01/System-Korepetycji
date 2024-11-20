const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    reviews: { type: Number, required: true },
    location: { type: String, required: true },
    profilePicture: { type: String, required: true },
    availability: { type: [String], required: true }, 
    categories: { type: [String], required: true },
  });
  
  const TeacherModel = mongoose.model("Teacher", TeacherSchema);
  
  module.exports = TeacherModel;
  
