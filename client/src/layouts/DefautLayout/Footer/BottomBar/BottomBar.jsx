import { useState } from 'react';
// Icon trước khi bấm
import { HiOutlineHome } from "react-icons/hi2";
import { BiCategory } from "react-icons/bi";
import { PiHandbag } from "react-icons/pi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { HiOutlineUser } from "react-icons/hi2";
// Icon sau khi bấm
import { MdHome } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { PiHandbagFill } from "react-icons/pi";
import { IoIosNotifications } from "react-icons/io";
import { HiMiniUser } from "react-icons/hi2";

import ModalMobile from '../../../../components/Mobile/ModalMobile/ModalMobile';
import MobileSideBar from '../../../../components/Mobile/MobileSidebar/MobileSideBar';
import "./BottomBar.css";
import { Link } from 'react-router-dom';

const BottomBar = () => {
  const [isAddModalOpen, setIsModalMobileOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleCategoryClick = () => {
    setIsModalMobileOpen(!isAddModalOpen); // Toggle modal state
    if (isAddModalOpen) {
      setActiveIndex(0); // Nếu modal đóng, tự động active vào Home (index 0)
    } else {
      setActiveIndex(1); // Nếu modal mở, active vào Category (index 1)
    }
  };

  const buttons = [
    { name: 'Home', defaultIcon: <HiOutlineHome size={24} />, activeIcon: <MdHome size={24} />, path: "/"},
    { name: 'Category', defaultIcon: <BiCategory size={24} />, activeIcon: <BiSolidCategory size={24} />, onClick: handleCategoryClick },
    { name: 'Bag', defaultIcon: <PiHandbag size={24} />, activeIcon: <PiHandbagFill size={24} /> },
    { name: 'Notifications', defaultIcon: <IoMdNotificationsOutline size={24} />, activeIcon: <IoIosNotifications size={24} /> },
    { name: 'User', defaultIcon: <HiOutlineUser size={24} />, activeIcon: <HiMiniUser size={24} />, path: "/account" }
  ];

  return (
    <div className="bottombar-fixed bg-white p-2 z-[999]">
      <ul className="flex justify-between items-center h-[50px] list-none flex-grow flex-shrink-0">
        {buttons.map((button, index) => (
          <Link key={index} to={button.path} className="w-[20%]" >
            <li
              
              className={`block flex flex-col items-center cursor-pointer ${
                activeIndex === index ? 'text-blue-900' : 'text-gray-900'
              }`}
              onClick={() => {
                setActiveIndex(index); // Cập nhật chỉ số khi nút được bấm
                if (button.name === 'Category') {
                  button.onClick(); // Mở modal khi nhấn vào Category
                } else {
                  setActiveIndex(index); // Cập nhật chỉ số active khi bấm các nút khác
                }
              }}
            >
              <a 
                  
              >
                <div className="flex items-center justify-center mb-1">
                  {activeIndex === index ? button.activeIcon : button.defaultIcon}
                </div>
                <span
                  className={`text-sm transition-opacity duration-300 ease-in-out ${
                    activeIndex === index ? 'opacity-100 font-semibold' : 'opacity-0'
                  }`}
                  style={{
                    display: activeIndex === index ? 'block' : 'none' // Chỉ hiển thị tên khi active
                  }}
                >
                  {button.name}
                </span>
              </a>
            </li>
          </Link>
        ))}
      </ul>
      <ModalMobile isOpen={isAddModalOpen} onRequestClose={() => setIsModalMobileOpen(false)}>
        <MobileSideBar />
      </ModalMobile>
    </div>
    
  );
};

export default BottomBar;
