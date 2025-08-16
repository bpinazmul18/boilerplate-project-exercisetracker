const express = require("express");
const router = express.Router();

const { User } = require("../models/user.model");

router.post("/users", async (req, res) => {
  const { username } = req.body;

  const newUser = new User({ username, logs: [] });
  const user = await newUser.save();

  res.json({ username: user.username, _id: user._id });
});

router.get("/users", async (req, res) => {
  const users = await User.find({}, "username _id");

  return res.json(users);
});

router.post("/users/:_id/exercises", async (req, res) => {
  const { description, duration, date } = req.body;

  const user = await User.findOne({ _id: req.params._id });

  const exerciseDate = date ? new Date(date) : new Date();
  const formattedDate = exerciseDate.toDateString();

  const exercise = {
    description,
    duration: Number(duration),
    date: formattedDate,
  };

  user.logs.push(exercise);
  const result = await user.save();

  return res.json({
    username: result.username,
    _id: result._id,
    ...exercise,
  });
});

module.exports = router;
