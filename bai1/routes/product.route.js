const express = require("express");

const {
  getAllProducts,
  getDetailProduct,
  getCategoryProduct,
  getBrand,
  getBrandsByCategoryId,
} = require("../controllers/product.controller");

const router = express.Router();

router.get("/", getAllProducts);

router.get("/category/", getCategoryProduct);
router.get("/brand", getBrand);
router.get("/:id", getDetailProduct); // dynamic route
router.get("/category/:id/brands", getBrandsByCategoryId);
module.exports = router;

//  Cần bổ sung middleware
