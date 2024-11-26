import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategories } from "../../../features/Admin/adminCategorySlice";
import { getAllCategories } from "../../../features/category/categoriesSlice";

// eslint-disable-next-line react/prop-types
const AddCategory = ({ onClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories); // Lấy danh sách danh mục từ Redux
  const [error, setError] = useState(""); // State để hiển thị lỗi
  const [newCategory, setNewCategory] = useState({
    name: "",
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
    setError(""); // Reset lỗi khi người dùng nhập
  }, []);

  const handleSubmit = useCallback( 
    async (e) => {
      e.preventDefault();

      // Kiểm tra trùng tên danh mục
      const isDuplicate = categories.some(
        (category) => category.name.toLowerCase() === newCategory.name.toLowerCase().trim()
      );

      if (isDuplicate) {
        setError("Danh mục đã tồn tại. Vui lòng nhập tên khác.");
        return;
      }

      // Thêm danh mục nếu không trùng
      // dispatch(addCategories(newCategory))
      // console.log("AddCate: ",newCategory)
      // .unwrap()
      // .then(() => {
      //   console.log("Category added successfully");
      //   dispatch(getAllCategories()); // Lấy lại danh sách danh mục
      //   setNewCategory({ name: "" }); // Reset form
      //   onClose(); // Đóng modal
      // })
      // .catch((error) => {
      //   console.error("Error adding category:", error);
      // });

      try {
        await dispatch(addCategories(newCategory));
        console.log("Added category:", newCategory);
        console.log("Category added successfully");
        dispatch(getAllCategories());
        setNewCategory({ name: "" });
        onClose();
      } catch (error) {
        console.error("Error adding category:", error);
      }
    },[dispatch, categories, newCategory, onClose] // Đảm bảo mọi thứ cần thiết là dependencies
  );

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
            className={`mt-1 block w-full border ${
              error ? "border-red-500" : "border-gray-300"
            } focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2`}
            required
          />
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>} {/* Hiển thị lỗi */}
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
