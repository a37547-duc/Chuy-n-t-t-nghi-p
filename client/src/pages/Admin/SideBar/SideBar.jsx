import React, { useState } from "react";
import { FiInbox, FiUsers, FiPackage, FiFileText, FiLock, FiHelpCircle, FiChevronDown, FiChevronRight, FiTag, FiGrid, FiBox, FiHome } from "react-icons/fi";
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const toggleBrands = () => {
    setIsBrandsOpen(!isBrandsOpen);
  };

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  return (
    <div
      className={`bg-white text-gray-800 h-screen fixed z-40 shadow-md transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}
    >
      <div className="flex flex-col h-full overflow-y-auto">
        {/* Sidebar Content */}
        <nav className="mt-4 flex flex-col">
          <ul className="space-y-2">
            <Link to="/admin/dashboard" className="block">
              <li className={`px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 ${!isOpen ? 'justify-center' : ''}`}>
                <FiHome className="w-5 h-5" />
                <span className={`${isOpen ? '' : 'hidden'} transition-opacity duration-300`}>Dashboard</span>
              </li>
            </Link>
            <Link to="/admin/products" className="block">
              <li className={`px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 ${!isOpen ? 'justify-center' : ''}`}>
                <FiBox className="w-5 h-5" />
                <span className={`${isOpen ? '' : 'hidden'} transition-opacity duration-300`}>Products</span>
              </li>
            </Link>
            <Link to="/inbox" className="block">
              <li className={`px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 ${!isOpen ? 'justify-center' : ''}`}>
                <FiInbox className="w-5 h-5" />
                <span className={`${isOpen ? '' : 'hidden'} transition-opacity duration-300`}>Inbox</span>
              </li>
            </Link>
            <Link to="/admin/orders" className="block">
              <li className={`px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 ${!isOpen ? 'justify-center' : ''}`}>
                <FiPackage className="w-5 h-5" />
                {isOpen && <span>Orders</span>}
              </li>
            </Link>
            <Link to="/admin/users" className="block">
              <li className={`px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 ${!isOpen ? 'justify-center' : ''}`}>
                <FiUsers className="w-5 h-5" />
                <span className={`${isOpen ? '' : 'hidden'} transition-opacity duration-300`}>Users</span>
              </li>
            </Link>
            {/* Brands Menu with Submenu */}
            <li className={`px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer ${!isOpen ? 'justify-center' : ''}`} onClick={toggleBrands}>
              <FiTag className="w-5 h-5" />
              <span className={`${isOpen ? '' : 'hidden'} transition-opacity duration-300`}>Brands</span>
              <div className={`${!isOpen ? 'hidden' : 'ml-auto'}`}>
              </div>
            </li>
            {/* Categories Menu with Submenu */}
            <li className={`px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 cursor-pointer ${!isOpen ? 'justify-center' : ''}`} onClick={toggleCategories}>
              <FiGrid className="w-5 h-5" />
              <span className={`${isOpen ? '' : 'hidden'} transition-opacity duration-300`}>Categories</span>
              <div className={`${!isOpen ? 'hidden' : 'ml-auto'}`}>
                {isCategoriesOpen ? <FiChevronDown /> : <FiChevronRight />}
              </div>
            </li>
            {isCategoriesOpen && isOpen && (
              <ul className="ml-8 space-y-1">
                <Link to="/categories/category1" className="block">
                  <li className="px-4 py-2 hover:bg-gray-100">Category 1</li>
                </Link>
                <Link to="/categories/category2" className="block">
                  <li className="px-4 py-2 hover:bg-gray-100">Category 2</li>
                </Link>
                <Link to="/categories/category3" className="block">
                  <li className="px-4 py-2 hover:bg-gray-100">Category 3</li>
                </Link>
              </ul>
            )}
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
