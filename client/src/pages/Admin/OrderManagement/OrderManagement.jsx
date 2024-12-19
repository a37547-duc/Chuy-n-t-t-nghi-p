import { useState, useEffect, useMemo } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faUpLong, faDownLong } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import BasicModal from "../../../components/Modal/BasicModal";
import ChangeOrderStatus from "../../../components/admin/Orders/ChangeOrderStatus";
import OrderItemDetailAdmin from "../../../components/admin/Orders/OrderItemDetailAdmin";
import { getAllOrders } from "../../../features/order/orderSlice";


const OrderManagement = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  const [page, setPage] = useState(0);
  const ordersPerPage = 7;
  const [isChangeOrderStatusModalOpen, setIsChangeOrderStatusModalOpen] = useState(false);
  const [isOrderDetailModalOpen, setIsOrderDetailModalOpen] = useState(false);
  const [initOrder, setInitOrder] = useState();
  const [sortStatus, setSortStatus] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const filteredOrders = useMemo(() => {
    return orders.filter(order => 
      order._id.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [orders, searchQuery]);

  const totalOrders = filteredOrders.length;
  const totalPages = Math.ceil(totalOrders / ordersPerPage);

  const handlePageClick = (data) => {
    setPage(data.selected);
  };

  const indexOfLastOrder = (page + 1) * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  const displayedOrders = useMemo(() => {
    if (sortStatus === "asc") {
      return [...filteredOrders].sort((a, b) => a.totalAmount - b.totalAmount);
    } else if (sortStatus === "desc") {
      return [...filteredOrders].sort((a, b) => b.totalAmount - a.totalAmount);
    }
    return filteredOrders;
  }, [filteredOrders, sortStatus]);

  const currentOrders = displayedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const handleOpenChangeOrderStatusModal = () => {
    setIsChangeOrderStatusModalOpen(true);
  };

  const handleCloseChangeOrderStatusModal = () => {
    setIsChangeOrderStatusModalOpen(false);
  };

  const handleOpenOrderDetailModal = () => {
    setIsOrderDetailModalOpen(true);
  };

  const handleCloseOrderDetailModal = () => {
    setIsOrderDetailModalOpen(false);
  };

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };

  const handleSortByPrice = () => {
    setSortStatus((prevStatus) => {
      if (prevStatus === "asc") return "desc";
      if (prevStatus === "desc") return null;
      return "asc";
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold">Danh sách đơn hàng</h1>

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center bg-white p-2 shadow-sm rounded-lg w-full md:w-1/3">
          <input
            type="text"
            placeholder="Tìm kiếm đơn hàng..."
            className="flex-grow px-4 py-2 border border-gray-200 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="ml-2 p-2 bg-gray-200 rounded-md">
            <i className="fa fa-search"></i>
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
      {!loading && !error && (
        <table className="table-auto w-full mt-6 bg-white shadow-md rounded-lg">
          <thead>
            <tr className="text-left text-xs bg-gray-200 text-gray-500 uppercase">
              <th className="p-4">ID</th>
              <th className="p-4">Tên khách hàng</th>
              <th className="p-4">Ngày đặt hàng</th>
              <th className="p-4 cursor-pointer" onClick={handleSortByPrice}>Tổng tiền
                <FontAwesomeIcon
                  icon={faUpLong}
                  className={`ml-2 text-xs ${sortStatus === "asc" ? "text-black" : "text-gray-300"}`}
                />
                <FontAwesomeIcon
                  icon={faDownLong}
                  className={`ml-1 text-xs ${sortStatus === "desc" ? "text-black" : "text-gray-300"}`}
                />
              </th>
              <th className="p-4">Trạng thái</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
          {currentOrders.length > 0 ? (
            currentOrders.map((order) => (
              <tr key={order._id} className="border-b border-gray-200 text-gray-700 hover:bg-gray-100">
                <td className="p-4 text-sm">{order._id}</td>
                <td className="p-4 text-sm">{order.shippingInfo.fullName}</td>
                <td className="p-4 text-sm">{order.orderDate}</td>
                <td className="p-4 text-sm truncate max-w-[120px]">{formatNumber(order.totalAmount)}</td>
                <td className="p-4 text-sm">{order.orderStatus}</td>
                <td className="p-4 text-sm">
                  <div className="flex space-x-2">
                    <button 
                      className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      onClick={() => {
                        handleOpenChangeOrderStatusModal();
                        setInitOrder(order);
                      }}
                    >
                      <FaEdit className="mr-2" />
                      Change Status
                    </button>
                    <button 
                      className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      onClick={() => {
                        handleOpenOrderDetailModal();
                        setInitOrder(order);
                      }}
                    >
                      <FaEye className="mr-2" />
                      View Details
                    </button>
                  </div>
                </td>
              </tr>
            ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-red-500 py-4">Đơn hàng không tồn tại</td>
              </tr>
            )}
            </tbody>

          <tfoot>
            <tr>
              <td colSpan="6" className="p-4">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Hiển thị {indexOfFirstOrder + 1} đến {Math.min(indexOfLastOrder, totalOrders)} / {totalOrders} đơn hàng
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
      )}
      {/* Modals */}
      <BasicModal isOpen={isChangeOrderStatusModalOpen} onRequestClose={handleCloseChangeOrderStatusModal}>
        <ChangeOrderStatus 
          data={initOrder}
          onClose={handleCloseChangeOrderStatusModal} 
        />
      </BasicModal>

      <BasicModal isOpen={isOrderDetailModalOpen} onRequestClose={handleCloseOrderDetailModal}>
        <OrderItemDetailAdmin data={initOrder} onClose={handleCloseOrderDetailModal} />
      </BasicModal>
    </div>
  );
};

export default OrderManagement;
