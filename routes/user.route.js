const express = require("express");
const router = express.Router();

const { User } = require("../models/user.model");

router.post("/users", async (req, res) => {
  const { username } = req.body;

  const newUser = new User({ username, log: [] });
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

  user.log.push(exercise);
  const result = await user.save();

  return res.json({
    username: result.username,
    _id: result._id,
    ...exercise,
  });
});

router.get("/users/:_id/logs", async (req, res) => {
  const { from, to, limit } = req.query;

  const user = await User.findById(req.params._id);
  if (!user) return res.status(404).json({ error: "User not found" });

  let log = [...user.log];

  if (from) {
    const fromDate = new Date(from);
    log = log.filter((ex) => new Date(ex.date) >= fromDate);
  }

  if (to) {
    const toDate = new Date(to);
    log = log.filter((ex) => new Date(ex.date) <= toDate);
  }

  if (limit) {
    log = log.slice(0, parseInt(limit));
  }
  // Ensure date is in "toDateString" format
  log = log.map((ex) => ({
    description: ex.description,
    duration: ex.duration,
    date: new Date(ex.date).toDateString(),
  }));

  res.json({
    username: user.username,
    count: log.length,
    _id: user._id,
    log,
  });
});

module.exports = router;
