import { useState, useEffect  } from "react";
import { FiInbox, FiUsers, FiPackage, FiLock, FiHelpCircle, FiTag, FiGrid, FiBox, FiHome } from "react-icons/fi";
import { Link, useLocation, useNavigate  } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Sidebar = ({ isOpen, toggleSidebar }) => {
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
      className={`bg-white text-gray-800 h-screen fixed z-1 shadow-md transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}
    >
      <div className="flex flex-col h-full overflow-y-auto">
        {/* Sidebar Content */}
        <nav className="mt-4 flex flex-col">
          <ul className="space-y-2">
            <Link to="/admin/dashboard" className="block">
              <li 
                className={`px-4 py-2 flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-400 focus:bg-gray-400
                ${!isOpen ? 'justify-center' : ''} 
                ${isActive('/admin/dashboard') ? 'bg-gray-300' : ''}`}
              >
                <FiHome className="w-5 h-5" />
                <span className={`${isOpen ? '' : 'hidden'} transition-opacity duration-300`}>Dashboard</span>
              </li>
            </Link>
            <Link to="/admin/products" className="block">
              <li 
                className={`px-4 py-2 hover:bg-gray-200 flex items-center space-x-2 active:bg-gray-400 focus:bg-gray-400
                ${!isOpen ? 'justify-center' : ''} 
                ${isActive('/admin/products') ? 'bg-gray-300' : ''}`}
              >
                <FiBox className="w-5 h-5" />
                <span className={`${isOpen ? '' : 'hidden'} transition-opacity duration-300`}>Products</span>
              </li>
            </Link>
            <Link to="/inbox" className="block">
              <li 
                className={`px-4 py-2 hover:bg-gray-200 flex items-center space-x-2 active:bg-gray-400 focus:bg-gray-400
                ${!isOpen ? 'justify-center' : ''} 
                ${isActive('/admin/inbox') ? 'bg-gray-300' : ''}`}
              >
                <FiInbox className="w-5 h-5" />
                <span className={`${isOpen ? '' : 'hidden'} transition-opacity duration-300`}>Inbox</span>
              </li>
            </Link>
            <Link to="/admin/orders" className="block">
              <li 
                className={`px-4 py-2 hover:bg-gray-200 flex items-center space-x-2 active:bg-gray-400 focus:bg-gray-400
                ${!isOpen ? 'justify-center' : ''} 
                ${isActive('/admin/orders') ? 'bg-gray-300' : ''}`}
              >
                <FiPackage className="w-5 h-5" />
                {isOpen && <span>Orders</span>}
              </li>
            </Link>
            <Link to="/admin/users" className="block">
              <li 
                className={`px-4 py-2 hover:bg-gray-200 flex items-center space-x-2 active:bg-gray-400 focus:bg-gray-400
                ${!isOpen ? 'justify-center' : ''} 
                ${isActive('/admin/users') ? 'bg-gray-300' : ''}`}
              >
                <FiUsers className="w-5 h-5" />
                <span className={`${isOpen ? '' : 'hidden'} transition-opacity duration-300`}>Users</span>
              </li>
            </Link>
            {/* Brands Menu with Submenu */}
            <Link to="/admin/brand" className="block">
              <li 
                className={`px-4 py-2 hover:bg-gray-200 flex items-center space-x-2 active:bg-gray-400 focus:bg-gray-400
                ${!isOpen ? 'justify-center' : ''} 
                ${isActive('/admin/brand') ? 'bg-gray-300' : ''}`}
                onClick={toggleBrands}
              >
                  <FiTag className="w-5 h-5" />
                  <span className={`${isOpen ? '' : 'hidden'} transition-opacity duration-300`}>Brands</span>
                  <div className={`${!isOpen ? 'hidden' : 'ml-auto'}`}>
                  </div>
              </li>
            </Link>
            {/* Categories Menu with Submenu */}
            <Link to="/admin/category" className="block">
              <li 
                className={`px-4 py-2 hover:bg-gray-200 flex items-center space-x-2 active:bg-gray-400 focus:bg-gray-400
                ${!isOpen ? 'justify-center' : ''} 
                ${isActive('/admin/category') ? 'bg-gray-300' : ''}`}
                onClick={toggleBrands}
              >
                <FiGrid className="w-5 h-5" />
                <span className={`${isOpen ? '' : 'hidden'} transition-opacity duration-300`}>Category</span>
              </li>
            </Link>
            <div className="flex items-center justify-between px-4 py-2 border-b">
            </div>
            <Link to="/authentication" className="block">
              <li className={`px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 ${!isOpen ? 'justify-center' : ''}`}>
                <FiLock className="w-5 h-5" />
                <span className={`${isOpen ? '' : 'hidden'} transition-opacity duration-300`}>Authentication</span>
              </li>
            </Link>
            <Link to="/help" className="block">
              <li className={`px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 ${!isOpen ? 'justify-center' : ''}`}>
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