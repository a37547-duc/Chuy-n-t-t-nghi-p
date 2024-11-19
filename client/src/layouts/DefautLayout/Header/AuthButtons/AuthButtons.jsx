import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faAddressCard, faRectangleList} from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../../features/Auth/authSlice";

export default function AuthButtons() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="flex items-center lg:order-2 relative group">
      {user ? (
        <>
          <FontAwesomeIcon
            icon={faUser}
            className="h-5 w-5 text-gray-800 dark:text-white mr-4 cursor-pointer"
          />
          <div className="flex flex-col cursor-pointer text-xs mr-2">
            <div>Hello,</div>
            <div>{user.username}</div>
          </div>

          {/* Dropdown container */}
          <div
            className="absolute top-10 right-0 mt-2 bg-white border rounded shadow-lg w-44 py-2 opacity-0 group-hover:opacity-100 group-hover:block transition-opacity duration-200"
            aria-hidden={!user}
            role="menu"
          >
            <Link to="/account/information" aria-label="Go to profile">
              <div className="px-4 py-2 text-xs text-gray-700 hover:bg-gray-200" role="menuitem">
              <FontAwesomeIcon icon={faAddressCard} className="mr-2" />
                Thông tin tài khoản
              </div>
            </Link>
            <Link to="/account/order/emptyDelivery" aria-label="Go to orders">
              <div className="px-4 py-2 text-xs text-gray-700 hover:bg-gray-200 flex items-center" role="menuitem">
              <FontAwesomeIcon icon={faRectangleList} className="mr-2" />
                Quản lý đơn hàng
              </div>
            </Link>
            <div className="flex justify-center mt-2">
              <button
                className="w-36 py-1 text-xs text-white bg-red-500 hover:bg-red-600 rounded focus:outline-none"
                onClick={handleLogout}
                role="menuitem"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <FontAwesomeIcon
            icon={faUser}
            className="h-5 w-5 text-gray-800 dark:text-white mr-4"
          />
          <div className="flex flex-col text-xs mr-2">
            <Link to="/login">
              <div className="cursor-pointer hover:underline hover:text-red-500">
                Đăng nhập
              </div>
            </Link>
            <Link to="/signup">
              <div className="cursor-pointer hover:underline hover:text-red-500">
                Đăng ký
              </div>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}