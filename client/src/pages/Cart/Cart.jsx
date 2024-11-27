import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { updateCartItem, removeItemFromCart, clearCart } from '../../features/cart/cartSlice';

function ShoppingCart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(state => state.cart.items);
  const totalAmount = useSelector(state => state.cart.totalAmount)
  
  // const handleQuantityChange = (itemId, newQuantity) => {
  //   const quantity = Math.min(99, Math.max(1, Number(newQuantity) || 1));
  //   const updatedItems = items.map((item) =>
  //     item.id === itemId
  //       ? { ...item, quantity }
  //       : item
  //   );
  //   setItems(updatedItems);
  // };
  const handleCheckout = () => {
    navigate('/checkouts');
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    const quantity = Math.min(99, Math.max(1, Number(newQuantity) || 1));
    dispatch(updateCartItem({ id: itemId, quantity }));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItemFromCart(itemId));
  };

  const handleRemoveAll = () => {
    dispatch(clearCart());
  };

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <h1 className="container mx-auto max-w-screen-lg text-2xl font-bold mb-5">Giỏ hàng</h1>
      <div className="container mx-auto max-w-screen-lg bg-white rounded-md shadow-md p-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96">
            <FontAwesomeIcon icon={faShoppingCart} className="text-gray-500 text-6xl mb-4" />
            <p className="text-gray-600 mb-4">Giỏ hàng của bạn trống.</p>
            <Link to="/">
              <button
                // onClick={handleContinueShopping}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Quay lại mua hàng
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-start-2 flex justify-end mb-2">
                <button
                  onClick={handleRemoveAll}
                  className="text-blue-400 hover:text-red-500 text-sm"
                >
                  Xóa tất cả
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="border rounded-md p-4 mb-4 flex justify-between items-start"
                  >
                    <div className="flex max-w-[400px]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-md"
                      />
                      <div className="ml-4">
                        <Link to={`/products/${item.productId}`}>
                          <h2 className="text-sm font-medium hover:text-blue-500">{item.name}</h2>
                        </Link>

                        <p className="text-gray-600 max-w-xs text-xs">
                          {item.cpu.name}/RAM {item.ram.capacity}/ GPU {item.gpu.name}/{item.storage}
                        </p>
                        <p className="text-sm font-bold">{formatNumber(item.price * item.quantity)}</p>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between">
                      <div className="flex items-center">
                        <span className="mr-2 text-sm">Số lượng:</span>
                        <div className="flex items-center border rounded-lg bg-gray-50">
                          <button
                            onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                            className="bg-transparent px-1 py-1 text-gray-700 hover:text-gray-900 text-xs"
                          >
                            <FontAwesomeIcon icon={faMinus} className="text-xs" />
                          </button>
                          <input
                            type="text"
                            className="text-sm text-gray-700 w-10 text-center mx-1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                            required
                          />
                          <button
                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                            className="bg-transparent px-1 py-1 text-gray-700 hover:text-gray-900 text-xs"
                          >
                            <FontAwesomeIcon icon={faPlus} className="text-xs" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="text-red-500 hover:text-red-700 ml-4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
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
              <div className="md:col-span-1 border rounded-md p-4 bg-gray-50 h-68">
                <h2 className="text-xl font-bold mb-4">Tổng đơn hàng</h2>
                <div className="flex justify-between mb-2">
                  <span>Tổng tạm tính</span>
                  <span>{formatNumber(totalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="">Thành tiền</span>
                  <span className="font-bold text-blue-800">{formatNumber(totalAmount)}</span>
                </div>
                <div className="flex justify-end">
                  <span className="text-xs font-bold text-gray-500">(Đã bao gồm VAT)</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                  Thanh toán
                </button>
                <button
                  onClick={handleContinueShopping}
                  className=" mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
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
