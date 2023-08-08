const router = require("express").Router();
//const multer = require("multer");
const Product = require("../models/productModel");

//create new product
router.post("/add-product", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();

    res.send({
      success: true,
      message: "Product added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

//get all products
router.get("/get-all-products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});
