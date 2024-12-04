import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faBell, faBars } from '@fortawesome/free-solid-svg-icons';
import { GiEvilMoon } from "react-icons/gi";
import { BsEmojiSunglasses } from "react-icons/bs";
import { logoutUser} from "../../../features/Auth/authSlice"
import { useDispatch, useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
function Header({ toggleSidebar, toggleDarkMode }) {
  const [isChecked, setIsChecked] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleToggle = () => {
    setIsChecked(!isChecked);
    toggleDarkMode();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-white border-b px-5 py-5 shadow-sm w-full sticky top-0">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            className="text-gray-500" 
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
          </button>
          <a href="/admin">
            <span className="font-bold text-lg">Admin</span>
          </a>
        </div>

        {/* Icons */}
        <div className="relative flex items-center space-x-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isChecked}
              onChange={handleToggle}
            />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-800 transition-all duration-300"></div>
            <div className="absolute left-1 top-1 w-4 h-4 rounded-full peer-checked:translate-x-5 transition-transform duration-300 flex items-center justify-center">
              {isChecked ? (
                <GiEvilMoon className="text-white" />
              ) : (
                <BsEmojiSunglasses className="" />
              )}
            </div>
          </label>
          <button className="text-gray-500">
            <FontAwesomeIcon icon={faComment} size="sm" />
          </button>
          <button className="text-gray-500">
            <FontAwesomeIcon icon={faBell} size="sm" />
          </button>

          <div className="relative">
            <img
              className="h-8 w-8 rounded-full cursor-pointer"
              src="https://randomuser.me/api/portraits/men/1.jpg"
              alt="Profile"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg z-50">
                <ul className="py-1">
                  {/* <li>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</a>
                  </li> */}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
