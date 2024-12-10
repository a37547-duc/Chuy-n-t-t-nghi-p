/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeOrderStatus, getAllOrders } from '../../../features/order/orderSlice';

const ChangeOrderStatus = ({ data, onClose }) => {
  const dispatch = useDispatch();
  const [newStatus, setNewStatus] = useState(data.orderStatus);

  const handleChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(changeOrderStatus({ orderId: data._id, newStatus })).unwrap();
      console.log(newStatus);
      setTimeout(() => {
        dispatch(getAllOrders());
      }, 1000);
      onClose();
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Thay đổi trạng thái đơn hàng</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="status" className="block mb-2">Chọn trạng thái mới:</label>
        <select
          id="status"
          value={newStatus}
          onChange={handleChange}
          className="border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2 w-full"
        >
          <option value={data.orderStatus}>{data.orderStatus}</option>
          <option value="Chờ xác nhận">Chờ xác nhận</option>
          <option value="Đã xác nhận">Đã xác nhận</option>
          <option value="Đã giao hàng">Đã giao hàng</option>
          <option value="Giao hàng thành công">Giao hàng thành công</option>
          <option value="Đã hủy">Đã hủy</option>
        </select>
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangeOrderStatus;
