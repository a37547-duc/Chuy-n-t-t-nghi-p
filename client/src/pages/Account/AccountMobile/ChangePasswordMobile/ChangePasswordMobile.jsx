import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePasswordMobile = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isMasked, setIsMasked] = useState(true);

  // Hiển thị mật khẩu trong 1 giây trước khi chuyển thành dấu chấm
  useEffect(() => {
    if (currentPassword || newPassword || confirmPassword) {
      const timer = setTimeout(() => {
        setIsMasked(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentPassword, newPassword, confirmPassword]);

  const validateForm = () => {
    const newErrors = {};
    if (!currentPassword) {
      newErrors.currentPassword = "Vui lòng nhập mật khẩu hiện tại.";
    }
    if (!newPassword) {
      newErrors.newPassword = "Vui lòng nhập mật khẩu mới.";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "Mật khẩu phải có ít nhất 6 ký tự.";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận lại mật khẩu.";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu không khớp.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      console.log("Đổi mật khẩu thành công!");
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between items-center h-[50px] bg-white shadow-md rounded-md">
        <Link 
          to="/account" 
          className="text-gray-600 w-[50px] h-full flex justify-center items-center">
          <FaArrowLeft className="w-full h-[20px]" />
        </Link>
        <h1 className="text-xl font-bold">Tạo mật khẩu mới</h1>
        <div className="w-6 h-6"></div>
      </header>

      <div className="flex flex-col items-center py-6">
        <img
          src="https://cellphones.com.vn/smember/_nuxt/img/Shipper_CPS3.77d4065.png"
          alt="Mascot"
          className="w-32 mb-4"
        />

        {/* Form */}
        <form className="w-full max-w-sm mt-6" onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="current-password">
              Nhập mật khẩu hiện tại
            </label>
            <input
              id="current-password"
              type={showCurrentPassword ? "text" : isMasked ? "password" : "text"}
              placeholder="Nhập mật khẩu hiện tại của bạn"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.currentPassword && "border-red-500"}`}
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
                setIsMasked(false); // Hiển thị text trong 1 giây trước khi thành dấu chấm
              }}
            />
            <button
              type="button"
              className="absolute mt-[-25px] right-0 pr-3 flex items-center"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.currentPassword && <p className="text-red-500 text-xs mt-1">{errors.currentPassword}</p>}
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new-password">
              Tạo mật khẩu mới
            </label>
            <input
              id="new-password"
              type={showNewPassword ? "text" : isMasked ? "password" : "text"}
              placeholder="Nhập mật khẩu mới của bạn"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.newPassword && "border-red-500"}`}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setIsMasked(false);
              }}
            />
            <button
              type="button"
              className="absolute mt-[-25px] right-0 pr-3 flex items-center"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.newPassword && <p className="text-red-500 text-xs mt-1">{errors.newPassword}</p>}
            <p className="text-xs text-gray-500 mt-2">Mật khẩu tối thiểu 6 ký tự, có ít nhất 1 chữ và 1 số.</p>
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
              Xác nhận lại mật khẩu
            </label>
            <input
              id="confirm-password"
              type={showConfirmPassword ? "text" : isMasked ? "password" : "text"}
              placeholder="Nhập lại mật khẩu"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.confirmPassword && "border-red-500"}`}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setIsMasked(false);
              }}
            />
            <button
              type="button"
              className="absolute mt-[-25px] right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Đổi mật khẩu
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordMobile;
