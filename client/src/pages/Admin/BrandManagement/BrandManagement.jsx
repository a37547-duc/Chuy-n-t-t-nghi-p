import { useState, useEffect  } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import BasicModal from "../../../components/Modal/BasicModal";
import AddBrand from "../../../components/admin/Brands/AddBrand";
import UpdateBrand from "../../../components/admin/Brands/UpdateBrand";
import DeleteBrand from "../../../components/admin/Brands/DeleteBrand";

const BrandManagement = () => {
  const [page, setPage] = useState(0);
  const [brandsPerPage] = useState(7);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brands, setBrands] = useState([]);  // State để lưu dữ liệu brands từ API
  const [loading, setLoading] = useState(true); // Để hiển thị trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Để hiển thị lỗi nếu có

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("https://laptech4k.onrender.com/api/v1/admin/products/brand");
        const data = await response.json();
        setBrands(data);  // Cập nhật state với dữ liệu từ API
        setLoading(false); // Ngừng trạng thái loading sau khi dữ liệu được tải
      } catch (err) {
        setError(err.message); // Lưu thông báo lỗi nếu có
        setLoading(false); // Ngừng trạng thái loading nếu xảy ra lỗi
      }
    };
    fetchBrands(); // Gọi API
  }, []);
  
  const totalBrands = brands.length;
  const totalPages = Math.ceil(totalBrands / brandsPerPage);

  const handlePageClick = (data) => {
    setPage(data.selected);
  };

  const indexOfLastBrand = (page + 1) * brandsPerPage;
  const indexOfFirstBrand = indexOfLastBrand - brandsPerPage;
  const currentBrands = brands.slice(indexOfFirstBrand, indexOfLastBrand);

  // Cập nhật trạng thái checkbox selectAll khi chuyển trang
  useEffect(() => {
    const allSelected = currentBrands.every((brand) => selectedBrands.includes(brand._id));
    setSelectAll(allSelected);
  }, [page, selectedBrands, currentBrands]);

  // Sử lý chọn hết checkbox
  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      const allIds = currentBrands.map((brand) => brand._id); // Sử dụng brand._id
      setSelectedBrands([...new Set([...selectedBrands, ...allIds])]); // Sử dụng new Set để loại bỏ ID trùng lặp
    } else {
      const remainingIds = selectedBrands.filter(id => !currentBrands.some(brand => brand._id === id));
      setSelectedBrands(remainingIds);
    }
  };

  // Sử lý riêng lẻ checkbox
  const handleCheckboxChange = (e, brandId) => {
    if (e.target.checked) {
      setSelectedBrands([...selectedBrands, brandId]); // Thêm brand ID vào danh sách đã chọn
    } else {
      setSelectedBrands(selectedBrands.filter((id) => id !== brandId)); // Xóa brand ID khỏi danh sách đã chọn
    }
  };

  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);

  const handleOpenDeleteModal = (brand) => {
    setSelectedBrand(brand); 
    setIsDeleteModalOpen(true); 
  };

  const handleCloseDeleteModal = () => {
    setSelectedBrand(null);
    setIsDeleteModalOpen(false);
  };

  const handeOpenUpdateModal = (brand) => {
    setSelectedBrand(brand);
    setIsUpdateModalOpen(true);
  };
  
  const handleCloseUpdateModal = () => {
    setSelectedBrand(null);
    setIsUpdateModalOpen(false);
  };

  // Hàm mô phỏng sau khi hoàn thành
  const handleSaveBrand = (brand) => {
    console.log("New brand added:", brand);
    handleCloseAddModal();
  };
  
  const handleDeleteBrand = () => {
    console.log(`Delete brand: ${selectedBrand.name}`);
    handleCloseDeleteModal();
  };
  const handleUpdateBrand = (updatedBrand) => {
    console.log(`Brand updated: ${updatedBrand.name}`);
    handleCloseUpdateModal();
  };

  if (loading) return <p>Loading brands...</p>;
  if (error) return <p>Error loading brands: {error}</p>;
  
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold">All brands</h1>

      {/* Search Bar & Add Button */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center bg-white p-2 shadow-sm rounded-lg w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search for brands"
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

        {/* Add Brand Button */}
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600"
          onClick={handleOpenAddModal}
          >
          <span className="mr-2">+ Add brand</span>
        </button>
      </div>

      {/* Brand Table */}
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
            <th className="p-4">brand name</th>
            <th className="p-4">logo</th>
            <th className="p-4">category</th>
            <th className="p-4">actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBrands.map((brand, index) => (
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
              <td className="p-4 text-sm font-semibold">
                {brand.category_id.name}</td>
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
          ))}
        </tbody>

        {/* Pagination & Count within table footer */}
        <tfoot>
          <tr>
            <td colSpan="7" className="p-4">
              <div className="flex justify-between items-center">
                {/* Left: Count display */}
                <div className="text-sm text-gray-500">
                  Hiển thị {indexOfFirstBrand + 1} đến {Math.min(indexOfLastBrand, totalBrands)} / {totalBrands} thương hiệu
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

      {/* Modal for Adding Product */}
      <BasicModal isOpen={isAddModalOpen} onRequestClose={handleCloseAddModal}>
        <AddBrand onSave={handleSaveBrand} onClose={handleCloseAddModal} />
      </BasicModal>
      <BasicModal isOpen={isDeleteModalOpen} onRequestClose={handleCloseDeleteModal}>
        <DeleteBrand 
          brandName={selectedBrand ? selectedBrand.name : ""}
          onDelete={handleDeleteBrand}
          onClose={handleCloseDeleteModal}
        />
      </BasicModal>
      <BasicModal isOpen={isUpdateModalOpen} onRequestClose={handleCloseUpdateModal}>
        <UpdateBrand 
          brand={selectedBrand ? selectedBrand.name : ""}
          onUpdate={handleUpdateBrand} 
          onClose={handleCloseUpdateModal} 
        />
      </BasicModal>
    </div>
  );
};
export default BrandManagement;