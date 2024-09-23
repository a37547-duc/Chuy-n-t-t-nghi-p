/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const UpdateUser = ({ user, onUpdate, onClose }) => {
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    category: "",
    technology: "",
    price: "",
    details: "",
    image: null,
  });

  useEffect(() => {
    // Populate the form with the existing user data when the modal opens
    if (user) {
        setUpdatedUser({
        name: user.name || "",
        category: user.category || "",
        technology: user.technology || "",
        price: user.price || "",
        details: user.details || "",
        image: null, // Image should be updated via file input
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files && files.length > 0) {
        setUpdatedUser({ ...updatedUser, image: files[0] });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedUser);
    setUpdatedUser({ name: "", category: "", technology: "", price: "", details: "", image: null });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="mb-4 text-xl font-semibold tracking-wide">Cập nhật người dùng <span className="font-bold">{user}</span></h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">User Name</label>
          <input
            type="text"
            name="name"
            value={updatedUser.name}
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
            value={updatedUser.category}
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
            value={updatedUser.technology}
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
            value={updatedUser.price}
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
            value={updatedUser.details}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">User Image</label>
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
          Update User
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

export default UpdateUser;
