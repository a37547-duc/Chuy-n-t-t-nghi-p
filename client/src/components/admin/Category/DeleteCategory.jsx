// eslint-disable-next-line react/prop-types
const DeleteCategory = ({ categoryName, onDelete, onClose }) => {
    const handleDelete = () => {
      onDelete();
    };
  
    return (
      <div className="space-y-4">
        <h2 className="mb-4 text-xl font-semibold tracking-wide text-red-500">
          Xóa danh mục
        </h2>
        <p className="text-gray-700">
          Bạn có chắc chắn muốn xóa danh mục{" "}
          <span className="font-bold">{categoryName}</span> không? Hành động này
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
  
export default DeleteCategory;
  