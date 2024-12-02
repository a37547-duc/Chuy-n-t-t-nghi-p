import { useState } from 'react';

const AccountChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const whiteSpaceRegex = /\s/;

    if (!currentPassword.trim()) {
      newErrors.currentPassword = "Mật khẩu hiện tại không được để trống";
    }
    if (!newPassword.trim()) {
      newErrors.newPassword = "Mật khẩu mới không được để trống";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Mật khẩu mới phải chứa ít nhất 8 ký tự";
    } else if (!specialCharRegex.test(newPassword)) {
      newErrors.newPassword = "Mật khẩu mới phải chứa ít nhất một ký tự đặc biệt (!@#$%^&*...)";
    } else if (whiteSpaceRegex.test(newPassword)) {
      newErrors.newPassword = "Mật khẩu mới không được chứa khoảng trắng";
    }
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Nhập lại mật khẩu mới không được để trống";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu mới và xác nhận mật khẩu không khớp";
    }
    return newErrors;
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const formData = {
      currentPassword,
      newPassword,
    };

    // try {
    //   const response = await fetch('/api/change-password', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   if (!response.ok) {
    //     const errorData = await response.json();
    //     alert(`Lỗi: ${errorData.message || 'Không thể thay đổi mật khẩu'}`);
    //     return;
    //   }

    //   alert('Mật khẩu đã được thay đổi thành công');
    //   setCurrentPassword('');
    //   setNewPassword('');
    //   setConfirmPassword('');
    // } catch (error) {
    //   console.error('Lỗi khi gọi API:', error);
    //   alert('Đã xảy ra lỗi, vui lòng thử lại sau.');
    // }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Thay đổi mật khẩu</h2>
      <form onSubmit={handlePasswordChange}>
        <div className="mb-4">
          <label htmlFor="currentPassword" className="block text-sm font-medium mb-1">
            Mật khẩu hiện tại
          </label>
          <input
            type="password"
            id="currentPassword"
            className="w-full px-3 py-2 border rounded-md"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
            Mật khẩu mới
          </label>
          <input
            type="password"
            id="newPassword"
            className="w-full px-3 py-2 border rounded-md"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
            Xác nhận mật khẩu mới
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="w-full px-3 py-2 border rounded-md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Thay đổi mật khẩu
        </button>
      </form>
    </div>
  );
};

export default AccountChangePassword;
