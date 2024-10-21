const Product = require("../models/productModel");

const ProductVariant = require("../models/Products_Skus/productSkudModel");

const Category = require("../models/categoryModel");
const Brand = require("../models/brandModel");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $lookup: {
          from: "categories", // Collection "categories"
          localField: "category", // Trường 'category' trong Product
          foreignField: "_id", // Liên kết với _id của category
          as: "category",
        },
      },
      {
        $unwind: "$category", // Biến category từ mảng thành object
      },
      {
        $lookup: {
          from: "brands", // Collection "brands"
          localField: "brand", // Trường 'brand' trong Product
          foreignField: "_id", // Liên kết với _id của brand
          as: "brand",
        },
      },
      {
        $unwind: "$brand",
      },
      {
        $lookup: {
          from: "usecases", // Collection "usecases"
          localField: "use_case_ids", // Trường 'use_case_ids' trong Product
          foreignField: "_id", // Liên kết với _id của use cases
          as: "use_cases",
        },
      },
      {
        $unwind: "$use_cases",
      },
      {
        $sort: { "category.name": 1 },
      },
      {
        $project: {
          name: 1, // Chỉ lấy trường name của sản phẩm
          price: 1, // Chỉ lấy trường price của sản phẩm
          images: 1,
          status: 1,
          "category.name": 1,
          "brand.name": 1,
          "use_cases.name": 1,
        },
      },
    ]);
    res.json({ products });
  } catch (error) {
    console.log("Error in getAllProducts controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getDetailProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Truy vấn variants dựa trên productId
    const variants = await ProductVariant.find({ productId }).populate(
      "productId",
      "name images description"
    );

    if (!variants || variants.length === 0) {
      console.log("Id này chưa có sản phẩm nào");
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm với id này" });
    }

    const productDetails = {
      _id: variants[0].productId._id,
      name: variants[0].productId.name,
      images: variants[0].productId.images,
      description: variants[0].productId.description,
    };

    const response = {
      product: productDetails,
      variants: variants.map((variant) => ({
        _id: variant._id,
        color: variant.color,
        storage: variant.storage,
        price: variant.price,
        stock_quantity: variant.stock_quantity,
        gpu: variant.gpu,
        cpu: variant.cpu,
        ram: variant.ram,
      })),
    };

    // Trả về danh sách variants cùng với chi tiết sản phẩm
    res.status(200).json(response);
  } catch (error) {
    console.error("Lỗi khi lấy variants sản phẩm:", error);
    res
      .status(500)
      .json({ message: "Lỗi khi lấy variants sản phẩm", error: error.message });
  }
};

const getCategoryProduct = async (req, res) => {
  const data = await Category.find({});
  res.status(200).json(data);
};

const getBrand = async (req, res) => {
  const data = await Brand.find({});
  res.status(200).json(data);
};
const getBrandsByCategoryId = async (req, res) => {
  try {
    const categoryId = req.params.id;

    // Lấy danh sách các hãng sản phẩm thuộc về category
    const brands = await Brand.find({ category_id: categoryId });

    res.status(200).json(brands);
  } catch (error) {
    console.error("Lỗi lấy brands bằng category", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getAllProducts,
  getDetailProduct,
  getCategoryProduct,
  getBrand,
  getBrandsByCategoryId,
};

// Cần bổ sung thêm các middleware
