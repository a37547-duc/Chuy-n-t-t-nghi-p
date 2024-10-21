import { useState } from 'react';

const AccountChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // Logic để thay đổi mật khẩu, kiểm tra mật khẩu có khớp hay không
    if (newPassword !== confirmPassword) {
      alert('Mật khẩu mới và xác nhận mật khẩu không khớp');
      return;
    }
    // Thực hiện gọi API hoặc logic xử lý thay đổi mật khẩu
    console.log('Mật khẩu đã được thay đổi thành công');
  };

  return (
    <div className=" p-4">
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
