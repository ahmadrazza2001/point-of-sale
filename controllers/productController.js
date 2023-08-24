const Product = require("../models/productModel");

//for add or fetch
exports.getProductController = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.json("error fetching products");
  }
};

//for add
exports.addProductController = async (req, res) => {
  try {
    const newProducts = new Product(req.body);
    await newProducts.save();
    res.status(200).send("Products Created Successfully!");
  } catch (error) {
    console.log(error);
  }
};

//for update
exports.updateProductController = async (req, res) => {
  try {
    await Product.findOneAndUpdate({ _id: req.body.productId }, req.body, {
      new: true,
    });
    res.status(201).json("Product Updated!");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

//for delete
exports.deleteProductController = async (req, res) => {
  try {
    await Product.findOneAndDelete({ _id: req.body.productId });
    res.status(200).json("Product Deleted!");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};
