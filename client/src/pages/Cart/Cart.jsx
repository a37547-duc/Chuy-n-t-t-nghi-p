import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function ShoppingCart() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Gaming Laptop',
      brand: 'Alienware',
      specs: 'Intel Core i9, 32GB RAM, 1TB SSD',
      price: 2500.0,
      quantity: 1,
      inStock: true,
    },
    {
      id: 2,
      name: 'Ultrabook',
      brand: 'Dell XPS 13',
      specs: 'Intel Core i7, 16GB RAM, 512GB',
      price: 1500.0,
      quantity: 1,
      inStock: false,
    },
    {
      id: 3,
      name: 'Desktop PC',
      brand: 'Custom Build',
      specs: 'AMD Ryzen 9, 64GB RAM, 2TB SSD',
      price: 3000.0,
      quantity: 1,
      inStock: true,
    },
  ]);

  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    shipping: 50.0,
    tax: 200.0,
    total: 0,
  });

  useEffect(() => {
    updateOrderSummary();
  }, [items]);

  const handleQuantityChange = (itemId, newQuantity) => {
    const quantity = Math.min(99, Math.max(1, Number(newQuantity) || 1));
    const updatedItems = items.map((item) =>
      item.id === itemId
        ? { ...item, quantity }
        : item
    );
    setItems(updatedItems);
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };

  const handleRemoveAll = () => {
    setItems([]);
  };

  const updateOrderSummary = () => {
    const subtotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const total = subtotal + orderSummary.shipping + orderSummary.tax;
    setOrderSummary({ ...orderSummary, subtotal, total });
  };

  const handleCheckout = () => {
    console.log('Checkout button clicked!');
  };

  const handleContinueShopping = () => {
    console.log('Continue Shopping button clicked!');
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <h1 className="container mx-auto max-w-screen-lg text-2xl font-bold mb-5">Giỏ hàng</h1>
      <div className="container mx-auto max-w-screen-lg bg-white rounded-md shadow-md p-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96">
            <FontAwesomeIcon icon={faShoppingCart} className="text-gray-500 text-6xl mb-4" />
            <p className="text-gray-600 mb-4">Giỏ hàng của bạn trống.</p>
            <button
              onClick={handleContinueShopping}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Quay lại mua hàng
            </button>
          </div>
        ) : (
          <>
            <div className="flex mb-2">
              <button
                onClick={handleRemoveAll}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Xóa tất cả
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="border rounded-md p-4 mb-4 flex justify-between items-start"
                  >
                    <div className="flex">
                      <img
                        src={`https://via.placeholder.com/100?text=${item.name}`}
                        alt={item.name}
                        className="w-20 h-20 rounded-md"
                      />
                      <div className="ml-4">
                        <h2 className="text-lg font-medium">{item.name}</h2>
                        <p className="text-gray-600 overflow-hidden overflow-ellipsis">
                          {item.brand} - {item.specs}
                        </p>
                        <p className="text-sm font-bold">${item.price.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between">
                      <div className="flex items-center">
                        <span className="mr-2 text-sm">Số lượng:</span>
                        <div className="flex items-center border rounded-lg bg-gray-50">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="bg-transparent px-1 py-1 text-gray-700 hover:text-gray-900 text-xs"
                          >
                            <FontAwesomeIcon icon={faMinus} className="text-xs" />
                          </button>
                          <input
                            type="text"
                            className="text-sm text-gray-700 w-6 text-center"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                            required
                          />
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="bg-transparent px-1 py-1 text-gray-700 hover:text-gray-900 text-xs"
                          >
                            <FontAwesomeIcon icon={faPlus} className="text-xs" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-4">
                        <span className="text-sm font-bold">
                          Thành tiền: ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 ml-4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
              <div className="md:col-span-1 border rounded-md p-4 bg-gray-50">
                <h2 className="text-xl font-bold mb-4">Tổng đơn hàng</h2>
                <div className="flex justify-between mb-2">
                  <span>Tổng</span>
                  <span>${orderSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Phí vận chuyển</span>
                  <span>${orderSummary.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span>Thuế VAT</span>
                  <span>${orderSummary.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Tổng cộng</span>
                  <span className="font-bold">${orderSummary.total.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
                >
                  Thanh toán
                </button>
                <button
                  onClick={handleContinueShopping}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-2 w-full"
                >
                  Tiếp tục mua sắm
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;
