const express = require("express");
const cors = require("cors");

const home = require("../routes/home");
const userRoute = require("../routes/user.route")
const error = require("../middleware/error");

module.exports = function (app) {
  //middleware
  app.use(cors());
  app.use(express.static("public"));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  //routes
  app.use("/", home);
  app.use("/api", userRoute)

  //error
  app.use(error);
};
