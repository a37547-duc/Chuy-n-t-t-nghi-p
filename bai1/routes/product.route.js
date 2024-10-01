const express = require("express");

const {
  getAllProducts,
  getDetailProduct,
  getCategoryProduct,
  getBrand,
} = require("../controllers/product.controller");

const router = express.Router();

router.get("/", getAllProducts);

router.get("/category/", getCategoryProduct);
router.get("/brand", getBrand);
router.get("/:id", getDetailProduct); // dynamic route

module.exports = router;

//  Cần bổ sung middleware
