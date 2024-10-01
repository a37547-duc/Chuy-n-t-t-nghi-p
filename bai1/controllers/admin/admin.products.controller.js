const Product = require("../../models/productModel");
const ProductVariant = require("../../models/Products_Skus/productSkudModel");
const Brand = require("../../models/brandModel");

// CÁC CHỨC NĂNG Products (Sản phẩm)
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, brand, images, use_case_ids } =
      req.body;

    const product = new Product({
      name,
      description,
      price,
      category,
      brand,
      images,
      use_case_ids, // Thêm use_case_ids vào product
    });

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addProductVariant = async (req, res) => {
  try {
    const productId = req.params.id;
    const variantData = req.body;

    // Kiểm tra xem sản phẩm chính có tồn tại không
    const productExists = await Product.findById(productId);
    if (!productExists) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm chính với ID này" });
    }

    // Tạo một sản phẩm variant mới
    const newVariant = new ProductVariant({
      productId: productId,
      ...variantData,
    });

    const savedVariant = await newVariant.save();

    return res.status(201).json({
      message: "Thêm sản phẩm variant thành công",
      variant: savedVariant,
    });
  } catch (error) {
    console.error("Lỗi thêm sản phẩm variant:", error);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi thêm sản phẩm variant" });
  }
};

const updateProductVariant = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedata = req.body;
    console.log(productId);
    const variantExists = await ProductVariant.findOne({
      _id: productId,
    });

    if (!variantExists) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm variant với ID này ee",
      });
    }

    const updatedVariant = await ProductVariant.findByIdAndUpdate(
      productId,
      { $set: updatedata },
      { new: true } // Trả về bản ghi sau khi cập nhật
    );

    return res.status(200).json({
      message: "Cập nhật sản phẩm variant thành công",
      variant: updatedVariant,
    });
  } catch (error) {
    console.error("Lỗi cập nhật sản phẩm variant:", error);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi cập nhật sản phẩm variant" });
  }
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

// CÁC CHỨC NĂNG  Brand (Thương hiệu)
const createBrand = async (req, res) => {
  try {
    const { name, category_id, description } = req.body;

    // Tạo một Brand mới
    const newBrand = new Brand({
      name,
      category_id: category_id,
      description,
    });

    // Lưu vào cơ sở dữ liệu
    const savedBrand = await newBrand.save();

    res.status(201).json({
      message: "Brand created successfully",
      brand: savedBrand,
    });
  } catch (error) {
    console.error("Error creating brand:", error.message);
    res.status(500).json({ message: "Failed to create brand" });
  }
};

// CÁC CHỨC NĂNG Category (Chuyên mục)
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Tạo một Category mới
    const newCategory = new Category({
      name,
      description,
    });

    // Lưu vào cơ sở dữ liệu
    const savedCategory = await newCategory.save();

    res.status(201).json({
      message: "Category tạo thành công",
      category: savedCategory,
    });
  } catch (error) {
    console.error("Lỗi tạo category:", error.message);
    res.status(500).json({ message: "Lỗi tạo Category" });
  }
};
module.exports = {
  createProduct,
  addProductVariant,
  updateProductVariant,
  getBrandsByCategoryId,
  createBrand,
  createCategory,
};
