const mongoose = require("mongoose");
const moment = require("moment");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    maxlength: [100, "Product name cannot exceed 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
    trim: true,
    maxlength: [500, "Product description cannot exceed 500 characters"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price cannot be negative"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: [true, "Category is required"],
  },
  use_case_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UseCase",
      required: false, // Không bắt buộc, vì một số sản phẩm không có tác vụ sử dụng cụ thể
    },
  ],

  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand",
    required: [true, "Brand is required"],
  },
  images: { type: [String], required: true },
  status: {
    type: String,
    enum: ["available", "out of stock", "discontinued"],
    default: "available",
  },
  createdAt: {
    type: String,
    default: moment().format("DD/MM/YYYY HH[h]/mm[p]/ss[s]"),
  },
  updatedAt: {
    type: String,
    default: moment().format("DD/MM/YYYY HH[h]/mm[p]/ss[s]"),
  },
});

// Middleware để cập nhật createdAt và updatedAt trước khi lưu
productSchema.pre("save", function (next) {
  const currentDate = moment().format("DD/MM/YYYY HH[h]/mm[p]/ss[s]");

  // Cập nhật updatedAt mỗi lần lưu
  this.updatedAt = currentDate;

  // Nếu product là mới, cập nhật createdAt
  if (!this.createdAt) {
    this.createdAt = currentDate;
  }

  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
