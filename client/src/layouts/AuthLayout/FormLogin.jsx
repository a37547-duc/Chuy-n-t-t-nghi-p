import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';

function FormLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email không đúng định dạng";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Mật khẩu không được để trống";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      console.log('Dữ liệu hợp lệ, đăng nhập:', formData);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Đăng nhập</h2>
          <p className="text-gray-600">Chào mừng trở lại! Hãy đăng nhập để tiếp tục</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <div className="flex items-center mt-1">
              <FaEnvelope className="absolute text-gray-400 ml-3" />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Nhập email của bạn"
                required
                className="pl-10 p-3 block w-full border border-gray-300 focus:border-2 focus:border-indigo-500 focus:outline-none rounded-md transition"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="relative">
            <div className="flex justify-between items-center">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
              <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-500">
                Quên mật khẩu?
              </Link>
            </div>
            <div className="flex items-center mt-1">
              <FaLock className="absolute text-gray-400 ml-3" />
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Nhập mật khẩu"
                required
                className="pl-10 p-3 block w-full border border-gray-300 focus:border-2 focus:border-indigo-500 focus:outline-none rounded-md transition"
              />
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 text-white bg-indigo-600 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg transition transform hover:scale-105"
            >
              Đăng nhập
            </button>
          </div>
        </form>

        <div className="text-center text-sm">
          <p className="text-gray-600">
            Chưa có tài khoản?{' '}
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FormLogin;
