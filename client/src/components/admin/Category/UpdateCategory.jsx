/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const UpdateCategory = ({ product, onUpdate, onClose }) => {
  const [updatedCategory, setUpdatedCategory] = useState({
    name: "",
    category: "",
    technology: "",
    price: "",
    details: "",
    image: null,
  });

  useEffect(() => {
    // Populate the form with the existing product data when the modal opens
    if (product) {
      setUpdatedCategory({
        name: product.name || "",
        category: product.category || "",
        technology: product.technology || "",
        price: product.price || "",
        details: product.details || "",
        image: null, // Image should be updated via file input
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCategory({ ...updatedCategory, [name]: value });
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setUpdatedCategory({ ...updatedCategory, image: files[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedCategory);
    setUpdatedCategory({ name: "", category: "", technology: "", price: "", details: "", image: null });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="mb-4 text-xl font-semibold tracking-wide">Cập nhật danh mục</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Category Name</label>
          <input
            type="text"
            name="name"
            value={updatedCategory.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Category</label>
          <input
            type="text"
            name="category"
            value={updatedCategory.category}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Descriptions</label>
          <input
            type="text"
            name="technology"
            value={updatedCategory.technology}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="text"
            name="price"
            value={updatedCategory.price}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium">Details</label>
          <input
            type="text"
            name="details"
            value={updatedCategory.details}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Product Image</label>
          <input
            type="file"
            name="image"
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
          Update Product
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

export default UpdateCategory;
