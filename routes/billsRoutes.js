const express = require("express");
const router = express.Router();
const billsRoutes = require("../controllers/billsController");

router.route("/add-bills").post(billsRoutes.addBillsController);
router.route("/get-bills").get(billsRoutes.getBillsController);

module.exports = router;
