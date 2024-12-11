/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBrand } from "../../../features/Admin/adminBrandSlice";
import { getAllBrands } from "../../../features/brand/brandsSlice";
import ImageUploadOne from "../../images/ImageUploadOne";

const UpdateBrand = ({ editBrand, onClose }) => {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brand.brands);

  useEffect(() => {
    console.log("UpdateBrand: ", brands);
    console.log('Brand:', editBrand);
  }, [brands, editBrand]);

  const [error, setError] = useState("");
  const [updatedBrand, setUpdatedBrand] = useState({
    name: "",
    image: null,
  });

  useEffect(() => {
    if (editBrand) {
      setUpdatedBrand({
        name: editBrand.name || "",
        image: editBrand.image || null,
      });
      setError("");
    }
  }, [editBrand]);

  const duplicateCategory = useMemo(() => {
    return brands.find(
      (cat) => cat.name.toLowerCase().trim() === updatedBrand.name.toLowerCase().trim() && cat._id !== editBrand._id
    );
  }, [brands, updatedBrand.name, editBrand._id]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setUpdatedBrand((prev) =>({ ...prev, [name]: value }));
  },[]);

  const handleImageUpload = useCallback((url) => {
    setUpdatedBrand((prev) => ({ ...prev, image: url }));
  },[]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (duplicateCategory) {
        setError("Thương hiệu đã tồn tại.");
        return;
      }
      try {
        await dispatch(
          updateBrand({
            id: editBrand._id,
            editBrand: updatedBrand,
          })
        ).unwrap();
        setUpdatedBrand({ name: "", image: null });
        dispatch(getAllBrands());
        onClose();
      } catch (error) {
        setError("Error edit category", error);
      }
    },[dispatch, updatedBrand, editBrand._id, duplicateCategory, onClose]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="mb-4 text-xl font-semibold tracking-wide">
        Cập nhật thương hiệu <span className="font-bold">{editBrand.name}</span></h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium">Brand Name</label>
          <input
            type="text"
            name="name"
            value={updatedBrand.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            required
          />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium">Logo</label>
          <ImageUploadOne onUploadComplete={handleImageUpload} existingUrl={editBrand.image} />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Cập nhật thương hiệu
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

export default UpdateBrand;
