const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(morgan("dev"));
app.use(express.json());

// Routes
const productRoutes = require("./routes/productsRoutes");
const userRoutes = require("./routes/userRoutes");
const billsRoutes = require("./routes/billsRoutes");

app.use("/api/products", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/bills", billsRoutes);

// DB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
