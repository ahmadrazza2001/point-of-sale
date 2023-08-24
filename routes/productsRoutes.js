const express = require("express");
const router = express.Router();
const productRoutes = require("../controllers/productController");

router.route("/get-products").get(productRoutes.getProductController);
router.route("/add-products").post(productRoutes.addProductController);
router.route("/update-products").put(productRoutes.updateProductController);
router.route("/delete-products").post(productRoutes.deleteProductController);

module.exports = router;
