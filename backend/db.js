const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongo DB Connection Successfull");
});

connection.on("error", (err) => {
  console.log("Mongo DB Connection Failed");
});

module.exports = connection;
