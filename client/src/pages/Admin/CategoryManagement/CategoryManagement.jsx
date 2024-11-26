import { useState, useEffect, useCallback, useMemo } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faUpLong, faDownLong } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import BasicModal from "../../../components/Modal/BasicModal";
import AddCategory from "../../../components/admin/Category/AddCategory";
import UpdateCategory from "../../../components/admin/Category/UpdateCategory";
import DeleteCategory from "../../../components/admin/Category/DeleteCategory";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../../features/category/categoriesSlice";

const CategoryManagement = () => {
  const dispatch = useDispatch();
  //Truy xuất dữ liệu
  const { categories, loading, error } = useSelector((state) => state.category);
  useEffect(() => {
    console.log("Category: ", categories)
  },[categories])

  //Phân trang
  const [page, setPage] = useState(0);
  const [categoryPerPage] = useState(7);

  //Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [categoryToUpdate, setCategoryToUpdate] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  //CheckBox
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  //Sắp xếp
  const [sortCategory, setSortCategory] = useState(null);

  // Search term state
  const [searchTerm, setSearchTerm] = useState(""); // State to hold search input

  // Gọi API để lấy danh mục
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  

  // Filter categories based on search term
  const filteredCategories = useMemo(() => {
    if (searchTerm) {
      return categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return categories;
  }, [categories, searchTerm]);

  //Sort categories
  const sortedCategories = useMemo(() => {
    const copiedCategories = [...filteredCategories];
    if (sortCategory === "asc") {
      return copiedCategories.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortCategory === "desc") {
      return copiedCategories.sort((a, b) => b.name.localeCompare(a.name));
    }
    return copiedCategories;
  }, [filteredCategories, sortCategory]);

  const totalCategories = filteredCategories.length;
  const totalPages = Math.ceil(totalCategories / categoryPerPage);
  const handlePageClick = useCallback((data) => {setPage(data.selected);}, []);

  const indexOfLastCategory = (page + 1) * categoryPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoryPerPage;
  const currentCategories = sortedCategories.slice(indexOfFirstCategory, indexOfLastCategory);

  const handleSortClick = () => {
    setSortCategory((prevOrder) => {
      if (prevOrder === "asc") return "desc";
      if (prevOrder === "desc") return null;
      return "asc";
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Cập nhật trạng thái checkbox selectAll khi chuyển trang
  useEffect(() => {
    const allSelected = currentCategories.every((category) => selectedCategories.includes(category._id));
    setSelectAll(allSelected);
  }, [currentCategories, selectedCategories]);
  // useEffect(() => {
  //   const allSelected = currentCategories.every((category) => selectedCategories.includes(category._id));
  //   setSelectAll(allSelected);
  // }, [page, selectedCategories, currentCategories]);
  
  // Sử lý chọn hết checkbox
  const handleSelectAll = useCallback((e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      const allIds = currentCategories.map((category) => category._id);
      setSelectedCategories((prevSelected) => [...new Set([...prevSelected, ...allIds])]);
    } else {
      const remainingIds = selectedCategories.filter(id => !currentCategories.some(category => category._id === id));
      setSelectedCategories(remainingIds);
    }
  }, [currentCategories, selectedCategories]);

  // Sử lý riêng lẻ checkbox
  const handleCheckboxChange = useCallback((e, categoryId) => {
    setSelectedCategories((prevSelected) =>
      e.target.checked ? [...prevSelected, categoryId] : prevSelected.filter((id) => id !== categoryId)
    );
  }, []);

  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);

  const handleOpenDeleteModal = (category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };
  
  const handleCloseDeleteModal = () => {
    setCategoryToDelete(null);
    setIsDeleteModalOpen(false);
  };;

  const handleOpenUpdateModal = (category) => {
    setCategoryToUpdate(category);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setCategoryToUpdate(null);
    setIsUpdateModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold">Danh mục</h1>

      {/* Search Bar & Add Button */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center bg-white p-2 shadow-sm rounded-lg w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search for categories"
            value={searchTerm}
            onChange={handleSearchChange}
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

      {loading && (
        <div className="flex justify-center items-center mt-6">
          <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <span className="ml-2 text-blue-500">Loading...</span>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          <p>Lỗi: {error.message || error}</p>
        </div>
      )}

      {/* Category Table */}
      {!loading && !error && (
        <table className="table-auto w-full mt-6 bg-white shadow-md rounded-lg">
          <thead onMouseDown={(event) => {event.preventDefault();}}>
            <tr className="text-left text-xs bg-gray-200 text-gray-500 uppercase">
              <th className="p-4">
                <input 
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                />
              </th>
              <th className="p-4">id</th>
              <th className="p-4 cursor-pointer" onClick={handleSortClick}>Category Name
                  <FontAwesomeIcon
                    icon={faUpLong}
                    className={`ml-2 text-xs ${sortCategory === "asc" ? "text-black" : "text-gray-300"}`}
                  />
                  <FontAwesomeIcon
                    icon={faDownLong}
                    className={`ml-1 text-xs ${sortCategory === "desc" ? "text-black" : "text-gray-300"}`}
                  />
                </th>
              <th className="p-4">actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories.length > 0 ? (
              currentCategories.map((category, index) => (
                <tr key={index} className="border-b border-gray-200 text-gray-700 hover:bg-gray-100">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      className="form-checkbox text-blue-600 transition duration-150 ease-in-out border border-gray-300 rounded"
                      checked={selectedCategories.includes(category._id)}
                      onChange={(e) => handleCheckboxChange(e, category._id)}
                    />
                  </td>
                  <td className="p-4 text-sm">{category._id}</td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm uppercase">{category.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm">
                    <div className="flex space-x-2">
                      <button 
                        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => handleOpenUpdateModal(category)}
                      >
                        <FaEdit className="mr-2" />
                        Edit
                      </button>
                      <button 
                        className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={() => handleOpenDeleteModal(category)}
                      >
                        <FaTrashAlt className="mr-2" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-red-500 py-4">Danh mục không tồn tại</td>
              </tr>
            )}
          </tbody>

          {/* Pagination & Count within table footer */}
          <tfoot>
            <tr>
              <td colSpan="4" className="p-4">
                <div className="flex justify-between items-center">
                  {/* Left: Count display */}
                  <div className="text-sm text-gray-500">
                    {searchTerm ? (
                      `Tìm thấy : ${filteredCategories.length} kết quả`
                    ) : (
                      `Hiển thị ${indexOfFirstCategory + 1} đến ${Math.min(indexOfLastCategory, totalCategories)} / ${totalCategories} danh mục.`
                    )}
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
      )}

      {/* Modal for Adding Caterory */}
      <BasicModal isOpen={isAddModalOpen} onRequestClose={handleCloseAddModal}>
        <AddCategory onClose={handleCloseAddModal} />
      </BasicModal>
      <BasicModal isOpen={isUpdateModalOpen} onRequestClose={handleCloseUpdateModal}>
        {categoryToUpdate ? (
          <UpdateCategory
            editCategory={categoryToUpdate}
            onClose={handleCloseUpdateModal}
          />
        ) : (
          <p>Lỗi Edit rồi kiểm tra đê...</p>
        )}
      </BasicModal>
      <BasicModal isOpen={isDeleteModalOpen} onRequestClose={handleCloseDeleteModal}>
        {categoryToDelete ? (
          <DeleteCategory
            categoryId={categoryToDelete._id}
            categoryName={categoryToDelete.name}
            onClose={handleCloseDeleteModal}
          />
        ) : (
          <p>Lỗi Delete rồi kiểm tra đê...</p>
        )}
      </BasicModal>
    </div>
  );
};

export default CategoryManagement;
