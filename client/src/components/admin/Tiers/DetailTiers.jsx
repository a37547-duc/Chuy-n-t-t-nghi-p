/* eslint-disable react/prop-types */
const DetailTiers = ({ data, onClose }) => {
  if (!data) {
    return <p className="text-gray-500">Không có thông tin người dùng để hiển thị.</p>;
  }

  return (
    <div className="bg-white space-y-4">
      <h2 className="mb-4 text-xl font-semibold tracking-wide">
        Chi tiết hạng: <span className="font-bold">{data.name}</span>
      </h2>

      {/* Hiển thị mô tả */}
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium">Mô tả</label>
          <p className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-700">
            {data.description || "Chưa có thông tin"}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium">Thời gian hiệu lực (ngày)</label>
          <p className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-700">
            {data.couponExpiryDays || "Chưa có thông tin"}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium">Các quyền lợi khác</label>
          <ul className="list-disc pl-5 mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100">
            {data.otherBenefits.map((benefit, index) => (
              <li key={index} className="text-gray-700">{benefit}</li>
            ))}
          </ul>
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

export default DetailTiers;
