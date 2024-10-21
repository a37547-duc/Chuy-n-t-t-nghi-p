import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import AccountSideBarMobile from './AccountSideBarMobile/AccountSideBarMobile';
import HeadUser from './HeadUser/HeadUser';
import { Outlet } from 'react-router-dom';

const AccountMobile = () => {
  const location = useLocation();

  // Kiểm tra nếu đường dẫn hiện tại là các route con thì ẩn HeadUser và AccountSideBarMobile
  const hideSidebarAndHeader = location.pathname.includes("/informationMobile") || 
                               location.pathname.includes("/orderMobile") || 
                               location.pathname.includes("/changePasswordMobile");

  // Cuộn lên đầu trang mỗi khi điều hướng
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4">
      {/* Chỉ hiển thị HeadUser và AccountSideBarMobile khi không ở các route con */}
      {!hideSidebarAndHeader && (
        <>
          <HeadUser />
          <AccountSideBarMobile />
        </>
      )}

      {/* Outlet to render the content of sub-routes */}
      <Outlet />
    </div>
  );
}

export default AccountMobile;
