/* eslint-disable react/prop-types */

const OrderItemDetailAdmin = ({ data, onClose }) => {
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "VND";
  };
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Chi tiết đơn đặt hàng</h2>
      <div className="mb-4">
        <div className="flex gap-4 mb-2">
          <div className="w-full">
            <label className="block font-semibold">Họ và tên người nhận:</label>
            <input
              type="text"
              value={data.shippingInfo?.fullName}
              readOnly
              className="border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2 w-full"
            />
          </div>
        </div>

        <label className="block font-semibold">Địa chỉ:</label>
        <input
          type="text"
          value={`${data.shippingInfo?.address}, ${data.shippingInfo.ward}, ${data.shippingInfo.district}, ${data.shippingInfo.city}`}

          readOnly
          className="border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2 w-full mb-2"
        />

        <div className="flex gap-4 mb-2">
          <div className="w-1/2">
            <label className="block font-semibold">Email:</label>
            <input
              type="email"
              value={data.email}
              readOnly
              className="border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2 w-full"
            />
          </div>
          <div className="w-1/2">
            <label className="block font-semibold">Số điện thoại:</label>
            <input
              type="text"
              value={data.shippingInfo.phone}
              readOnly
              className="border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2 w-full"
            />
          </div>
        </div>

        <label className="block font-semibold">Phương thức thanh toán:</label>
        <input
          type="text"
          value={data.paymentMethod}
          readOnly
          className="border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2 w-full mb-2"
        />
      </div>
      
      <h3 className="text-lg font-semibold mb-2">Chi tiết đơn hàng:</h3>
      
      <div className="">
        <table className="w-full mb-4 border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Ảnh</th>
              <th className="text-left p-2">Sản phẩm</th>
              <th className="text-left p-2">Số lượng</th>
              <th className="text-left p-2">Giá</th>
            </tr>
          </thead>
          <tbody>
            {data.products.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">
                  <img 
                    src={item?.image} 
                    alt={item?.name} 
                    className="w-14 h-14 object-cover" 
                  />
                </td>
                <td className="p-2">{item?.name}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between font-bold">
        <span>Tổng số tiền</span>
        <span>{formatNumber(data.totalAmount)}</span>
      </div>

      <button 
        onClick={onClose}
        className="mt-4 p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        Close
      </button>
    </div>
  );
};

export default OrderItemDetailAdmin;
