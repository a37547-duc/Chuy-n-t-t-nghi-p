import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProduct } from "../../../features/Admin/adminProductsSlice";
import { getAllBrands } from "../../../features/brand/brandsSlice";
import { getAllCategories } from "../../../features/category/categoriesSlice";
import { getAllProducts } from "../../../features/product/productsSlice";
import ImageUpload from "../../images/ImageUpload";

const UpdateProduct = ({ onClose, data }) => {
  const dispatch = useDispatch();
  const { categories, loading: loadingCategories } = useSelector((state) => state.category);
  const { brands, loading: loadingBrands } = useSelector((state) => state.brand);

  const [formData, setFormData] = useState({
    name: data?.name || "",
    category: data?.category?._id || "",
    brand: data?.brand?._id || "",
    description: data?.description || "",
    images: data?.images || [],
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllBrands());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (url) => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, url],
    }));
  };

  const handleImageRemove = (url) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((image) => image !== url),
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Tên sản phẩm là bắt buộc";
    if (!formData.category) newErrors.category = "Danh mục là bắt buộc";
    if (!formData.brand) newErrors.brand = "Thương hiệu là bắt buộc";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      console.log(data._id);
      await dispatch(updateProduct({ id: data._id, updatedProduct: formData })).unwrap();
      setTimeout(() => {
        dispatch(getAllProducts());
      }, 2000);
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="mb-4 text-xl font-semibold tracking-wide">Cập nhật sản phẩm</h2>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium">Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`mt-1 block w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Danh mục</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className={`mt-1 block w-full border ${errors.category ? 'border-red-500' : 'border-gray-300'} focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2`}
          >
            <option disabled value="">Chọn danh mục</option>
            {loadingCategories ? (
              <option disabled>Đang tải...</option>
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
            value={formData.brand}
            onChange={handleInputChange}
            className={`mt-1 block w-full border ${errors.brand ? 'border-red-500' : 'border-gray-300'} focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2`}
          >
            <option disabled value="">Chọn thương hiệu</option>
            {loadingBrands ? (
              <option disabled>Đang tải...</option>
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
        <label className="block text-sm font-medium">Mô tả</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
          rows="4"
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium">Hình ảnh</label>
        <ImageUpload
          onUpload={handleImageUpload}
          onRemove={handleImageRemove}
          existingImages={formData.images}
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Cập nhật sản phẩm
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Đóng
        </button>
      </div>
    </form>
  );
};

export default UpdateProduct;
