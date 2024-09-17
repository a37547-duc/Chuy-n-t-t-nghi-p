import React, { useState } from "react";

const AddProduct = ({ onSave, onClose }) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    technology: "",
    price: "",
    details: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setNewProduct({ ...newProduct, image: files[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(newProduct);
    setNewProduct({ name: "", category: "", technology: "", price: "", details: "", image: null });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="mb-4 text-xl font-semibold tracking-wide">Thêm sản phẩm mới</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
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
            value={newProduct.category}
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
            value={newProduct.technology}
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
            value={newProduct.price}
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
            value={newProduct.details}
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
          Save Product
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

export default AddProduct;
