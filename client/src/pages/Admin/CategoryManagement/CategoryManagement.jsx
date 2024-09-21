import { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import BasicModal from "../../../components/Modal/BasicModal";
import AddCategory from "../../../components/admin/Category/AddCategory";
import UpdateCategory from "../../../components/admin/Category/UpdateCategory";
import DeleteCategory from "../../../components/admin/Category/DeleteCategory";

const CategoryManagement = () => {
  const [page, setPage] = useState(0);
  const [categoryPerPage] = useState(7);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = [
    { id: "1", name: "Laptop", category: "Laptop Gaming", description: "Intel Core i7, 16GB RAM, 512GB SSD", image: "" },
    { id: "2", name: "PC", category: "Ultrabook", description: "Intel Core i5, 8GB RAM, 256GB SSD", image: "" },
    { id: "3", name: "Màn hình", category: "Laptop Gaming", description: "AMD Ryzen 5, 16GB RAM, 1TB HDD", image: "" },
    { id: "4", name: "Linh kiện máy tính", category: "Laptop 2-in-1", description: "Intel Core i3, 8GB RAM, 256GB SSD", image: "" },
    { id: "5", name: "Phụ kiện", category: "Laptop 2-in-1", description: "Intel Core i3, 8GB RAM, 256GB SSD", image: "" },
    { id: "6", name: "Gaming Gear", category: "Laptop 2-in-1", description: "Intel Core i3, 8GB RAM, 256GB SSD", image: "" },
  ];

  const totalCategories = categories.length;
  const totalPages = Math.ceil(totalCategories / categoryPerPage);

  const handlePageClick = (data) => {
    setPage(data.selected);
  };

  const indexOfLastCategory = (page + 1) * categoryPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoryPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

  // Cập nhật trạng thái checkbox selectAll khi chuyển trang
  useEffect(() => {
    const allSelected = currentCategories.every((category) => selectedCategories.includes(category.id));
    setSelectAll(allSelected);
  }, [page, selectedCategories, currentCategories]);

  // Sử lý chọn hết checkbox
  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      const allIds = currentCategories.map((category) => category.id);
      setSelectedCategories([...selectedCategories, ...allIds.filter(id => !selectedCategories.includes(id))]);
    } else {
      const remainingIds = selectedCategories.filter(id => !currentCategories.some(category => category.id === id));
      setSelectedCategories(remainingIds);
    }
  };

  // Sử lý riêng lẻ checkbox
  const handleCheckboxChange = (e, categoryId) => {
    if (e.target.checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
    }
  };

  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);

  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const hanleOpenUpdateModal = () => setIsUpdateModalOpen(true);
  const handleCloseUpdateModal = () => setIsUpdateModalOpen(false);

  const handleSaveCategory = (category) => {
    console.log("New category added:", category);
    handleCloseAddModal();
  };
  const handleDeleteCategory = () => {
    console.log("Category deleted:", selectedCategories);
    handleCloseDeleteModal();
  };
  const handleUpdateCategory = (updatedCategory) => {
    console.log("Category updated:", updatedCategory);
    handleCloseUpdateModal();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold">All categories</h1>

      {/* Search Bar & Add Button */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center bg-white p-2 shadow-sm rounded-lg w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search for categories"
            className="flex-grow px-4 py-2 border border-gray-200 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md"
          />
          <button className="ml-2 p-2 bg-gray-200 rounded-md">
            <i className="fa fa-search"></i>
          </button>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600"
        >
          <span className="mr-2">+ Add category</span>
        </button>
      </div>

      {/* Category Table */}
      <table className="table-auto w-full mt-6 bg-white shadow-md rounded-lg">
        <thead>
          <tr className="text-left text-xs bg-gray-200 text-gray-500 uppercase">
            <th className="p-4">
              <input 
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
              />
            </th>
            <th className="p-4">id</th>
            <th className="p-4">category name</th>
            <th className="p-4">image</th>
            <th className="p-4">description</th>
            <th className="p-4">actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCategories.map((caterory, index) => (
            <tr key={index} className="border-b border-gray-200 text-gray-700 hover:bg-gray-100">
              <td className="p-4">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-600 transition duration-150 ease-in-out border border-gray-300 rounded"
                  checked={selectedCategories.includes(caterory.id)}
                  onChange={(e) => handleCheckboxChange(e, caterory.id)}
                />
              </td>
              <td className="p-4 text-sm">{caterory.id}</td>
              <td className="p-4">
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">{caterory.name}</span>
                  <span className="text-sm text-gray-500">{caterory.category}</span>
                </div>
              </td>
              <td className="p-4 text-sm">{caterory.image}</td>
              <td className="p-4 text-sm">{caterory.description}</td>
              <td className="p-4 text-sm">
                <div className="flex space-x-2">
                  <button 
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={hanleOpenUpdateModal}
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </button>
                  <button 
                    className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={handleOpenDeleteModal}
                  >
                    <FaTrashAlt className="mr-2" />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>

        {/* Pagination & Count within table footer */}
        <tfoot>
          <tr>
            <td colSpan="6" className="p-4">
              <div className="flex justify-between items-center">
                {/* Left: Count display */}
                <div className="text-sm text-gray-500">
                  Hiển thị {indexOfFirstCategory + 1} đến {Math.min(indexOfLastCategory, totalCategories)} / {totalCategories} sản phẩm
                </div>

                {/* Right: Pagination */}
                <div className="flex justify-end">
                  <ReactPaginate
                    previousLabel={<FontAwesomeIcon icon={faChevronLeft} size="xs" />}
                    nextLabel={<FontAwesomeIcon icon={faChevronRight} size="xs" />}
                    pageCount={totalPages}
                    onPageChange={handlePageClick}
                    containerClassName={"flex items-center space-x-2"}
                    previousLinkClassName={"w-8 h-8 flex items-center justify-center bg-white border rounded shadow hover:bg-gray-100"}
                    nextLinkClassName={"w-8 h-8 flex items-center justify-center bg-white border rounded shadow hover:bg-gray-100"}
                    disabledClassName={"text-blue-500"}
                    activeLinkClassName={"bg-blue-500 text-white rounded w-8 h-8 flex items-center justify-center hover:bg-blue-600"}
                    pageClassName={"w-8 h-8 flex items-center justify-center bg-white border rounded shadow hover:bg-gray-100"}
                    pageLinkClassName={"w-full h-full flex items-center justify-center focus:outline-none"}
                    breakLabel={"..."}
                    breakClassName={"w-8 h-8 flex items-center justify-center text-gray-500"}
                  />
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Modal for Adding Caterory */}
      <BasicModal isOpen={isAddModalOpen} onRequestClose={handleCloseAddModal}>
        <AddCategory onSave={handleSaveCategory} onClose={handleCloseAddModal} />
      </BasicModal>
      <BasicModal isOpen={isDeleteModalOpen} onRequestClose={handleCloseDeleteModal}>
        <DeleteCategory onDelete={handleDeleteCategory} onClose={handleCloseDeleteModal} />
      </BasicModal>
      <BasicModal isOpen={isUpdateModalOpen} onRequestClose={handleCloseUpdateModal}>
        <UpdateCategory onUpdate={handleUpdateCategory} onClose={handleCloseUpdateModal} />
      </BasicModal>
    </div>
  );
};

export default CategoryManagement;
