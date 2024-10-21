import { Link } from 'react-router-dom';

const AccountSideBarMobile = () => {
  const listButton = [
    {name: "Thông tin tài khoản", icon: "fas fa-user", path: "/account/informationMobile"},
    {name: "Số địa chỉ", icon: "fas fa-map-marker", path: ""},
    {name: "Liên kết tài khoản", icon: "fas fa-link", path: ""},
    {name: "Ưu đãi của bạn", icon: "fas fa-gift", path: ""},
    {name: "Lịch sử mua hàng", icon: "fas fa-history", path: "/account/orderMobile"},
    {name: "Đổi mật khẩu", icon: "fas fa-key", path: "/account/changePasswordMobile"},
  ]
  
  return (
    <div className="bg-white mt-4">
        <ul>
          {listButton.map((button, index) => (
            <Link key={index} to={button.path}>
              <li className="p-4 border-b flex justify-between items-center active:bg-gray-200">
                <span className="flex items-center">
                  <i className={`${button.icon} mr-2`}></i> {button.name}
                </span>
                <i className="fas fa-chevron-right"></i>
              </li>
            </Link>
          ))}
        </ul>
      </div>
  );
}

export default AccountSideBarMobile;
