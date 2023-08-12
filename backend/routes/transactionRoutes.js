const express = require("express");
const router = express.Router();
const { saveTransaction } = require("../controllers/transactionController");

router.post("/save-transaction", saveTransaction);

module.exports = router;
