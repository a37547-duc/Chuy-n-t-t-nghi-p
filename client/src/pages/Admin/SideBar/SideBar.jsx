/* eslint-disable no-unused-vars */
import { useState, useEffect  } from "react";
import { FiInbox, FiUsers, FiPackage, FiLock, FiHelpCircle, FiTag, FiGrid, FiBox, FiHome } from "react-icons/fi";
import { MdOutlineRestoreFromTrash } from "react-icons/md";
import { Link, useLocation, useNavigate  } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Sidebar = ({ isOpen, toggleSidebar, isDarkMode  }) => {
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    if (location.pathname === "/admin") {
      navigate("/admin/dashboard");
    }
  }, [location.pathname, navigate]);

  const toggleBrands = () => {
    setIsBrandsOpen(!isBrandsOpen);
  };

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };
  
  return (
    <div
      className={`${isDarkMode ? 'bg-blue-950' : 'bg-white'} text-gray-800 h-screen fixed z-5 shadow-md transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}
    >
      <div className="flex flex-col h-full overflow-y-auto px-2">
        {/* Sidebar Content */}
        <nav className="mt-4 flex flex-col">
          <ul className="space-y-2">
            <Link to="/admin/dashboard" className="block" onDragStart={(e) => e.preventDefault()}>
              <li 
                className={`rounded-md px-4 py-2 flex items-center space-x-2 
                ${isDarkMode ? 'text-gray-200 hover:bg-blue-700 active:bg-blue-900 focus:bg-blue-900' : 'hover:bg-gray-200 active:bg-gray-400 focus:bg-gray-400'}
                ${!isOpen ? 'justify-center' : ''} 
                ${isActive('/admin/dashboard') ? (isDarkMode ? 'bg-blue-800' : 'bg-gray-300') : ''}`}
              >
                <FiHome className="w-5 h-5" />
                <span className={`${isOpen ? '' : 'hidden'} transition-opacity duration-300 }`}>Dashboard</span>
              </li>
            </Link>
            <Link to="/admin/products" className="block" onDragStart={(e) => e.preventDefault()}>
              <li 
                className={`rounded-md px-4 py-2 flex items-center space-x-2 
                ${isDarkMode ? 'text-gray-200 hover:bg-blue-700 active:bg-blue-900 focus:bg-blue-900' : 'hover:bg-gray-200 active:bg-gray-400 focus:bg-gray-400'}
                ${!isOpen ? 'justify-center' : ''} 
                ${isActive('/admin/products') ? (isDarkMode ? 'bg-blue-800' : 'bg-gray-300') : ''}`}
              >
                <FiBox className="w-5 h-5" />
                <span className={`${isOpen ? '' : 'hidden'} transition-opacity duration-300`}>Products</span>
              </li>
            </Link>
            <Link to="/inbox" className="block" onDragStart={(e) => e.preventDefault()}>
              <li 
                className={`rounded-md px-4 py-2 flex items-center space-x-2 
                ${isDarkMode ? 'text-gray-200 hover:bg-blue-700 active:bg-blue-900 focus:bg-blue-900' : 'hover:bg-gray-200 active:bg-gray-400 focus:bg-gray-400'}
                ${!isOpen ? 'justify-center' : ''} 
                ${isActive('/admin/inbox') ? (isDarkMode ? 'bg-blue-800' : 'bg-gray-300') : ''}`}
              >
                <FiInbox className="w-5 h-5" />
                <span className={`${isOpen ? '' : 'hidden'} transition-opacity duration-300`}>Inbox</span>
              </li>
            </Link>
            <Link to="/admin/orders" className="block" onDragStart={(e) => e.preventDefault()}>
              <li 
                className={`rounded-md px-4 py-2 flex items-center space-x-2
                ${isDarkMode ? 'text-gray-200 hover:bg-blue-700 active:bg-blue-900 focus:bg-blue-900' : 'hover:bg-gray-200 active:bg-gray-400 focus:bg-gray-400'}
                ${!isOpen ? 'justify-center' : ''} 
                ${isActive('/admin/orders') ? (isDarkMode ? 'bg-blue-800' : 'bg-gray-300') : ''}
                `}
              >
                <FiPackage className="w-5 h-5" />
                {isOpen && <span>Orders</span>}
              </li>
            </Link>
            <Link to="/admin/users" className="block" onDragStart={(e) => e.preventDefault()}>
              <li 
                className={`rounded-md px-4 py-2 flex items-center space-x-2
                ${isDarkMode ? 'text-gray-200 hover:bg-blue-700 active:bg-blue-900 focus:bg-blue-900' : 'hover:bg-gray-200 active:bg-gray-400 focus:bg-gray-400'}
                ${!isOpen ? 'justify-center' : ''} 
                ${isActive('/admin/users') ? (isDarkMode ? 'bg-blue-800' : 'bg-gray-300') : ''}`}
              >
                <FiUsers className="w-5 h-5" />
                <span className={`${isOpen ? '' : 'hidden'} transition-opacity duration-300`}>Users</span>
              </li>
            </Link>
            <Link to="/admin/brand" className="block" onDragStart={(e) => e.preventDefault()}>
              <li 
                className={`rounded-md px-4 py-2 flex items-center space-x-2
                ${isDarkMode ? 'text-gray-200 hover:bg-blue-700 active:bg-blue-900 focus:bg-blue-900' : 'hover:bg-gray-200 active:bg-gray-400 focus:bg-gray-400'}
                ${!isOpen ? 'justify-center' : ''} 
                ${isActive('/admin/brand') ? (isDarkMode ? 'bg-blue-800' : 'bg-gray-300') : ''}`}
                onClick={toggleBrands}
              >
                  <FiTag className="w-5 h-5" />
                  <span className={`${isOpen ? '' : 'hidden'} transition-opacity duration-300`}>Brands</span>
                  <div className={`${!isOpen ? 'hidden' : 'ml-auto'}`}>
                  </div>
              </li>
            </Link>
            <Link to="/admin/category" className="block" onDragStart={(e) => e.preventDefault()}>
              <li 
                className={`rounded-md px-4 py-2 flex items-center space-x-2
                ${isDarkMode ? 'text-gray-200 hover:bg-blue-700 active:bg-blue-900 focus:bg-blue-900' : 'hover:bg-gray-200 active:bg-gray-400 focus:bg-gray-400'}
                ${!isOpen ? 'justify-center' : ''} 
                ${isActive('/admin/category') ? (isDarkMode ? 'bg-blue-800' : 'bg-gray-300') : ''}`}
                onClick={toggleBrands}
              >
                <FiGrid className="w-5 h-5" />
                <span className={`${isOpen ? '' : 'hidden'} transition-opacity duration-300`}>Category</span>
              </li>
            </Link>
            <Link to="/admin/restore" className="block" onDragStart={(e) => e.preventDefault()}>
              <li 
                className={`rounded-md px-4 py-2 flex items-center space-x-2
                ${isDarkMode ? 'text-gray-200 hover:bg-blue-700 active:bg-blue-900 focus:bg-blue-900' : 'hover:bg-gray-200 active:bg-gray-400 focus:bg-gray-400'}
                ${!isOpen ? 'justify-center' : ''} 
                ${isActive('/admin/restore') ? (isDarkMode ? 'bg-blue-800' : 'bg-gray-300') : ''}`}
              >
                <MdOutlineRestoreFromTrash className="w-5 h-5" />
                {isOpen && <span className="transition-opacity duration-300">Restore</span>}
              </li>
            </Link>
            <div className="flex items-center justify-between px-4 py-2 border-b"></div>
            <Link to="/authentication" className="block">
              <li 
                className={`rounded-md px-4 py-2 flex items-center space-x-2 
                ${isDarkMode ? 'text-gray-200 hover:bg-blue-700 active:bg-blue-900 focus:bg-blue-900' : 'hover:bg-gray-200 active:bg-gray-400 focus:bg-gray-400'} 
                ${!isOpen ? 'justify-center' : ''}`}>
                <FiLock className="w-5 h-5" />
                <span className={`${isOpen ? '' : 'hidden'} transition-opacity duration-300`}>Authentication</span>
              </li>
            </Link>
            <Link to="/help" className="block">
              <li 
                className={`rounded-md px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 
                ${isDarkMode ? 'text-gray-200 hover:bg-blue-700 active:bg-blue-900 focus:bg-blue-900' : 'hover:bg-gray-200 active:bg-gray-400 focus:bg-gray-400'}
                ${!isOpen ? 'justify-center' : ''}`}>
                <FiHelpCircle className="w-5 h-5" />
                <span className={`${isOpen ? '' : 'hidden'} transition-opacity duration-300`}>Help</span>
              </li>
            </Link>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;