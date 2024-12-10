/* eslint-disable react/prop-types */

const UserDetail = ({ data, onClose }) => {
  if (!data) {
    return <p className="text-gray-500">Không có thông tin người dùng để hiển thị.</p>;
  }
  return (
    <div className=" bg-white space-y-4">
      <h2 className="mb-4 text-xl font-semibold tracking-wide">
        Thông tin người dùng: <span className="font-bold">{data.username}</span>
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Tên người dùng</label>
          <p className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100">
            {data.username || "Chưa có thông tin"}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <p className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100">
            {data.email || "Chưa có thông tin"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Số điện thoại</label>
          <p className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100">
            {data.phoneNumber || "Chưa có thông tin"}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium">Giới tính</label>
          <p className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100">
            { data.gender || "Chưa có thông tin"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium">Ngày sinh</label>
          <p className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100">
            {data.birthday || "Chưa có thông tin"}
          </p>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default UserDetail;