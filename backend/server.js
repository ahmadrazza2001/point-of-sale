const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const { body, validationResult } = require("express-validator");
const port = process.env.PORT || 5000;

const app = express();
// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

const dbConnection = require("./db");

const productRoutes = require("./routes/productRoutes");
const saleRoutes = require("./routes/saleRoutes");

app.use("/api/products", productRoutes);
app.use("/api/sales", saleRoutes);

// Rate limiting

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Connect to the database
dbConnection();

// Start the server
app.listen(port, () =>
  console.log(`Node/Express Server started on port ${port}`)
);
