const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error: ", error);
    process.exit(1);
  }
};

module.exports = dbConnection;