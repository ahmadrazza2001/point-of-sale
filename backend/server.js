const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const dbConnection = require("./db");
const port = process.env.PORT || 5000;
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const saleRoutes = require("./routes/saleRoutes");

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/sales", saleRoutes);
app.use(cors());
app.use(helmet());

// Rate limiting

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Start the server
app.listen(port, () =>
  console.log(`Node/Express Server started on port ${port}`)
);
