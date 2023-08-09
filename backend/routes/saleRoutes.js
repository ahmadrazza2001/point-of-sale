const router = require("express").Router();
//const multer = require("multer");
const Sale = require("../models/saleModel");

//create new sale
router.post("/add-sale", async (req, res) => {
  try {
    const newSale = new Sale(req.body);
    await newSale.save();

    res.send({
      success: true,
      message: "Sale created successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//get all sales
router.get("/get-all-sales", async (req, res) => {
  const sales = await Sale.find();
  res.json(sales);
});

module.exports = router;
