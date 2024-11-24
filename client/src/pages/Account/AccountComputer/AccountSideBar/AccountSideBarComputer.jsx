import { useEffect } from "react";
import { MdOutlineEventNote, MdOutlineChangeCircle } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
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

  const isActive = (path) => {
    return location.pathname === path || (path === '/account/order' && location.pathname.startsWith('/account/order/'));
  };

  useEffect(() => {
    if (location.pathname === "/account") {
      navigate("/account/information");
    }
  }, [location.pathname, navigate]);

  const firstLetter = useProfile?.data?.username?.charAt(0)?.toUpperCase() || "?";

  return (
    <div>
      <div className='flex'>
      <div
          className="relative flex items-center justify-center w-12 h-12 rounded-full text-white font-bold text-xl"
          style={{ backgroundColor: profileBgColor }}
        >
          {firstLetter}
        </div>
        <div className='ml-2'>
          <h6 className='mb-0 font-normal text-[0.8rem]'>Tài khoản của</h6>
          {loading && <div>Đang tải...</div>}
          {error && <div className="text-red-500">Lỗi: {error}</div>}
          <h5 className='uppercase text-base font-medium leading-5'>{useProfile?.data?.username}</h5>
        </div>
      </div>

      <ul className='text-[14px]'>
        <Link to="/account/information" onDragStart={(e) => e.preventDefault()}>
          <div 
            className={`cursor-pointer flex items-center justify-between py-1 my-2 bg-transparent hover:text-[rgb(20,53,195)] hover:font-bold 
            ${isActive('/account/information') ? 'text-[rgb(20,53,195)] font-bold' : ''}`}
          >
            <FaRegUserCircle />
            <div className='text-ellipsis overflow-hidden mx-[0.6rem] flex-1'>Thông tin tài khoản</div>
          </div>
        </Link>
        <Link to="/account/order" onDragStart={(e) => e.preventDefault()}>
          <div 
            className={`cursor-pointer flex items-center justify-between py-1 my-2 bg-transparent hover:text-[rgb(20,53,195)] hover:font-bold 
            ${isActive('/account/order') ? 'text-[rgb(20,53,195)] font-bold' : ''}`}
          >
            <MdOutlineEventNote />
            <div className='text-ellipsis overflow-hidden mx-[0.6rem] flex-1'>Lịch sử mua hàng</div>
          </div>
        </Link>
        <Link to="/account/notifications" onDragStart={(e) => e.preventDefault()}>
          <div 
            className={`cursor-pointer flex items-center justify-between py-1 my-2 bg-transparent hover:text-[rgb(20,53,195)] hover:font-bold 
            ${isActive('/account/notifications') ? 'text-[rgb(20,53,195)] font-bold' : ''}`}
          >
            <IoMdNotificationsOutline />
            <div className='text-ellipsis overflow-hidden mx-[0.6rem] flex-1'>Thông báo</div>
          </div>
        </Link>
        <Link to="/account/changePassword" onDragStart={(e) => e.preventDefault()}>
          <div 
            className={`cursor-pointer flex items-center justify-between py-1 my-2 bg-transparent hover:text-[rgb(20,53,195)] hover:font-bold 
            ${isActive('/account/changePassword') ? 'text-[rgb(20,53,195)] font-bold' : ''}`}
          >
            <MdOutlineChangeCircle />
            <div className='text-ellipsis overflow-hidden mx-[0.6rem] flex-1'>Đổi mật khẩu</div>
          </div>
        </Link>
        <li className="bg-[rgb(224,224,224)] w-full h-[1px] list-none"></li>
      </ul>
    </div>
  );
};

export default AccountSideBar;