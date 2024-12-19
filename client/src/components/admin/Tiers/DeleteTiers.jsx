/* eslint-disable react/prop-types */
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { deleteTiers } from "../../../features/Admin/adminTiersSlice";
import { getAllTiers } from "../../../features/tier/tiersSlice";

const DeleteTiers = ({ tierId, tierName, onClose }) => {
  const dispatch = useDispatch();

  const handleDelete = useCallback(() => {
    dispatch(deleteTiers(tierId))
      .unwrap()
      .then(() => {
        console.log("Hạng đã được xóa thành công.");
        dispatch(getAllTiers());
        onClose();
      })
      .catch((error) => {
        console.error("Lỗi khi xóa hạng:", error);
      });
  }, [tierId, dispatch, onClose]);

  return (
    <div className="space-y-4">
      <h2 className="mb-4 text-xl font-semibold tracking-wide text-red-500">Xóa hạng</h2>
      <p className="text-gray-700">
        Bạn có chắc chắn muốn xóa hạng{" "}
        <span className="font-bold">{tierName}</span> không? Hành động này
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

export default DeleteTiers;
