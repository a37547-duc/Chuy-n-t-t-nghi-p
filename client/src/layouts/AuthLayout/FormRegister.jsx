import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../../features/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function FormRegister() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registerLoading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    authType: "local",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const whiteSpaceRegex = /\s/;
  
    if (!formData.username.trim()) {
      newErrors.username = "Tên người dùng không được để trống";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email không được để trống";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không đúng định dạng";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (formData.password.length < 8) {
      newErrors.password = "Mật khẩu phải chứa ít nhất 8 ký tự";
    } else if (!specialCharRegex.test(formData.password)) {
      newErrors.password = "Mật khẩu phải chứa ít nhất một ký tự đặc biệt (!@#$%^&*...)";
    } else if (whiteSpaceRegex.test(formData.password)) {
      newErrors.password = "Mật khẩu không được chứa khoảng trắng";
    }
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Nhập lại mật khẩu không được để trống";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu và xác nhận mật khẩu không khớp";
    }
    return newErrors;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const userData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      authType: formData.authType,
    };

    try {
      await dispatch(registerUser(userData)).unwrap();
      navigate("/login");
    } catch (error) {
      setErrors({ apiError: "Đăng ký thất bại. Vui lòng thử lại!" });
      console.error("Đăng ký thất bại:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full space-y-8 bg-white p-8 rounded-lg shadow-xl transition-transform transform">
        <div>
          <h2 className="text-center text-4xl font-bold text-gray-900">Đăng ký</h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700">
              Tên người dùng
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder="Nhập tên người dùng"
              className={`mt-1 p-3 block w-full border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } focus:border-2 focus:${
                errors.username ? "border-red-500" : "border-indigo-500"
              } focus:outline-none rounded-md`}
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              // type="email"
              autoComplete="email"
              placeholder="Nhập email"
              className={`mt-1 p-3 block w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:border-2 focus:${
                errors.email ? "border-red-500" : "border-indigo-500"
              } focus:outline-none rounded-md`}
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Mật khẩu
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="Nhập mật khẩu"
              className={`mt-1 p-3 block w-full border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:border-2 focus:${
                errors.password ? "border-red-500" : "border-indigo-500"
              } focus:outline-none rounded-md`}
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
              Nhập lại mật khẩu
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              placeholder="Nhập lại mật khẩu"
              className={`mt-1 p-3 block w-full border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } focus:border-2 focus:${
                errors.confirmPassword ? "border-red-500" : "border-indigo-500"
              } focus:outline-none rounded-md`}
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>
          <div>
            <button
              type="submit"
              disabled={registerLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-white ${
                registerLoading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200`}
            >
              {registerLoading ? "Đang xử lý..." : "Đăng ký"}
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <p>
            Đã có tài khoản?{" "}
            <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FormRegister;
