/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
// import { useState } from "react";
import { deleteProduct } from "../../../features/Admin/adminProductsSlice";
import { getAllProducts } from "../../../features/product/productsSlice";

const DeleteProduct = ({ data, onClose }) => {
  const dispatch = useDispatch();


  const handleDelete = async () => {
    try {
      await dispatch(deleteProduct(data)).unwrap();
      console.log("Product deleted successfully");
      dispatch(getAllProducts());
      onClose();
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
    }
  };


  return (
    <div className="space-y-4">
      <h2 className="mb-4 text-xl font-semibold tracking-wide text-red-500">
        Xóa sản phẩm
      </h2>
      <p className="text-gray-700">
        Bạn có chắc chắn muốn xóa sản phẩm này không? Hành động này
        không thể hoàn tác.
      </p>

      <div className="flex justify-end space-x-2">
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Xóa
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Hủy
        </button>
      </div>
    </div>
  );
};

export default DeleteProduct;
