const mongoose = require("mongoose");

//for create table into db
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
  },
  {
    //for date
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
