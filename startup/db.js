const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function () {
  const db = process.env.dbURI;
  mongoose
    .connect(db)
    .then(() => winston.info(`Connected to MongoDB: ${db}`))
    .catch((ex) => console.log(ex));
};
