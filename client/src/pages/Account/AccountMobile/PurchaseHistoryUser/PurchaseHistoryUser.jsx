import HeadUser from "../HeadUser/HeadUser";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";


const PurchaseHistoryUser = () => {
  return (
    <div className="p-4">
      {/* Header */}
      <header className="flex justify-between items-center h-[50px] bg-white shadow-md rounded-md">
        <Link 
          to="/account" 
          className="text-gray-600 w-[50px] h-full flex justify-center items-center">
          <FaArrowLeft className="w-full h-[20px]" />
        </Link>
        <h1 className="text-xl font-bold">Lịch sử mua hàng</h1>
        <div className="w-6 h-6"></div>
      </header>
      <HeadUser />

      {/* Orders */}
      <div className="rounded-md mt-4">
        <div className="bg-white p-6 flex justify-between items-center">
          <div className="text-center">
            <p className="text-xl font-bold">4</p>
            <p className="text-sm">đơn hàng</p>
          </div>
          <div className="h-[50px] border-l-2 border-gray-700 mx-4"></div>
          <div className="text-center">
            <p className="text-xl font-bold">9M</p>
            <p className="text-sm">Tổng tiền tích lũy</p>
          </div>
        </div>

        {/* Order Filters */}
        <div className="overflow-x-auto">
          <div className="flex justify-start flex-nowrap gap-4 my-4 w-[calc(100%+200px)] md:w-full">
            <button className="w-[159.8px] bg-red-600 text-white py-2 rounded-md">
              Tất cả
            </button>
            <button className="w-[159.8px] bg-white border-2 border-gray-300 py-2 rounded-md">Chờ xác nhận</button>
            <button className="w-[159.8px] bg-white border-2 border-gray-300 py-2 rounded-md">Đã xác nhận</button>
            <button className="w-[159.8px] bg-white border-2 border-gray-300 py-2 rounded-md">Đang vận chuyển</button>
            <button className="w-[159.8px] bg-white border-2 border-gray-300 py-2 rounded-md">Đã hủy</button>
          </div>
        </div>
        

        {/* Order Item */}
        <div className="border-t pt-4">
          <div className="bg-white p-4 flex justify-between rounded-md">
            <div className="flex items-start space-x-4">
              <img
                src="https://via.placeholder.com/50"
                alt="product"
                className="w-16 h-16 object-cover"
              />
              <div className="space-y-2">
                <p className="text-md font-bold">
                  Củ sạc nhanh Anker 2 cổng 1C1A/20W A2348-Trắng
                </p>
                <p className="text-sm text-gray-500">11/01/2024 11:30</p>
                <div>
                  <p className="text-sm text-red-700 font-medium bg-red-200 inline-block p-1 px-2 rounded-md">Đã xuất VAT</p>
                </div>
                <div>
                  <p className="text-sm text-green-700 font-medium bg-green-200 inline-block p-1 px-2 rounded-md">Đã giao hàng</p>
                </div>
                <p className="text-red-600 font-bold">186.000đ</p>
              </div>
            </div>
            <div className="flex flex-col justify-end text-right">
              <div className="mt-auto">
                <button className="w-[130px] bg-gray-100 text-sm px-4 py-1 rounded-md mb-2 border-2 border-red-600">
                  Xem hóa đơn
                </button>
                <button className="w-[130px] bg-gray-100 text-sm px-4 py-1 rounded-md border-2 border-red-600">
                  Xem chi tiết
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistoryUser;