import { useState } from "react";

// eslint-disable-next-line react/prop-types
const AddBrand = ({ onSave, onClose }) => {
  const [newBrand, setNewBrand] = useState({
    name: "",
    NumProduct: "",
    description: "",
    Logo: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBrand({ ...newBrand, [name]: value });
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files && files.length > 0) {
        setNewBrand({ ...newBrand, Logo: files[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(newBrand);
    setNewBrand({ name: "", NumProduct: "", description: "", Logo: null });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="mb-4 text-xl font-semibold tracking-wide">Thêm thương hiệu mới</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Brand Name</label>
          <input
            type="text"
            name="name"
            value={newBrand.name}
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
            value={newBrand.NumProduct}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium">Description</label>
          <input
            type="text"
            name="description"
            value={newBrand.description}
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
          Save
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

export default AddBrand;