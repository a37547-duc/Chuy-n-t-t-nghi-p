import React from 'react';

const OrderItemDetailAdmin = ({ orderId, onClose }) => {
  const orderDetails = {
    customer: {
      lastName: 'Nguyen',
      firstName: 'Anh',
      address: '1 Main St',
      email: 'example@email.com',
      paymentMethod: 'Chuyển khoản',
    },
    items: [
      { 
        productName: "Chuột không dây Logitech Pop Mouse", 
        quantity: 2, 
        price: 300, 
        image: "https://example.com/images/logitech-pop-mouse.jpg" 
      },
      { 
        productName: "Apple MacBook Air M1 256GB 2020", 
        quantity: 2, 
        price: 2598, 
        image: "https://example.com/images/macbook-air-m1.jpg" 
      },
    ],
  };

  const totalPrice = orderDetails.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Chi tiết đơn đặt hàng</h2>
      <div className="mb-4">
        <div className="flex gap-4 mb-2">
          <div className="w-1/2">
            <label className="block font-semibold">Họ:</label>
            <input
              type="text"
              value={orderDetails.customer.lastName}
              readOnly
              className="border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2 w-full"
            />
          </div>
          <div className="w-1/2">
            <label className="block font-semibold">Tên:</label>
            <input
              type="text"
              value={orderDetails.customer.firstName}
              readOnly
              className="border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2 w-full"
            />
          </div>
        </div>

        <label className="block font-semibold">Địa chỉ:</label>
        <input
          type="text"
          value={orderDetails.customer.address}
          readOnly
          className="border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2 w-full mb-2"
        />

        <div className="flex gap-4 mb-2">
          <div className="w-1/2">
            <label className="block font-semibold">Email:</label>
            <input
              type="email"
              value={orderDetails.customer.email}
              readOnly
              className="border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2 w-full"
            />
          </div>
          <div className="w-1/2">
            <label className="block font-semibold">Phương thức thanh toán:</label>
            <input
              type="text"
              value={orderDetails.customer.paymentMethod}
              readOnly
              className="border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2 w-full"
            />
          </div>
        </div>
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
            {orderDetails.items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">
                  <img 
                    src={item.image} 
                    alt={item.productName} 
                    className="w-16 h-16 object-cover" 
                  />
                </td>
                <td className="p-2">{item.productName}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between font-bold">
        <span>Tổng số tiền</span>
        <span>${totalPrice}</span>
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
