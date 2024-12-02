import { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../../../../features/Auth/authProfileSlice";
import { useDispatch, useSelector } from "react-redux";

const AccountInformation = () => {
  const dispatch = useDispatch();
  const { useProfile, loading, error } = useSelector((state) => state.profile);
  // console.log("User: ", useProfile)

  // State để lưu thông tin user
  const [user, setUser] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    gender: "",
  });

  const [isChanged, setIsChanged] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  // Lấy thông tin người dùng từ Redux store khi component mount
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  // Cập nhật state `user` khi `useProfile` thay đổi
  useEffect(() => {
    if (useProfile) {
      setUser({
        username: useProfile.data.username || "",
        email: useProfile.data.email || "",
        phoneNumber: useProfile.data.phoneNumber || "",
        gender: useProfile.data.gender || "",
      });
    }
  }, [useProfile]);

  // Hàm kiểm tra xem thông tin có thay đổi không
  const checkIfChanged = (newUser) => {
    return JSON.stringify(newUser) !== JSON.stringify({
      username: useProfile?.data.username || "",
      email: useProfile?.data.email || "",
      phoneNumber: useProfile?.data.phoneNumber || "",
      gender: useProfile?.data.gender || "",
    });
  };

  // Hàm xử lý thay đổi giá trị trong form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Cập nhật giá trị mới cho các trường nhập liệu, đảm bảo không có giá trị undefined
    setUser((prevUser) => {
      const newUser = { ...prevUser, [name]: value !== undefined ? value : "" }; // Tránh giá trị undefined, thay bằng chuỗi rỗng
      setIsChanged(checkIfChanged(newUser)); // Kiểm tra xem thông tin có thay đổi không
      return newUser;
    });

    if (name === "phoneNumber") {
      validatePhoneNumber(value); // Kiểm tra số điện thoại ngay khi nhập
    }
  };

  // Hàm xử lý thay đổi radio button
  const handleRadioChange = (e) => {
    const { value } = e.target;
    setUser((prevUser) => {
      const newUser = { ...prevUser, gender: value };
      setIsChanged(checkIfChanged(newUser));
      return newUser;
    });
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneNumber) {
      setPhoneError(""); // Xóa lỗi nếu ô trống
      return true;
    }
    if (/\s/.test(phoneNumber)) {
      setPhoneError("Số điện thoại không được chứa khoảng trống.");
      return false;
    }
    if (phoneNumber.length > 1 && phoneNumber[1] === "0") {
      setPhoneError("Số thứ hai phải khác số 0.");
      return false;
    }
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError("Số điện thoại phải gồm đúng 10 chữ số và chỉ chứa số.");
      return false;
    }
    setPhoneError(""); // Không có lỗi
    return true;
  };

  // Hàm xử lý gửi form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra số điện thoại trước khi gửi
    if (!validatePhoneNumber(user.phoneNumber)) {
      return;
    }

    dispatch(updateUserProfile(user))
      .then(() => {
        dispatch(getUserProfile());
      })
      .catch((error) => {
        console.log("Có lỗi xảy ra khi cập nhật thông tin:", error);
      });

    console.log("Dữ liệu gửi: ", user);
  };

  return (
    <div className="p-4">
      <div className="flex mb-3 p-0 border-none font-bold text-[20px] leading-[28px] opacity-100 text-inherit transition-colors duration-300">
        Thông tin tài khoản
      </div>

      {loading && (
        <div className="flex justify-center items-center mt-6">
          <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <span className="ml-2 text-blue-500">Loading...</span>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          <p>Lỗi: {error.message || error}</p>
        </div>
      )}

      {!loading && !error && (
        <form onSubmit={handleSubmit} className="border p-4 rounded-lg space-y-4">
          <div>
            <label className="text-[13px] block mb-1">Họ Tên:</label>
            <input
              type="text"
              name="username" // sửa lại thành "username"
              value={user.username}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-[16px] h-[40px]"
            />
          </div>

          <div>
            <label className="text-[13px] block mb-1 ">Email:</label>
            {/* <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-[16px] h-[40px]"
            /> */}
            <p className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-[16px] h-[40px] bg-gray-200 text-gray-700">
              {user.email}
            </p>
          </div>

          <div>
            <label className="text-[13px] block mb-1 ">Số điện thoại:</label>
            <input
              type="tel"
              name="phoneNumber" // sửa lại thành "phoneNumber"
              value={user.phoneNumber}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-[16px] h-[40px]"
            />
            {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
          </div>

          <div>
            <label className="text-[13px] block mb-1 ">Ngày sinh:</label>
            <input
              type="date"
              name="DateOfBirth"
              value={user.DateOfBirth || ""} // Giữ giá trị hợp lệ, tránh undefined
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
                  name="gender" // sửa lại thành "gender"
                  value="Nam"
                  checked={user.gender === "Nam"}
                  onChange={handleRadioChange}
                  className="form-radio text-blue-500"
                />
                <span className="ml-2">Nam</span>
              </label>

              <label className="text-[13px] inline-flex items-center">
                <input
                  type="radio"
                  name="gender" // sửa lại thành "gender"
                  value="Nữ"
                  checked={user.gender === "Nữ"}
                  onChange={handleRadioChange}
                  className="form-radio text-blue-500"
                />
                <span className="ml-2">Nữ</span>
              </label>

              <label className="text-[13px] inline-flex items-center">
                <input
                  type="radio"
                  name="gender" // sửa lại thành "gender"
                  value="Khác"
                  checked={user.gender === "Khác"}
                  onChange={handleRadioChange}
                  className="form-radio text-blue-500"
                />
                <span className="ml-2">Khác</span>
              </label>
            </div>
          </div>

          <div>
            <label className="text-[13px] block mb-1">Số tiền tích lũy:</label>
            <span
              className="w-full px-3 py-2 min-h-[16px] h-[40px] text-red-700 font-bold"
            >
              {user.TotalPurchasePrice || "0 VND"}
            </span>
          </div>

          <button
            type="submit"
            disabled={!isChanged}
            className={`bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 ${!isChanged ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Cập nhật
          </button>
        </form>
      )}
    </div>
  );
};

export default AccountInformation;