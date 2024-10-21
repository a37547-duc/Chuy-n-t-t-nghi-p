import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Sử dụng icon từ react-icons
const HeadUser = () => {
  const [isPhoneHidden, setIsPhoneHidden] = useState(true); // State để kiểm tra ẩn/hiện số điện thoại

  const phoneNumber = "0362270560"; // Số điện thoại cố định

  // Hàm xử lý để ẩn/hiện số điện thoại
  const getMaskedPhoneNumber = (phone) => {
    if (isPhoneHidden) {
      return phone.slice(0, 2) + '*****' + phone.slice(-3); // Ẩn số điện thoại, chỉ hiện 2 số đầu và 3 số cuối
    }
    return phone; // Hiển thị đầy đủ số điện thoại khi không bị ẩn
  };
 return (
  <div className="bg-white p-4 mt-4">
  <div className="flex items-center">
    <img
      src="https://i.imgur.com/XqOsGfW.png" // Dùng hình avatar placeholder hoặc hình tương tự
      alt="Avatar"
      className="w-16 h-16 rounded-full"
    />
    <div className="ml-4">
      <h2 className="text-lg font-bold text-blue-700">NGUYEN THANH</h2>
      <div className="flex items-center">
        <p className="text-sm mr-2">{getMaskedPhoneNumber(phoneNumber)}</p>
        <button onClick={() => setIsPhoneHidden(!isPhoneHidden)} className="focus:outline-none">
          {isPhoneHidden ? <FaEyeSlash /> : <FaEye />} {/* Đổi icon khi ẩn/hiện */}
        </button>
      </div>
    </div>
  </div>
  <div className="mt-4 bg-blue-100 p-2 rounded">
    <p className="text-sm text-blue-600">
      Cập nhật thông tin cá nhân và địa chỉ để có trải nghiệm đặt hàng nhanh và thuận tiện hơn.
    </p>
    <button className="mt-2 text-blue-600">Cập nhật</button>
  </div>
</div>
 );
}

export default HeadUser;