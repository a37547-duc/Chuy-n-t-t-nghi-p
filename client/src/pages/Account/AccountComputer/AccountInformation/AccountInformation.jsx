import { useState, useEffect, useCallback } from "react";
import { getUserProfile, updateUserProfile } from "../../../../features/Auth/authProfileSlice";
import { useDispatch, useSelector } from "react-redux";

const AccountInformation = () => {
  const dispatch = useDispatch();
  const { useProfile, loading, error } = useSelector((state) => state.profile);

  const [user, setUser] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
  });

  const [isChanged, setIsChanged] = useState(false);
  const [phoneError, setPhoneError] = useState("");

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
        dateOfBirth: useProfile.data.dateOfBirth || "",
      });
    }
  }, [useProfile]);

  // Hàm kiểm tra xem thông tin có thay đổi không
  const checkIfChanged = useCallback((newUser) => {
    return JSON.stringify(newUser) !== JSON.stringify(user);
  }, [user]);

  // Hàm xử lý thay đổi giá trị trong form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Cập nhật giá trị mới cho các trường nhập liệu, đảm bảo không có giá trị undefined
    setUser((prevUser) => {
      const newUser = { ...prevUser, [name]: value !== undefined ? value : "" };
      setIsChanged(checkIfChanged(newUser));
      return newUser;
    });

    if (name === "phoneNumber") {
      validatePhoneNumber(value);
    }
  };

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
    setPhoneError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatePhoneNumber(user.phoneNumber)) {
      return;
    }

    dispatch(updateUserProfile(user))
      .then(() => {dispatch(getUserProfile());})
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
              name="username"
              value={user.username}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-[16px] h-[40px]"
            />
          </div>

          <div>
            <label className="text-[13px] block mb-1 ">Email:</label>
            <p className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-[16px] h-[40px] bg-gray-200 text-gray-700">
              {user.email}
            </p>
          </div>

          <div>
            <label className="text-[13px] block mb-1 ">Số điện thoại:</label>
            <input
              type="tel"
              name="phoneNumber"
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
              name="dateOfBirth"
              value={user.dateOfBirth || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 min-h-[16px] h-[40px]"
            />
          </div>

          <div>
            <label className="text-[13px] block mb-1">Giới tính:</label>
            <div className="flex items-center space-x-4">
              {["Nam", "Nữ", "Khác"].map((genderOption) => (
                <label key={genderOption} className="text-[13px] inline-flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value={genderOption}
                    checked={user.gender === genderOption}
                    onChange={handleRadioChange}
                    className="form-radio text-blue-500"
                  />
                  <span className="ml-2">{genderOption}</span>
                </label>
              ))}
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