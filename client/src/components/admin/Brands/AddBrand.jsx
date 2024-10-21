import { useState, useEffect } from "react";
import ImageUploadOne from "../../images/ImageUploadOne";

// eslint-disable-next-line react/prop-types
const AddBrand = ({ onSave, onClose }) => {

  const [newBrand, setNewBrand] = useState({
    name: "",
    category_id: null,
    categoryName: "",
    category: "",
    Logo: null,
  });
  

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://laptech4k.onrender.com/api/v1/admin/products/category");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      const selectedCategory = categories.find(cat => cat._id === value);
      if (selectedCategory) {
        setNewBrand({ 
          ...newBrand, 
          category_id: selectedCategory._id, // Lưu ID của category
          categoryName: selectedCategory.name, // Lưu tên category
          category: value
        });
      }
    } else {
      setNewBrand({ ...newBrand, [name]: value });
    }
  };

  const handleImageUpload = (url) => {
    setNewBrand({ ...newBrand, Logo: url }); // Lưu URL thay cho file
  };

  // const handleFileChange = (e) => {
  //   const { files } = e.target;
  //   if (files && files.length > 0) {
  //       setNewBrand({ ...newBrand, Logo: files[0] });
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newBrandData = {
      name: newBrand.name,
      category_id: newBrand.category_id,
      image: newBrand.Logo,
    };

    console.log("Submitting brand data:", newBrandData);

    try {
      // Gửi dữ liệu lên server dưới dạng JSON
      const response = await fetch("https://laptech4k.onrender.com/api/v1/admin/products/brand/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Thêm header để chỉ rõ gửi dữ liệu dạng JSON
        },
        body: JSON.stringify(newBrandData), // Chuyển đổi dữ liệu thành chuỗi JSON
      });

      if (!response.ok) {
        const errorText = await response.text(); // Lấy thông tin lỗi từ phản hồi
        console.error("Server response error:", errorText); // Ghi lại thông tin lỗi
        throw new Error("Failed to save brand");
      }

      // Gọi onSave nếu lưu thành công
      onSave(newBrand);
      setNewBrand({ name: "", category_id: null, Logo: null }); // Reset brand mới
    } catch (error) {
      console.error("Error saving brand:", error);
      alert("Có lỗi xảy ra khi lưu thương hiệu.");
    }
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
          <label className="block text-sm font-medium">Category</label>
          <select
            name="category"
            value={newBrand.category}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium">Logo</label>
          <ImageUploadOne onUploadComplete={handleImageUpload} />
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