import { useState, useEffect, useCallback, useMemo } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faUpLong, faDownLong } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import BasicModal from "../../../components/Modal/BasicModal";
import AddBrand from "../../../components/admin/Brands/AddBrand";
import UpdateBrand from "../../../components/admin/Brands/UpdateBrand";
import DeleteBrand from "../../../components/admin/Brands/DeleteBrand";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrands } from "../../../features/brand/brandsSlice";
import { getAllProducts } from "../../../features/product/productsSlice";
import { Link } from 'react-router-dom';

const BrandManagement = () => {
  const dispatch = useDispatch();
  //Truy xuất dữ liệu
  const { brands, loading, error } = useSelector((state) => state.brand);
  const { products } = useSelector((state) => state.product);

  //Phân trang
  const [page, setPage] = useState(0);
  const [brandsPerPage] = useState(7);

  //Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [brandToUpdate, setBrandToUpdate] = useState(null);
  const [brandToDelete, setBrandToDelete] = useState(null);
  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  //CheckBox
  const [selectAll, setSelectAll] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);

  //Sắp xếp
  const [sortBrand, setSortBrand] = useState(null);

  // Search term state
  const [searchTerm, setSearchTerm] = useState("");

  //Gọi API lấy brand
  useEffect(() => {
    dispatch(getAllBrands());
    dispatch(getAllProducts());
  }, [dispatch]);

  const productCountByBrand = useMemo(() => {
    const count = {};
    products.forEach((product) => {
      const brandId = product.brand?._id;
      if (brandId) {
        count[brandId] = (count[brandId] || 0) + 1;
      }
    });
    return count;
  }, [products]);
  
  // Filter brand based on search term
  const filteredBrand = useMemo(() => {
    if (searchTerm) {
      return brands.filter(brand =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return brands;
  }, [brands, searchTerm]);

  //Sort brand
  const sortedBrands = useMemo(() => {
    const copiedBrands = [...filteredBrand];
    if (sortBrand === "asc") {
      return copiedBrands.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBrand === "desc") {
      return copiedBrands.sort((a, b) => b.name.localeCompare(a.name));
    }
    return copiedBrands;
  }, [filteredBrand, sortBrand]);

  const totalBrands = filteredBrand.length;
  const totalPages = Math.ceil(totalBrands / brandsPerPage);
  const handlePageClick = useCallback((data) => {setPage(data.selected);},[]);

  const indexOfLastBrand = (page + 1) * brandsPerPage;
  const indexOfFirstBrand = indexOfLastBrand - brandsPerPage;

  const currentBrands = sortedBrands.slice(indexOfFirstBrand, indexOfLastBrand);

  const handleSortClick = () => {
    setSortBrand((prevOrder) => {
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
    const allSelected = currentBrands.every((brand) => selectedBrands.includes(brand._id));
    setSelectAll(allSelected);
  }, [page, selectedBrands, currentBrands]);

  // Sử lý chọn hết checkbox
  const handleSelectAll = useCallback((e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      const allIds = currentBrands.map((brand) => brand._id); // Sử dụng brand._id
      setSelectedBrands((prevSelected) => [...new Set([...prevSelected, ...allIds])]); // Sử dụng new Set để loại bỏ ID trùng lặp
    } else {
      const remainingIds = selectedBrands.filter(id => !currentBrands.some(brand => brand._id === id));
      setSelectedBrands(remainingIds);
    }
  },[currentBrands, selectedBrands]);

  // Sử lý riêng lẻ checkbox
  const handleCheckboxChange = useCallback((e, brandId) => {
    setSelectedBrands((prevSelected) => 
      e.target.checked ? [...prevSelected, brandId] : prevSelected.filter((id) => id !== brandId)
    );
  },[]);

  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);

  const handleOpenDeleteModal = (brand) => {
    const productCount = productCountByBrand[brand._id] || 0;

    if (productCount > 0) {
      setWarningMessage("Có sản phẩm đang tồn tại. Hãy xóa sản phẩm trước khi xóa thương hiệu.");
      setIsWarningModalOpen(true); // Hiển thị thông báo cảnh báo
      return;
    }
    setBrandToDelete(brand); 
    setIsDeleteModalOpen(true); 
  };

  const handleCloseDeleteModal = () => {
    setBrandToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handeOpenUpdateModal = (brand) => {
    setBrandToUpdate(brand);
    setIsUpdateModalOpen(true);
  };
  
  const handleCloseUpdateModal = () => {
    setBrandToUpdate(null);
    setIsUpdateModalOpen(false);
  };
  
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold">Danh sách thương hiệu</h1>

      {/* Search Bar & Add Button */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center bg-white p-2 shadow-sm rounded-lg w-full md:w-1/3">
          <input
            type="text"
            placeholder="Tìm kiếm thương hiệu..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="flex-grow px-4 py-2 border border-gray-200 rounded-md"
          />
          <button className="ml-2 p-2 bg-gray-200 rounded-md">
            <i className="fa fa-search"></i>
          </button>
          <div className="ml-2 flex space-x-2">
            <button className="p-2 bg-gray-200 rounded-md">
              <i className="fa fa-cog"></i>
            </button>
            <button className="p-2 bg-gray-200 rounded-md">
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </div>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600"
          onClick={handleOpenAddModal}
          >
          <span className="mr-2">+ Thêm thương hiệu</span>
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

      {/* Brand Table */}
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
              <th className="p-4 cursor-pointer" onClick={handleSortClick}>Tên thương hiệu
                  <FontAwesomeIcon
                    icon={faUpLong}
                    className={`ml-2 text-xs ${sortBrand === "asc" ? "text-black" : "text-gray-300"}`}
                  />
                  <FontAwesomeIcon
                    icon={faDownLong}
                    className={`ml-1 text-xs ${sortBrand === "desc" ? "text-black" : "text-gray-300"}`}
                  />
                </th>
              <th className="p-4">logo</th>
              <th className="p-4">Số lượng sản phẩm</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {currentBrands.length > 0 ? (
              currentBrands.map((brand, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 text-gray-700 hover:bg-gray-100"
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-600 transition duration-150 ease-in-out border border-gray-300 rounded"
                    checked={selectedBrands.includes(brand._id)}
                    onChange={(e) => handleCheckboxChange(e, brand._id)}
                  />
                </td>
                <td className="p-4 text-sm">{brand._id}</td>
                <td className="p-4 text-sm font-semibold">{brand.name}</td>
                <td className="p-1 text-sm">
                  <img src={brand.image} alt={brand.name} className="h-10 w-20 object-contain" />
                </td>
                <td className="p-4 text-sm text-center">
                    {productCountByBrand[brand._id] || 0}
                  </td>
                <td className="p-4 text-sm">
                  <div className="flex space-x-2">
                    <button 
                      className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      onClick={() => handeOpenUpdateModal(brand)}
                    >
                      <FaEdit className="mr-2" />
                      Edit
                    </button>
                    <button 
                      className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => handleOpenDeleteModal(brand)}
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
                <td colSpan="6" className="text-center text-red-500 py-4">Thương hiệu không tồn tại</td>
              </tr>
            )}
          </tbody>

          {/* Pagination & Count within table footer */}
          <tfoot>
            <tr>
              <td colSpan="6" className="p-4">
                <div className="flex justify-between items-center">
                  {/* Left: Count display */}
                  <div className="text-sm text-gray-500">
                    {searchTerm ? (
                      `Tìm thấy : ${filteredBrand.length} kết quả`
                    ) : (
                      `Hiển thị ${indexOfFirstBrand + 1} đến ${Math.min(indexOfLastBrand, totalBrands)} / ${totalBrands} thương hiệu`
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

      {/* Modal for Adding Product */}
      <BasicModal isOpen={isAddModalOpen} onRequestClose={handleCloseAddModal}>
        <AddBrand onClose={handleCloseAddModal} />
      </BasicModal>
      <BasicModal isOpen={isUpdateModalOpen} onRequestClose={handleCloseUpdateModal}>
        {brandToUpdate && (
          <UpdateBrand
            editBrand={brandToUpdate}
            onClose={handleCloseUpdateModal}
          />
        )}
      </BasicModal>
      <BasicModal isOpen={isDeleteModalOpen} onRequestClose={handleCloseDeleteModal}>
        {brandToDelete && (
          <DeleteBrand
            brandId={brandToDelete._id}
            brandName={brandToDelete.name}
            onClose={handleCloseDeleteModal}
          />
        )}
      </BasicModal>
      <BasicModal isOpen={isWarningModalOpen} onRequestClose={() => setIsWarningModalOpen(false)}>
        <div className="p-4 text-center">
          <h2 className="text-lg font-bold text-red-500 mb-4">Cảnh báo</h2>
          <p className="text-gray-700">{warningMessage}</p>
          <button
            onClick={() => setIsWarningModalOpen(false)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Đóng
          </button>
          <Link to="/admin/products" 
            className="ml-2 h-[40px] mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" 
            >Tới trang sản phẩm</Link>
        </div>
      </BasicModal>
    </div>
  );
};
export default BrandManagement;