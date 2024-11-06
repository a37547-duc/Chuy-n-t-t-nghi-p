import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import BasicModal from "../../../components/Modal/BasicModal";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductVariations } from "../../../features/product/productVariationSlice";
import AddLaptopVatiation from "../../../components/admin/ProductVariation/AddLaptopVariation"
import AddLaptopVariation from "../../../components/admin/ProductVariation/AddLaptopVariation";
import AddMouseVariation from "../../../components/admin/ProductVariation/AddMouseVariation";
// import DeleteProductVariation from "../../../components/admin/ProductVariation/DeleteProductVariation";
// import UpdateProductVariation from "../../../components/admin/ProductVariation/UpdateProductVariation";

const ProductVariation = () => {
  const { productId, productType } = useParams();
  const dispatch = useDispatch();
  const { variations, loading: variationLoading, error: variationError } = useSelector((state) => state.productVariation);
  const [page, setPage] = useState(0);
  const variationsPerPage = 7;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [id, setId] = useState(null);
  const [initV, setInitV] = useState(null);
  
  const [selectAll, setSelectAll] = useState(false);
  const [selectedVariations, setSelectedVariations] = useState([]);


  useEffect(() => {
    if (productId) {
      dispatch(getAllProductVariations(productId));
    }
  }, [dispatch, productId]);
  const totalVariations = variations.length;
  const totalPages = Math.ceil(totalVariations / variationsPerPage);

  const handlePageClick = (data) => {
    setPage(data.selected);
  };

  const indexOfLastVariation = (page + 1) * variationsPerPage;
  const indexOfFirstVariation = indexOfLastVariation - variationsPerPage;
  const currentVariations = variations.slice(indexOfFirstVariation, indexOfLastVariation);

  // Handle select all checkbox
  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      const allIds = currentVariations.map((variation) => variation._id);
      setSelectedVariations((prev) => [...new Set([...prev, ...allIds])]);
    } else {
      const remainingIds = selectedVariations.filter(id => !currentVariations.some(variation => variation._id === id));
      setSelectedVariations(remainingIds);
    }
  };

  // Handle individual checkbox change
  const handleCheckboxChange = (e, variationId) => {
    if (e.target.checked) {
      setSelectedVariations((prev) => [...prev, variationId]);
    } else {
      setSelectedVariations((prev) => prev.filter((id) => id !== variationId));
    }
  };

  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);

  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const handleOpenUpdateModal = () => setIsUpdateModalOpen(true);
  const handleCloseUpdateModal = () => setIsUpdateModalOpen(false);

  const handleDeleteButtonClick = () => {
    if (selectedVariations.length > 0) {
      handleOpenDeleteModal();
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold">Variations for Product ID: {productId}</h1>
      {/* Search Bar & Add Button */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center bg-white p-2 shadow-sm rounded-lg w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search for variations"
            className="flex-grow px-4 py-2 border border-gray-200 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md"
            // Implement search functionality as needed
          />
          <button className="ml-2 p-2 bg-gray-200 rounded-md">
            <i className="fa fa-search"></i>
          </button>
            <button
              className="ml-2 p-2 bg-gray-200 rounded-md"
              onClick={handleDeleteButtonClick}
            >
              <i className="fa fa-trash"></i>
            </button>
        </div>
        <div className="flex items-center ml-4">
          <button
            onClick={handleOpenAddModal}
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600"
          >
            <span className="mr-2">Thêm biến thể</span>
          </button>
        </div>
      </div>

      {/* Error and Loading States */}
      {variationLoading && (
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

      {/* Error Message */}
      {variationError && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          <p>Sản phẩm không có biến thể nào</p>
        </div>
      )}

      {/* Variation Table */}
      {!variationLoading && !variationError && (
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
              <th className="p-4">ID</th>
              <th className="p-4">Tên biến thể</th>
              <th className="p-4">Mô tả</th>
              <th className="p-4">Giá</th>
              <th className="p-4">Tồn kho</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {currentVariations.length > 0 ? (
              currentVariations.map((variation) => (
                <tr key={variation._id} className="border-b border-gray-200 text-gray-700 hover:bg-gray-100">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      className="form-checkbox text-blue-600 transition duration-150 ease-in-out border border-gray-300 rounded"
                      checked={selectedVariations.includes(variation._id)}
                      onChange={(e) => handleCheckboxChange(e, variation._id)}
                    />
                  </td>
                  <td className="p-4 text-sm">{variation._id}</td>
                  <td className="p-4 text-sm">{variation.type}</td>
                  <td className="p-4">
                    <div className="flex flex-col">
                    {variation.color && (
                        <span className="font-semibold text-sm">Màu sắc: {variation.color}</span>
                      )}
                      {variation.cpu && (
                        <span className="font-semibold text-sm">CPU: {variation.cpu.name}</span>
                      )}
                      {variation.ram && (
                        <span className="font-semibold text-sm">RAM: {variation.ram.type}</span>
                      )}
                      {variation.gpu && (
                        <span className="font-semibold text-sm">GPU: {variation.gpu.name}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-sm">{variation.price} VNĐ</td>
                  <td className="p-4 text-sm">{variation.stock_quantity}</td>
                  <td className="p-4 text-sm">
                    <div className="flex space-x-2">
                      <button 
                        className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => {
                          // handleOpenUpdateModal();
                          // setInitV(variation);
                        }}
                      >
                        <FaEdit className="mr-2" />
                        Edit
                      </button>
                      <button 
                        className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={() => {
                          // setSelectedVariations([variation._id]);
                          // handleOpenDeleteModal();
                        }}
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
                <td colSpan="6" className="p-4 text-center">Không có biến thể nào.</td>
              </tr>
            )}
          </tbody>

          {/* Pagination & Count within table footer */}
          <tfoot>
            <tr>
              <td colSpan="7" className="p-4">
                <div className="flex justify-between items-center">
                  {/* Left: Count display */}
                  <span className="text-sm text-gray-500">
                    Hiển thị {indexOfFirstVariation + 1} đến {Math.min(indexOfLastVariation, totalVariations)} / {totalVariations} biến thể
                  </span>
                  {/* Right: Pagination controls */}
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
              </td>
            </tr>
          </tfoot>
        </table>
      )}

      {/* Modals for Add, Update, and Delete */}
      <BasicModal
        isOpen={isAddModalOpen}
        onRequestClose={handleCloseAddModal}
        title={`Thêm biến thể sản phẩm`}
      >
        {productType === 'LaptopVariant' && (
          <AddLaptopVariation
            productId={productId} 
            onClose={handleCloseAddModal} 
          />
        )}
        
        {productType === 'MouseVariant' && (
          <AddMouseVariation 
            productId={productId} 
            onClose={handleCloseAddModal} 
          />
        )}
      </BasicModal>
      
      {/* <BasicModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        title="Xóa biến thể sản phẩm"
      >
        <DeleteProductVariation 
          ids={selectedVariations} 
          onDelete={handleDeleteVariation} 
          onClose={handleCloseDeleteModal} 
        />
      </BasicModal> */}
      
      {/* <BasicModal
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        title="Cập nhật biến thể sản phẩm"
      >
        <UpdateProductVariation 
          variation={initV} 
          onUpdate={handleUpdateVariation} 
          onClose={handleCloseUpdateModal} 
        />
      </BasicModal> */}
    </div>
  );
};

export default ProductVariation;
