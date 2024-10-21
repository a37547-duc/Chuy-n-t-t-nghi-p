import { FaEdit } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";


const InformationUser = () => {

  // State quản lý các thông tin khách hàng
  const [name, setName] = useState("NGUYEN THANH");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("0362270560");
  const [birthday, setBirthday] = useState("2002-03-14");
  const [totalPurchase, setTotalPurchase] = useState("9.064.000đ");

  // State theo dõi focus của từng ô nhập liệu
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isGenderFocused, setIsGenderFocused] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isBirthdayFocused, setIsBirthdayFocused] = useState(false);
  
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center h-[50px] bg-white shadow-md rounded-md">
        <Link to= "/account" 
          href="/account"
          className="text-gray-600 w-[50px] h-full flex justify-center items-center"
        >
          <FaArrowLeft className="w-full h-[20px]" />
        </Link>
        <h1 className="text-xl font-bold">Thông tin khách hàng</h1>
        <div className="w-6 h-6"></div> {/* Placeholder for space alignment */}
      </header>

      {/* Customer Info */}
      <div className="flex flex-col items-center my-6">
        <img
          src="https://via.placeholder.com/100"
          alt="avatar"
          className="w-24 h-24 rounded-full"
        />
        <h2 className="text-xl font-bold mt-4">{name}</h2>
      </div>

      {/* Customer Details */}
      <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
        <div className="flex items-center border-b border-gray-200">
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder={isNameFocused ? "" : `Họ và tên: ${name}`} // Placeholder hiển thị giá trị
            className="flex-grow rounded px-2 py-1 focus:outline-none focus:border-none"
            onFocus={() => setIsNameFocused(true)} // Khi focus
            onBlur={() => {
              setIsNameFocused(false); // Khi blur
              if (name.trim() === "") {
                setName("NGUYEN THANH"); // Đặt lại giá trị mặc định nếu ô trống
              }
            }}
          />
          <FaEdit className="right-0 text-gray-600" />
        </div>
        <div className="flex items-center border-b border-gray-200">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={isEmailFocused ? "" : `Email: ${email}`} // Placeholder cho email
            className="flex-grow px-2 py-1 focus:outline-none focus:border-none"
            onFocus={() => setIsEmailFocused(true)} // Khi focus
            onBlur={() => setIsEmailFocused(false)} // Khi blur
          />
          <FaEdit className="text-gray-600" />
        </div>
        <div className="flex items-center border-b border-gray-200">
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="flex-grow border rounded px-2 py-1 border-none focus:outline-none focus:border-none"
            onFocus={() => setIsGenderFocused(true)} // Khi focus
            onBlur={() => setIsGenderFocused(false)} // Khi blur
          >
            <option value="" disabled hidden>
              Chọn giới tính
            </option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khác">Khác</option>
          </select>
        </div>
        <div className="flex items-center border-b border-gray-200">
          <input
            type="tel"
            onChange={(e) => setPhone(e.target.value)}
            placeholder={isPhoneFocused ? "" : `Số điện thoại: ${phone}`} // Placeholder cho số điện thoại
            className="flex-grow px-2 py-1 focus:outline-none focus:border-none"
            onFocus={() => setIsPhoneFocused(true)} // Khi focus
            onBlur={() => setIsPhoneFocused(false)} // Khi blur
          />
          <FaEdit className="text-gray-600" />
        </div>
        <div className="flex justify-between items-center">
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            placeholder={isBirthdayFocused ? "" : `Ngày sinh: ${birthday}`} // Placeholder cho ngày sinh
            className="border rounded px-2 py-1"
            onFocus={() => setIsBirthdayFocused(true)} // Khi focus
            onBlur={() => setIsBirthdayFocused(false)} // Khi blur
          />
        </div>
        <div className="flex items-center">
          <label className="text-sm">Tổng tiền mua hàng:</label>
          <span
            className="font-bold text-red-700 px-2 py-1"
          >
            {totalPurchase}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InformationUser;
