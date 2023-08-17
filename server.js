import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRouter from "./routes/productsRoutes.js";
import userRouter from "./routes/userRoutes.js";
import billsRouter from "./routes/billsRoutes.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/api/products/", productRouter);
app.use("/api/users/", userRouter);
app.use("/api/bills/", billsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serve at running on the port: ${PORT}`);
});
