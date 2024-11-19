import { useState } from "react";

// eslint-disable-next-line react/prop-types
const AddCategory = ({ onSave, onClose }) => {
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "", // Nếu bạn muốn giữ lại trường mô tả
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gửi dữ liệu đến API
      const response = await fetch("https://laptech4k.onrender.com/api/v1/admin/products/category/create", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCategory), // Chuyển đổi dữ liệu thành JSON
      });

      if (!response.ok) {
        throw new Error("Failed to create category");
      }

      const savedCategory = await response.json();
      onSave(savedCategory); // Gọi hàm onSave với dữ liệu trả về từ API
      setNewCategory({ name: "", description: "" }); // Reset form
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="mb-4 text-xl font-semibold tracking-wide">Thêm danh mục mới</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium">Category Name</label>
          <input
            type="text"
            name="name"
            value={newCategory.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <input
            type="text"
            name="description"
            value={newCategory.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            required
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
          type="button" // Đổi thành type="button" để không gửi form
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </form>
  );
};

export default AddCategory;
