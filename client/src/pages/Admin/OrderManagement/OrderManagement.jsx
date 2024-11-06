import { useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import BasicModal from "../../../components/Modal/BasicModal";
import ChangeOrderStatus from "../../../components/admin/Orders/ChangeOrderStatus";
import OrderItemDetailAdmin from "../../../components/admin/Orders/OrderItemDetailAdmin";

const OrderManagement = () => {
  const [page, setPage] = useState(0);
  const [ordersPerPage] = useState(7);
  const [isChangeOrderStatusModalOpen, setIsChangeOrderStatusModalOpen] = useState(false);
  const [isOrderDetailModalOpen, setIsOrderDetailModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [currentOrderStatus, setCurrentOrderStatus] = useState('');

  const orders = [
    { id: "1", customerName: "John Doe", orderDate: "2024-09-20", status: "Pending", totalPrice: "1499" },
    { id: "2", customerName: "Jane Smith", orderDate: "2024-09-19", status: "Shipped", totalPrice: "1299" },
    { id: "3", customerName: "Sam Green", orderDate: "2024-09-18", status: "Delivered", totalPrice: "999" },
    { id: "4", customerName: "Alice Brown", orderDate: "2024-09-17", status: "Pending", totalPrice: "799" },
    { id: "5", customerName: "Michael Johnson", orderDate: "2024-09-16", status: "Cancelled", totalPrice: "599" },
    { id: "6", customerName: "Emily Davis", orderDate: "2024-09-15", status: "Shipped", totalPrice: "499" },
    { id: "7", customerName: "Chris Wilson", orderDate: "2024-09-14", status: "Delivered", totalPrice: "1099" },
    { id: "8", customerName: "Sarah Miller", orderDate: "2024-09-13", status: "Pending", totalPrice: "1199" },
    { id: "9", customerName: "David Taylor", orderDate: "2024-09-12", status: "Shipped", totalPrice: "1299" },
    { id: "10", customerName: "Laura Anderson", orderDate: "2024-09-11", status: "Delivered", totalPrice: "899" },
    { id: "11", customerName: "James Thomas", orderDate: "2024-09-10", status: "Pending", totalPrice: "1499" }
];

  const totalOrders = orders.length;
  const totalPages = Math.ceil(totalOrders / ordersPerPage);
  const handlePageClick = (data) => {
    setPage(data.selected);
  };

  const indexOfLastOrder = (page + 1) * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handleOpenChangeOrderStatusModal = (order) => {
    setSelectedOrderId(order.id);
    setCurrentOrderStatus(order.status);
    setIsChangeOrderStatusModalOpen(true);
  };

  const handleCloseChangeOrderStatusModal = () => {
    setIsChangeOrderStatusModalOpen(false);
    setSelectedOrderId(null);
    setCurrentOrderStatus('');
  };

  const handleOpenOrderDetailModal = (order) => {
    setSelectedOrderId(order.id);
    setIsOrderDetailModalOpen(true);
  };

  const handleCloseOrderDetailModal = () => {
    setIsOrderDetailModalOpen(false);
    setSelectedOrderId(null);
  };

  const handleChangeOrderStatus = (orderId, newStatus) => {
    console.log(`Order ID: ${orderId}, New Status: ${newStatus}`);
    handleCloseChangeOrderStatusModal();
  };
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold">All Orders</h1>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center bg-white p-2 shadow-sm rounded-lg w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search for orders"
            className="flex-grow px-4 py-2 border border-gray-200 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md"
          />
          <button className="ml-2 p-2 bg-gray-200 rounded-md">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>

      <table className="table-auto w-full mt-6 bg-white shadow-md rounded-lg">
        <thead>
          <tr className="text-left text-xs bg-gray-200 text-gray-500 uppercase">
            <th className="p-4">ID</th>
            <th className="p-4">Tên khách hàng</th>
            <th className="p-4">Ngày đặt hàng</th>
            <th className="p-4">Tổng tiền</th>
            <th className="p-4">Trạng thái</th>
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr key={order.id} className="border-b border-gray-200 text-gray-700 hover:bg-gray-100">
              <td className="p-4 text-sm">{order.id}</td>
              <td className="p-4 text-sm">{order.customerName}</td>
              <td className="p-4 text-sm">{order.orderDate}</td>
              <td className="p-4 text-sm">{formatNumber(order.totalPrice)}</td>
              <td className="p-4 text-sm">{order.status}</td>
              <td className="p-4 text-sm">
                <div className="flex space-x-2">
                  <button 
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => handleOpenChangeOrderStatusModal(order)}
                  >
                    <FaEdit className="mr-2" />
                    Change Status
                  </button>
                  <button 
                    className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={() => handleOpenOrderDetailModal(order)}
                  >
                    <FaEye className="mr-2" />
                    View Details
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan="6" className="p-4">
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, totalOrders)} / {totalOrders} orders
                </div>
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
                    breakClassName={"w-8 h-8 flex items-center justify-center bg-white border rounded shadow"}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={3}
                  />
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>

      {/* Modals */}
      <BasicModal isOpen={isChangeOrderStatusModalOpen} onRequestClose={handleCloseChangeOrderStatusModal}>
        <ChangeOrderStatus 
          orderId={selectedOrderId} 
          currentStatus={currentOrderStatus} 
          onUpdate={handleChangeOrderStatus} 
          onClose={handleCloseChangeOrderStatusModal} 
        />
      </BasicModal>

      <BasicModal isOpen={isOrderDetailModalOpen} onRequestClose={handleCloseOrderDetailModal}>
        <OrderItemDetailAdmin orderId={selectedOrderId} onClose={handleCloseOrderDetailModal} />
      </BasicModal>
    </div>
  );
};

export default OrderManagement;
