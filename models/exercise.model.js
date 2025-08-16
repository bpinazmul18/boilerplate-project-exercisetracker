const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  description: String,
  duration: Number,
  date: String,
});

module.exports.exerciseSchema = exerciseSchema;
