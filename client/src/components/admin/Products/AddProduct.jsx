import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrands } from "../../../features/brand/brandsSlice";
import { getAllCategories } from "../../../features/category/categoriesSlice";
import { addProduct } from "../../../features/Admin/adminProductsSlice";
import { getAllProducts } from "../../../features/product/productsSlice";
import ImageUpload from "../../../components/images/ImageUpload";

const AddProduct = ({ onClose }) => {
  const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    brand: "",
    description: "",
    images: [],
  });
  const [errors, setErrors] = useState({});

  const { categories, loading: categoriesLoading } = useSelector((state) => state.category);
  const { brands, loading: brandsLoading } = useSelector((state) => state.brand);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllBrands());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleImageUpload = (url) => {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      images: [...prevProduct.images, url],
    }));
  };

  const handleRemoveImage = (url) => {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      images: prevProduct.images.filter((image) => image !== url),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newProduct.name) newErrors.name = "Tên sản phẩm không được để trống.";
    if (!newProduct.category) newErrors.category = "Danh mục không được để trống.";
    if (!newProduct.brand) newErrors.brand = "Thương hiệu không được để trống.";
    if (!newProduct.images.length) newErrors.images = "Hình ảnh không được để trống.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(addProduct(newProduct))
        .unwrap()
        .then(() => {
          console.log("Product added successfully");
          dispatch(getAllProducts());
          onClose();
        })
        .catch((error) => {
          console.error("Error adding product:", error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="mb-4 text-xl font-semibold tracking-wide">Thêm sản phẩm mới</h2>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium">Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
      <div>
          <label className="block text-sm font-medium">Danh mục</label>
          <select
            name="category"
            value={newProduct.category}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            required
          >
            <option value="">Chọn danh mục</option>
            {categoriesLoading ? (
              <option>Đang tải...</option>
            ) : (
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))
            )}
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Thương hiệu</label>
          <select
            name="brand"
            value={newProduct.brand}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            required
          >
            <option value="">Chọn thương hiệu</option>
            {brandsLoading ? (
              <option>Đang tải...</option>
            ) : (
              brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))
            )}
          </select>
          {errors.brand && <p className="text-red-500 text-sm">{errors.brand}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Mô tả sản phẩm</label>
        <textarea
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
          rows="4"
          required
        ></textarea>
      </div>
      
      <div>
        <label className="block text-sm font-medium">Hình ảnh</label>
        <ImageUpload
          onUpload={handleImageUpload}
          onRemove={handleRemoveImage}
          existingImages={newProduct.images}
        />
        {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Thêm sản phẩm
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Đóng
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
