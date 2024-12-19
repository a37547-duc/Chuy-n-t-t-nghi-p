import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../../../../features/user/userSlice';
import 'react-toastify/dist/ReactToastify.css';

const AccountChangePassword = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
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
    } else if (newPassword.length > 20) {
      newErrors.newPassword = "Mật khẩu mới chỉ được chứa nhiều nhất 20 ký tự";
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

    dispatch(changePassword(formData))
    .then((result) => {
      if (result) {
        if (!result.error) {
          toast.success('Mật khẩu đã được thay đổi thành công');
        } else if (result.error) {
          console.log(result)
          toast.error(result.payload.error);
        }
      } else {
        toast.error('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
      }
    })
    .catch((error) => {
      console.log('Lỗi kết nối. Vui lòng thử lại.', error)
      toast.error('Lỗi kết nối. Vui lòng thử lại.');
    });
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
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          disabled={loading}
        >
          {loading ? 'Đang thay đổi...' : 'Thay đổi mật khẩu'}
        </button>
      </form>
    </div>
  );
};

export default AccountChangePassword;
