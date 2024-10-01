/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const UpdateBrand = ({ brand, onUpdate, onClose }) => {
  console.log('Brand:', brand);
  const [updatedBrand, setUpdatedBrand] = useState({
    name: "",
    NumProduct: "",
    description: "",
    Logo: null,
  });

  useEffect(() => {
    // Populate the form with the existing brand data when the modal opens
    if (brand) {
      console.log('Brand:', brand);
        setUpdatedBrand({
        name: brand.name || "",
        NumProduct: brand.NumProduct || "",
        description: brand.description || "",
        Logo: null, // Image should be updated via file input
      });
    }
  }, [brand]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBrand({ ...updatedBrand, [name]: value });
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files && files.length > 0) {
        setUpdatedBrand({ ...updatedBrand, Logo: files[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedBrand);
    setUpdatedBrand({ name: "", NumProduct: "", description: "", Logo: null });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="mb-4 text-xl font-semibold tracking-wide">Cập nhật thương hiệu <span className="font-bold">{brand}</span></h2>
      <div className="grid grid-cols-2 gap-4">
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
        </div>
        <div>
          <label className="block text-sm font-medium">NumProduct</label>
          <input
            type="number"
            name="NumProduct"
            value={updatedBrand.NumProduct}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium">Descriptions</label>
          <input
            type="text"
            name="descriptions"
            value={updatedBrand.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Brand Logo</label>
          <input
            type="file"
            name="Logo"
            onChange={handleFileChange}
            className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </form>
  );
};

export default UpdateBrand;
