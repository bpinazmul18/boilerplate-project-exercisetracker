const mongoose = require("mongoose");
const { exerciseSchema } = require("./exercise.model");

const userSchema = new mongoose.Schema({
  username: String,
  log: [exerciseSchema],
});

const User = new mongoose.model("User", userSchema);

module.exports.User = User;
