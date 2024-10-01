import React, { useState } from 'react';

const ChangeOrderStatus = ({ orderId, currentStatus, onUpdate, onClose }) => {
  const [newStatus, setNewStatus] = useState(currentStatus);

  const handleChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(orderId, newStatus);
    onClose(); // Đóng modal sau khi cập nhật
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Change Order Status</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="status" className="block mb-2">Select New Status:</label>
        <select
          id="status"
          value={newStatus}
          onChange={handleChange}
          className="border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2 w-full"
        >
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
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
