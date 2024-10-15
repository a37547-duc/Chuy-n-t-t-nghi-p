import { useEffect } from "react";
import { MdOutlineEventNote } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AccountSideBar = () => {   
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

    return (
        <div>
            <div className='flex'>
                <div className='max-w-full relative overflow-hidden z-0 rounded-none w-12 content-auto h-12'>
                    <img src='https://www.shutterstock.com/shutterstock/photos/1855064608/display_1500/stock-vector-cute-king-pig-wearing-glasses-cartoon-vector-icon-illustration-animal-icon-concept-isolated-1855064608.jpg'></img>
                </div>
                <div className='ml-2'>
                    <h6 className='mb-0 font-normal text-[0.8rem]'>Tài khoản của</h6>
                    <h5 className='uppercase text-base font-medium leading-5'>thanh nguyen</h5>
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
                        <div className='text-ellipsis overflow-hidden mx-[0.6rem] flex-1'>Quản lý đơn hàng</div>
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
                <li className="bg-[rgb(224,224,224)] w-full h-[1px] list-none"></li>
            </ul>
        </div>
    );
};

export default AccountSideBar;