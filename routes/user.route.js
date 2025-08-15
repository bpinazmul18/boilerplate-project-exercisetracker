const express = require("express");
const router = express.Router();

const { User } = require("../models/user.model");

router.post("/users", async (req, res) => {
  const { username } = req.body;

  const newUser = new User({ username });
  const user = await newUser.save();

  res.json({ username: user.username, _id: user._id });
});

router.get("/users", async (req, res) => {
  const users = await User.find({}, "username _id");

  return res.json(users);
});

module.exports = router;
