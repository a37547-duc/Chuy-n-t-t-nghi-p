const express = require("express");

const {
  getAllProducts,
  getDetailProduct,
  getCategoryProduct,
} = require("../controllers/product.controller");

const router = express.Router();

router.get("/", getAllProducts);

router.get("/category/", getCategoryProduct);

router.get("/:id", getDetailProduct); // dynamic route

module.exports = router;

//  Cần bổ sung middleware
