const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  cart: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      price: Number,
    },
  ],
  total: Number,
  status: {
    type: String,
    enum: ["success", "failure"],
    default: "success",
  },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
