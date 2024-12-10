/* eslint-disable react/prop-types */
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { deleteBrand } from "../../../features/Admin/adminBrandSlice";
import { getAllBrands } from "../../../features/brand/brandsSlice";

const DeleteBrand = ({ brandId, brandName, onClose }) => {
  const dispatch = useDispatch();
  // console.log('Brand:', brandName);

  const handleDelete = useCallback(() => {
    dispatch(deleteBrand(brandId))
      .unwrap()
      .then(() => {
        console.log("Danh mục đã được xóa thành công.");
        dispatch(getAllBrands()); // Cập nhật danh sách sau khi xóa
        onClose();
      })
      .catch((error) => {
        console.error("Lỗi khi xóa danh mục:", error);
      });
  },[brandId, dispatch, onClose]);
  
  return (
    <div className="space-y-4">
      <h2 className="mb-4 text-xl font-semibold tracking-wide text-red-500">
        Xóa thương hiệu
      </h2>
      <p className="text-gray-700">
        Bạn có chắc chắn muốn xóa thương hiệu{" "}
        <span className="font-bold">{brandName}</span> không? Hành động này không thể hoàn tác.
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
  
export default DeleteBrand;