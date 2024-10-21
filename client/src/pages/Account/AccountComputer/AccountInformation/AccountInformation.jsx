import { useState } from "react";

const AccountInformation = () => {
  const initialUser = {
    id: "1",
    name: "THANH NGUYEN",
    email: "ABC@gmail.com",
    phone: "0123456789",
    DateOfBirth: "",
    sex: "", // Khởi tạo với giá trị trống
    TotalPurchasePrice: "9.600.000đ",
  };

  const [user, setUser] = useState(initialUser);
  const [isChanged, setIsChanged] = useState(false);

  // Hàm kiểm tra xem thông tin có thay đổi không
  const checkIfChanged = (newUser) => {
    return JSON.stringify(newUser) !== JSON.stringify(initialUser);
  };

  // Hàm xử lý thay đổi thông tin người dùng
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => {
      const newUser = { ...prevUser, [name]: value };
      setIsChanged(checkIfChanged(newUser));
      return newUser;
    });
  };

  // Hàm xử lý sự kiện thay đổi radio button
  const handleRadioChange = (e) => {
    const { value } = e.target;
    setUser((prevUser) => {
      const newUser = { ...prevUser, sex: value };
      setIsChanged(checkIfChanged(newUser));
      return newUser;
    });
  };

  return (
    <div className="p-4">
      <div className="flex mb-3 p-0 border-none font-bold text-[20px] leading-[28px] opacity-100 text-inherit transition-colors duration-300">
        Thông tin tài khoản
      </div>

      <form className="border p-4 rounded-lg space-y-4">
        <div>
          <label className="text-[13px] block mb-1">Họ Tên:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-[16px] h-[40px]"
          />
        </div>

        <div>
          <label className="text-[13px] block mb-1 ">Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-[16px] h-[40px]"
          />
        </div>

        <div>
          <label className="text-[13px] block mb-1 ">Số điện thoại:</label>
          <input
            type="tel"
            name="phone"
            value={user.phone}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-[16px] h-[40px]"
          />
        </div>

        <div>
          <label className="text-[13px] block mb-1 ">Ngày sinh:</label>
          <input
            type="date"
            name="DateOfBirth"
            value={user.DateOfBirth}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-[16px] h-[40px]"
          />
        </div>

        <div>
          <label className="text-[13px] block mb-1 ">Giới tính:</label>
          <div className="flex items-center space-x-4">
            <label className="text-[13px] inline-flex items-center">
              <input
                type="radio"
                name="sex"
                value="Nam"
                checked={user.sex === "Nam"}
                onChange={handleRadioChange}
                className="form-radio text-blue-500"
              />
              <span className="ml-2">Nam</span>
            </label>

            <label className="text-[13px] inline-flex items-center">
              <input
                type="radio"
                name="sex"
                value="Nữ"
                checked={user.sex === "Nữ"}
                onChange={handleRadioChange}
                className="form-radio text-blue-500"
              />
              <span className="ml-2">Nữ</span>
            </label>

            <label className="text-[13px] inline-flex items-center">
              <input
                type="radio"
                name="sex"
                value="Khác"
                checked={user.sex === "Khác"}
                onChange={handleRadioChange}
                className="form-radio text-blue-500"
              />
              <span className="ml-2">Khác</span>
            </label>
          </div>
        </div>

        <div className="">
          <label className="text-[13px] block mb-1">Số tiền tích lũy:</label>
          <span
            className="w-full px-3 py-2 min-h-[16px] h-[40px] text-red-700 font-bold"
          >
            {user.TotalPurchasePrice}
          </span>
        </div>

        <button
          type="button"
          disabled={!isChanged}
          className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ${!isChanged ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default AccountInformation;
