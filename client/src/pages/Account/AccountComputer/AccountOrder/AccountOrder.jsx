import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersUser } from "../../../../features/Auth/authOrdersUserSlice";
import EmptyPage from "./EmptyPage/EmptyPage";
import BasicModal from "../../../../components/Modal/BasicModal";
import OrderItemDetailAdmin from "../../../../components/admin/Orders/OrderItemDetailAdmin";

const AccountOrder = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.ordersUser);

  // State lưu trạng thái đơn hàng đang được chọn
  const [status, setStatus] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOrderDetailModalOpen, setIsOrderDetailModalOpen] = useState(false);
  const [initOrder, setInitOrder] = useState();

  // Mảng chứa các mục trạng thái điều hướng
  const navItems = [
    { label: "Tất cả" },
    { label: "Chờ xác nhận" },
    { label: "Đã xác nhận" },
    { label: "Đã giao hàng" },
    { label: "Giao hàng thành công" },
    { label: "Đã hủy" },
  ];

  // Gọi API để lấy danh sách đơn hàng theo trạng thái
  useEffect(() => {
    dispatch(getOrdersUser(status));
  }, [dispatch, status]);

  // Hàm xử lý khi nhấn vào một mục điều hướng
  const handleItemClick = (index, newStatus) => {
    setActiveIndex(index);
    setStatus(newStatus === "Tất cả" ? "" : newStatus);
  };

  const handleOpenOrderDetailModal = () => {
    setIsOrderDetailModalOpen(true);
  };
  const handleCloseOrderDetailModal = () => {
    setIsOrderDetailModalOpen(false);
  };

  return (
    <div className="p-4">
      {/* Bộ lọc trạng thái */}
      <div className="overflow-x-auto mt-4">
        <div className="flex justify-start flex-nowrap gap-4 my-4 w-[calc(100%+200px)]">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleItemClick(index, item.label)}
              className={`w-[150px] text-[13px] font-medium py-2 rounded-md ${activeIndex === index ? "bg-red-600 text-white" : "bg-white border-2 border-gray-300"}`}
            >
              {item.label}
            </button>
          ))}
        </div>
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

      {/* Hiển thị danh sách đơn hàng */}
      {!loading && !error && (
        <div className="rounded-md mt-4">
          {orders && orders.length > 0 ? (
            <div className="max-h-[700px] overflow-y-auto">
              {orders.slice().reverse().map((order) => (
                <div key={order.id} className="border-t pt-4">
                  <div className="bg-white p-4 flex justify-between rounded-md">
                    <div className="flex items-start space-x-4 w-[502.6px]">
                      <img
                        src={order.products[0]?.image}
                        alt={order.products[0]?.name}
                        className="w-16 h-16 object-cover"
                      />
                      <div className="space-y-2">
                        <p className="text-md font-bold">{order.products[0]?.name}</p>
                        <p className="text-sm text-gray-500">{order.orderDate}</p>
                        <div>
                          <p
                            className={`text-sm font-medium inline-block p-1 px-2 rounded-md ${
                              order.orderStatus === "Đã giao hàng"
                                ? "text-green-700 bg-green-200"
                                : order.orderStatus === "Đã hủy"
                                ? "text-red-700 bg-red-200"
                                : "text-yellow-700 bg-yellow-200"
                            }`}
                          >
                            {order.orderStatus}
                          </p>
                        </div>
                        <p className="text-red-600 font-bold">
                          {order.products.reduce((total, product) => total + product.price * product.quantity,0).toLocaleString()}{" "}
                          VNĐ
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-end text-right">
                      <div className="mt-auto">
                        <button
                          className="w-[130px] bg-gray-100 text-sm px-4 py-1 rounded-md border-2 border-red-600"
                          onClick={() => {
                            handleOpenOrderDetailModal();
                            setInitOrder(order);
                          }}
                        >
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  </div>
                  <BasicModal className="mt-10" isOpen={isOrderDetailModalOpen} onRequestClose={handleCloseOrderDetailModal}>
                    <OrderItemDetailAdmin data={initOrder} onClose={handleCloseOrderDetailModal} />
                  </BasicModal>
                </div>
              ))}
            </div>
          ) : (
            <EmptyPage label={navItems[activeIndex]?.label} />
          )}
        </div>
      )}
    </div>
  );
};

export default AccountOrder;
