import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faBell } from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line react/prop-types
function Header({ toggleSidebar }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-white border-b px-5 py-5 shadow-sm z-50 w-full sticky top-0">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and Menu */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 focus:outline-none" onClick={toggleSidebar}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" /> */}
          <span className="font-bold text-lg">Admin</span>
        </div>

        {/* Icons */}
        <div className="relative flex items-center space-x-4">
          {/* New Icons */}
          <button className="text-gray-500">
            <FontAwesomeIcon icon={faComment} size="ml"  />
          </button>
          <button className="text-gray-500">
            <FontAwesomeIcon icon={faBell} size="ml"  />
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
                  <li>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Logout</a>
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
