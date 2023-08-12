const Transaction = require("../models/Transaction");

exports.saveTransaction = async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res
      .status(201)
      .json({ message: "Transaction saved successfully", data: transaction });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to save transaction", error: error.message });
  }
};
