import { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import BasicModal from "../../../components/Modal/BasicModal";
import AddProduct from "../../../components/admin/Products/AddProduct";
import DeleteProduct from "../../../components/admin/Products/DeleteProduct";
import UpdateProduct from "../../../components/admin/Products/UpdateProduct"

const ProductManagement = () => {
  const [page, setPage] = useState(0);
  const [productsPerPage] = useState(7);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const products = [
    { id: "1", name: "ASUS ROG Strix G15", category: "Laptop Gaming", technology: "Intel Core i7, 16GB RAM, 512GB SSD", price: "$1499" },
    { id: "2", name: "Dell XPS 13", category: "Ultrabook", technology: "Intel Core i5, 8GB RAM, 256GB SSD", price: "$1299" },
    { id: "3", name: "Acer Nitro 5", category: "Laptop Gaming", technology: "AMD Ryzen 5, 16GB RAM, 1TB HDD", price: "$999" },
    { id: "4", name: "HP Pavilion x360", category: "Laptop 2-in-1", technology: "Intel Core i3, 8GB RAM, 256GB SSD", price: "$799" },
    { id: "5", name: "HP Pavilion x360", category: "Laptop 2-in-1", technology: "Intel Core i3, 8GB RAM, 256GB SSD", price: "$799" },
    { id: "6", name: "HP Pavilion x360", category: "Laptop 2-in-1", technology: "Intel Core i3, 8GB RAM, 256GB SSD", price: "$799" },
    { id: "7", name: "HP Pavilion x360", category: "Laptop 2-in-1", technology: "Intel Core i3, 8GB RAM, 256GB SSD", price: "$799" },
    { id: "8", name: "HP Pavilion x360", category: "Laptop 2-in-1", technology: "Intel Core i3, 8GB RAM, 256GB SSD", price: "$799" },
    { id: "9", name: "HP Pavilion x360", category: "Laptop 2-in-1", technology: "Intel Core i3, 8GB RAM, 256GB SSD", price: "$799" },
    { id: "10", name: "HP Pavilion x360", category: "Laptop 2-in-1", technology: "Intel Core i3, 8GB RAM, 256GB SSD", price: "$799" },
    { id: "11", name: "HP Pavilion x360", category: "Laptop 2-in-1", technology: "Intel Core i3, 8GB RAM, 256GB SSD", price: "$799" },
  ];

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageClick = (data) => {
    setPage(data.selected);
  };

  const indexOfLastProduct = (page + 1) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Cập nhật trạng thái checkbox selectAll khi chuyển trang
  useEffect(() => {
    const allSelected = currentProducts.every((product) => selectedProducts.includes(product.id));
    setSelectAll(allSelected);
  }, [page, selectedProducts, currentProducts]);

  // Xử lý chọn hết checkbox
  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      const allIds = currentProducts.map((product) => product.id);
      setSelectedProducts([...selectedProducts, ...allIds.filter(id => !selectedProducts.includes(id))]);
    } else {
      const remainingIds = selectedProducts.filter(id => !currentProducts.some(product => product.id === id));
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

  const handleSaveProduct = (product) => {
    console.log("New product added:", product);
    handleCloseAddModal();
  };
  const handleDeleteProduct = () => {
    console.log("Product deleted:", selectedProducts);
    handleCloseDeleteModal();
  };
  const handleUpdateProduct = (updatedProduct) => {
    console.log("Product updated:", updatedProduct);
    handleCloseUpdateModal();
  };

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
        </div>
        <button
          onClick={handleOpenAddModal}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600"
        >
          <span className="mr-2">+ Add product</span>
        </button>
      </div>

      {/* Product Table */}
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
            <th className="p-4">product name</th>
            <th className="p-4">technology</th>
            <th className="p-4">price</th>
            <th className="p-4">actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product, index) => (
            <tr key={index} className="border-b border-gray-200 text-gray-700 hover:bg-gray-100">
              <td className="p-4">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-600 transition duration-150 ease-in-out border border-gray-300 rounded"
                  checked={selectedProducts.includes(product.id)}
                  onChange={(e) => handleCheckboxChange(e, product.id)}
                />
              </td>
              <td className="p-4 text-sm">{product.id}</td>
              <td className="p-4">
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">{product.name}</span>
                  <span className="text-sm text-gray-500">{product.category}</span>
                </div>
              </td>
              <td className="p-4 text-sm">{product.technology}</td>

              <td className="p-4 text-sm">{product.price}</td>
              <td className="p-4 text-sm">
                <div className="flex space-x-2">
                  <button 
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={hanleOpenUpdateModal}
                  >
                    <FaEdit className="mr-2" />
                    Edit item
                  </button>
                  <button 
                    className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={handleOpenDeleteModal}
                  >
                    <FaTrashAlt className="mr-2" />
                    Delete item
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

      {/* Modal for Adding Product */}
      <BasicModal isOpen={isAddModalOpen} onRequestClose={handleCloseAddModal}>
        <AddProduct onSave={handleSaveProduct} onClose={handleCloseAddModal} />
      </BasicModal>
      <BasicModal isOpen={isDeleteModalOpen} onRequestClose={handleCloseDeleteModal}>
        <DeleteProduct onDelete={handleDeleteProduct} onClose={handleCloseDeleteModal} />
      </BasicModal>
      <BasicModal isOpen={isUpdateModalOpen} onRequestClose={handleCloseUpdateModal}>
        <UpdateProduct onUpdate={handleUpdateProduct} onClose={handleCloseUpdateModal} />
      </BasicModal>
    </div>
  );
};

export default ProductManagement;
