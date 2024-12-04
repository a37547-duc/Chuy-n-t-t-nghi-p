import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [generalMessage, setGeneralMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const token = new URLSearchParams(location.search).get("token");

  // Hàm kiểm tra tính hợp lệ của mật khẩu
  const validateForm = () => {
    let isValid = true;

    // Kiểm tra mật khẩu
    if (!password) {
      setPasswordError("Vui lòng nhập mật khẩu mới.");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Mật khẩu phải có ít nhất 8 ký tự.");
      isValid = false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordError("Mật khẩu phải chứa ít nhất một ký tự đặc biệt.");
      isValid = false;
    } else if (/\s/.test(password)) {
      setPasswordError("Mật khẩu không được chứa khoảng trắng.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // Kiểm tra xác nhận mật khẩu
    if (!confirmPassword) {
      setConfirmPasswordError("Vui lòng xác nhận mật khẩu.");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Mật khẩu xác nhận không khớp.");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setGeneralMessage("");

    try {
      const response = await axios.post(
        "https://laptech4k.onrender.com/api/v1/user/reset-password/confirm",
        {
          token,
          password,
        }
      );

      if (response.status === 200) {
        setGeneralMessage("Mật khẩu đã được thay đổi thành công!");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        setGeneralMessage(
          response.data.error || "Đã có lỗi xảy ra. Vui lòng thử lại."
        );
      }
    } catch (error) {
      setGeneralMessage("Không thể kết nối với máy chủ. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setTokenValid(false);
      setGeneralMessage("Token không hợp lệ!");
    } else {
      setTokenValid(true);
    }
  }, [token]);

  if (!tokenValid) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h1 className="text-xl font-semibold text-red-500">
            Token không hợp lệ hoặc đã hết hạn!
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Đặt lại mật khẩu
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mật khẩu mới */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Mật khẩu mới:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu mới"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                passwordError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          {/* Xác nhận mật khẩu */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              Xác nhận mật khẩu:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Xác nhận mật khẩu"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                confirmPasswordError
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {confirmPasswordError && (
              <p className="text-red-500 text-sm mt-1">
                {confirmPasswordError}
              </p>
            )}
          </div>

          {/* Nút gửi */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 rounded-lg text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
          </button>
        </form>

        {/* Thông báo chung */}
        {generalMessage && (
          <p
            className={`mt-4 text-center ${
              generalMessage.includes("không hợp lệ") || generalMessage.includes("không thể")
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {generalMessage}
          </p>
        )}
      </div>
    </div>
  );
}
