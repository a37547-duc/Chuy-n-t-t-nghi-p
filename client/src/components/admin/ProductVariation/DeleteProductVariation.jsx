import React from "react";
import { useDispatch } from "react-redux";
import { deleteVariation } from "../../../features/Admin/adminVariationsSlice";
import { getAllProductVariations } from "../../../features/product/productVariationSlice";

const DeleteProductVariation = ({ data, productId, onClose }) => {
  const dispatch = useDispatch();


  const handleDelete = () => {
    dispatch(deleteVariation(data))
      .unwrap()
      .then(() => {
        dispatch(getAllProductVariations(productId));
        onClose();
      })
      .catch((error) => {
        console.error("Error deleting variation:", error);
      });
  };

  return (
    <div>
      <p>Bạn có chắc chắn muốn xóa biến thể đã chọn không?</p>
      <div className="flex justify-end space-x-2 mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Hủy
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default DeleteProductVariation;
