import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

  // Hàm kiểm tra định dạng email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Vui lòng nhập email!");
      return;
    }

    if (!validateEmail(email)) {
      setMessage("Email không hợp lệ! Vui lòng nhập email đúng định dạng.");
      return;
    }

    setLoading(true);
    setIsButtonDisabled(true);

    try {
      const response = await axios.post(
        "https://laptech4k.onrender.com/api/v1/user/reset-password",
        { email }
      );

      if (response.status === 200) {
        setMessage("Một email khôi phục mật khẩu đã được gửi đến bạn.");
      } else {
        setMessage(
          response.data.error || "Đã có lỗi xảy ra. Vui lòng thử lại."
        );
      }
    } catch (error) {
      setMessage("Không thể kết nối với máy chủ. Vui lòng thử lại.");
    } finally {
      setTimer(30);
      const countdown = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime === 1) {
            clearInterval(countdown);
            setIsButtonDisabled(false);
          }
          return prevTime - 1;
        });
      }, 1000);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Quên mật khẩu
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Hãy nhập email của bạn để bắt đầu quá trình khôi phục mật khẩu.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email:
            </label>
            <input
            //   type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            //   required
            />
          </div>
          <button
            type="submit"
            disabled={isButtonDisabled}
            className={`w-full px-4 py-2 rounded-lg text-white ${
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isButtonDisabled
              ? `Vui lòng đợi ${timer} giây...`
              : loading
              ? "Đang gửi..."
              : "Gửi yêu cầu khôi phục"}
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes("không hợp lệ") || message.includes("không thể")
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
