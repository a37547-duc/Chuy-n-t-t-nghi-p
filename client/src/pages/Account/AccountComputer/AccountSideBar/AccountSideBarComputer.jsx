import { useEffect } from "react";
import { MdOutlineEventNote, MdOutlineChangeCircle } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { TfiGift } from "react-icons/tfi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserProfile } from "../../../../features/Auth/authProfileSlice";
import { useDispatch, useSelector } from "react-redux";

const AccountSideBar = () => {
  const dispatch = useDispatch();
  const { useProfile, loading, error } = useSelector((state) => state.profile);
  const profileBgColor = useSelector((state) => state.auth.profileBgColor);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  const location = useLocation();
  const navigate = useNavigate();

  // Nếu ở đường dẫn "/account" thì điều hướng đến "/account/information"
  useEffect(() => {
    if (location.pathname === "/account") {
      navigate("/account/information");
    }
  }, [location.pathname, navigate]);

  // Lấy chữ cái đầu tiên trong username
  const firstLetter = useProfile?.data?.username?.charAt(0)?.toUpperCase() || "?";

  // Mảng các mục sidebar
  const sidebarItems = [
    { path: "/account/information", label: "Thông tin tài khoản", icon: FaRegUserCircle },
    { path: "/account/order", label: "Lịch sử mua hàng", icon: MdOutlineEventNote },
    { path: "/account/discounts", label: "Ưu đãi của bạn", icon: TfiGift },
    { path: "/account/changePassword", label: "Đổi mật khẩu", icon: MdOutlineChangeCircle },
  ];

  return (
    <div>
      {/* Hiển thị thông tin tài khoản */}
      <div className="flex">
        <div
          className="relative flex items-center justify-center w-12 h-12 rounded-full text-white font-bold text-xl"
          style={{ backgroundColor: profileBgColor }}
        >
          {firstLetter}
        </div>
        <div className="ml-2">
          <h6 className="mb-0 font-normal text-[0.8rem]">Tài khoản của</h6>
          {loading && <div>Đang tải...</div>}
          {error && <div className="text-red-500">Lỗi: {error}</div>}
          <h5 className="uppercase text-base font-medium leading-5">{useProfile?.data?.username}</h5>
        </div>
      </div>

      {/* Danh sách các mục sidebar */}
      <ul className="text-[14px]">
        {sidebarItems.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname === path;

          return (
            <li key={path} className="list-none">
              <Link to={path} onDragStart={(e) => e.preventDefault()}>
                <div
                  className={` cursor-pointer flex items-center justify-between py-1 my-2 bg-transparent hover:text-[rgb(20,53,195)] hover:font-bold ${
                    isActive ? "text-[rgb(20,53,195)] font-bold" : ""}`
                  }
                >
                  <Icon />
                  <div className="text-ellipsis overflow-hidden mx-[0.6rem] flex-1">{label}</div>
                </div>
              </Link>
            </li>
          );
        })}
        <li className="bg-[rgb(224,224,224)] w-full h-[1px] list-none"></li>
      </ul>
    </div>
  );
};

export default AccountSideBar;
