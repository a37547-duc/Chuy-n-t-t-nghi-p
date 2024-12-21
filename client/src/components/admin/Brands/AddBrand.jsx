import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ImageUploadOne from "../../images/ImageUploadOne";
import { addBrand } from "../../../features/Admin/adminBrandSlice";
import { getAllBrands } from "../../../features/brand/brandsSlice";

// eslint-disable-next-line react/prop-types
const AddBrand = ({ onClose }) => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brand.brands);
  
  const [error, setError] = useState("");
  const [newBrand, setNewBrand] = useState({
    name: "",
    image: null,
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
      setNewBrand((prev) => ({ ...prev, [name]: value }));
  },[]);

  const handleImageUpload = useCallback((url) => {
    setNewBrand((prev) => ({ ...prev, image: url }));
  },[]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const trimmedName = newBrand.name.trim().toLowerCase();
      const isDuplicate = brands.some(
        (brand) => brand.name.toLowerCase() === trimmedName
      );

      if (isDuplicate) {
        setError("Danh mục đã tồn tại. Vui lòng nhập tên khác.");
        return;
      }

      try {
        await dispatch(addBrand(newBrand));
        dispatch(getAllBrands());
        setNewBrand({ name: "", image: null });
        onClose();
      } catch (error) {
        setError("Error adding brand:", error);
      }
  },[brands, newBrand, dispatch, onClose]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="mb-4 text-xl font-semibold tracking-wide">Thêm thương hiệu mới</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium">Brand Name</label>
          <input
            type="text"
            name="name"
            value={newBrand.name}
            onChange={handleChange}
            className={`mt-1 block w-full border ${error ? "border-red-500" : "border-gray-300"} 
              focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2`
            }
            required
          />
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium">Logo</label>
          <ImageUploadOne onUploadComplete={handleImageUpload} existingUrl={newBrand.image} />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Thêm thương hiệu
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

export default AddBrand;

