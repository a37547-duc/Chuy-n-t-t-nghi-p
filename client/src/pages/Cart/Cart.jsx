import { useState, useEffect } from 'react';

function ShoppingCart() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Gaming Laptop',
      brand: 'Alienware',
      specs: 'Intel Core i9, 32GB RAM, 1TB SSD',
      price: 2500.00,
      quantity: 1,
      inStock: true,
    },
    {
      id: 2,
      name: 'Ultrabook',
      brand: 'Dell XPS 13',
      specs: 'Intel Core i7, 16GB RAM, 512GB SSD',
      price: 1500.00,
      quantity: 1,
      inStock: true,
    },
    {
      id: 3,
      name: 'Desktop PC',
      brand: 'Custom Build',
      specs: 'AMD Ryzen 9, 64GB RAM, 2TB SSD',
      price: 3000.00,
      quantity: 1,
      inStock: true,
    },
  ]);

  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    shipping: 50.00,
    tax: 200.00,
    total: 0,
  });

  useEffect(() => {
    updateOrderSummary();
  }, [items]);

  const handleQuantityChange = (itemId, newQuantity) => {
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setItems(updatedItems);
  };

  const updateOrderSummary = () => {
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const total = subtotal + orderSummary.shipping + orderSummary.tax;
    setOrderSummary({ ...orderSummary, subtotal, total });
  };

  const handleCheckout = () => {
    console.log('Checkout button clicked!');
  };

  return (
    <div className="container mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-5">Giỏ hàng</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:col-span-1">
          {items.map((item) => (
            <div key={item.id} className="border rounded-md p-4 mb-4 flex">
              <img
                src={`https://via.placeholder.com/100?text=${item.name}`}
                alt={item.name}
                className="w-20 h-20 rounded-md"
              />
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-medium">{item.name}</h2>
                <p className="text-gray-600">
                  {item.brand} - {item.specs}
                </p>
                <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
                <div className="flex items-center mt-2">
                  <span className="mr-2">Số lượng:</span>
                  <select
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    className="border rounded px-2 py-1"
                  >
                    {[...Array(10).keys()].map((i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                {item.inStock ? (
                  <span className="text-green-500 mt-2 block">✓ In stock</span>
                ) : (
                  <span className="text-yellow-500 mt-2 block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 inline-block mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Ships in 2-3 days
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-1 border rounded-md p-4">
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
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
