import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faBell, faBars } from '@fortawesome/free-solid-svg-icons'; // Import icon faBars

// eslint-disable-next-line react/prop-types
function Header({ toggleSidebar }) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

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
          <a href="/">
            <span className="font-bold text-lg">Admin</span>
          </a>
        </div>

        {/* Icons */}
        <div className="relative flex items-center space-x-4">
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
