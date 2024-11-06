import { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom"
import ReactPaginate from "react-paginate";
import BasicModal from "../../../components/Modal/BasicModal";
import AddProduct from "../../../components/admin/Products/AddProduct";
import DeleteProduct from "../../../components/admin/Products/DeleteProduct";
import UpdateProduct from "../../../components/admin/Products/UpdateProduct";
import FilterListIcon from '@mui/icons-material/FilterList';
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../features/product/productsSlice";
import { addProduct, updateProduct } from "../../../features/Admin/adminProductsSlice";

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [page, setPage] = useState(0);
  const productsPerPage = 7;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [id, setId] = useState();
  const [initP, setInitP] = useState();
  
  const [selectAll, setSelectAll] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageClick = (data) => {
    setPage(data.selected);
  };

  const indexOfLastProduct = (page + 1) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    const allSelected = currentProducts.every((products) => selectedProducts.includes(products._id));
    setSelectAll(allSelected);
  }, [page, selectedProducts, currentProducts]);

  useEffect

  // Xử lý chọn hết checkbox
  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      const allIds = currentProducts.map((products) => products._id);
      setSelectedProducts([...selectedProducts, ...allIds.filter(id => !selectedProducts.includes(id))]);
    } else {
      const remainingIds = selectedProducts.filter(id => !currentProducts.some(product => product._id === id));
      setSelectedProducts(remainingIds);
    }
  };

  // Xử lý riêng lẻ checkbox
  const handleCheckboxChange = (e, productId) => {
    if (e.target.checked) {
      setSelectedProducts([...selectedProducts, productId]); // Thêm product ID danh sách chọn
    } else {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId)); // Xóa product ID khỏi danh sách chọn
    }
  };

  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);

  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const hanleOpenUpdateModal = () => setIsUpdateModalOpen(true);
  const handleCloseUpdateModal = () => setIsUpdateModalOpen(false);

  // const handleSaveProduct = (newProduct) => {
  //   dispatch(addProduct(newProduct))
  //     .unwrap()
  //     .then(() => {
  //       dispatch(getAllProducts());
  //     })
  //     .catch((error) => {
  //       console.log("Lỗi khi thêm sản phẩm:", error);
  //     });
  
  //   handleCloseAddModal();
  // };
  const handleDeleteProduct = () => {
    console.log("Product deleted:", selectedProducts);
    handleCloseDeleteModal();
  };
  // const handleUpdateProduct = (updatedProduct) => {
  //   console.log("Product updated:", updatedProduct);
  //   handleCloseUpdateModal();
  // };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold">All products</h1>

      {/* Search Bar & Add Button */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center bg-white p-2 shadow-sm rounded-lg w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search for products"
            className="flex-grow px-4 py-2 border border-gray-200 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md"
          />
          <button className="ml-2 p-2 bg-gray-200 rounded-md">
            <i className="fa fa-search"></i>
          </button>
          <button className="ml-2 p-2 bg-gray-200 rounded-md">
              <i className="fa fa-trash"></i>
          </button>
        </div>
        <div className="flex items-center ml-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600 mr-2"
          >
            <FilterListIcon />
          </button>
          <button
            onClick={handleOpenAddModal}
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600"
          >
            <span className="mr-2">Thêm sản phẩm</span>
          </button>
        </div>
      </div>

      {/* Loading Indicator */}
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

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          <p>Lỗi: {error.message || error}</p>
        </div>
      )}

      {/* Product Table */}
      {!loading && !error && (
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
            <th className="p-4">tên sản phẩm</th>
            <th className="p-4">ảnh sản phẩm</th>
            <th className="p-4">danh mục</th>
            <th className="p-4">thương hiệu</th>
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((products, index) => (
            <tr key={index} className="border-b border-gray-200 text-gray-700 hover:bg-gray-100">
              <td className="p-4">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-600 transition duration-150 ease-in-out border border-gray-300 rounded"
                  checked={selectedProducts.includes(products._id)}
                  onChange={(e) => handleCheckboxChange(e, products._id)}
                />
              </td>
              <td className="p-4 text-sm">{products._id}</td>
              <td className="p-4">
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">{products.name}</span>
                </div>
              </td>
              <td className="text-sm py-4">
                <img src={products.images[0]} alt={products.name} className="w-16 h-16 object-cover pl-4" />
              </td>
              <td className="p-4 text-sm">{products.category.name}</td>
              <td className="p-4 text-sm">{products.brand.name}</td>
              <td className="p-4 text-sm">
                <div className="flex space-x-2">
                  <button 
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => {
                      hanleOpenUpdateModal();
                      setInitP(products);
                    }}
                  >
                    <FaEdit className="mr-2" />
                    Edit
                  </button>
                  <button 
                    className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => {
                      handleOpenDeleteModal();
                      setId(products._id);
                    }}
                  >
                    <FaTrashAlt className="mr-2" />
                    Delete
                  </button>
                  <Link to={`/admin/products/${products.type}/${products._id}`}>
                    <button 
                      className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      <FaEye className="mr-2" />
                      View Details
                    </button>
                  </Link>
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
                  Hiển thị {indexOfFirstProduct + 1} đến {Math.min(indexOfLastProduct, totalProducts)} / {totalProducts} sản phẩm
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
        <AddProduct 
          onClose={handleCloseAddModal} 
        />
      </BasicModal>
      <BasicModal isOpen={isDeleteModalOpen} onRequestClose={handleCloseDeleteModal}>
        <DeleteProduct 
          onDelete={handleDeleteProduct} 
          onClose={handleCloseDeleteModal} 
          data={id}
        />
      </BasicModal>
      <BasicModal isOpen={isUpdateModalOpen} onRequestClose={handleCloseUpdateModal}>
        <UpdateProduct 
          onClose={handleCloseUpdateModal} 
          data={initP}
        />
      </BasicModal>
    </div>
  );
};

export default ProductManagement;