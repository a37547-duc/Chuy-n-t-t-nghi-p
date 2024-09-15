import React, { useState } from "react";
import { FiInbox, FiUsers, FiPackage, FiFileText, FiLock, FiHelpCircle, FiChevronDown, FiChevronRight, FiTag, FiGrid, FiBox, FiHome } from "react-icons/fi";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  const togglePages = () => {
    setIsPagesOpen(!isPagesOpen);
  };

  const toggleBrands = () => {
    setIsBrandsOpen(!isBrandsOpen);
  };

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const toggleProducts = () => {
    setIsProductsOpen(!isProductsOpen);
  };

  return (
    <div
      className={`bg-white text-gray-800 h-screen fixed z-40 shadow-md transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex flex-col h-full overflow-y-auto">
        {/* Sidebar Content */}
        <nav className="mt-4 flex flex-col">
          <ul className="space-y-2">
            <li className={`px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 ${!isOpen ? 'justify-center' : ''}`}>
              <FiHome className="w-5 h-5" />
              <span className={`${isOpen ? '' : 'hidden'} transition-opacity duration-300`}>Dashboard</span>
            </li>
            <li className={`px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 ${!isOpen ? 'justify-center' : ''}`}>
              <FiBox className="w-5 h-5" />
              <span className={`${isOpen ? '' : 'hidden'} transition-opacity duration-300`}>Products</span>
            </li>
            <li className={`px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 ${!isOpen ? 'justify-center' : ''}`}>
              <FiInbox className="w-5 h-5" />
              <span className={`${isOpen ? '' : 'hidden'} transition-opacity duration-300`}>Inbox</span>
            </li>
            <li className={`px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 ${!isOpen && 'justify-center'}`}>
              <FiPackage className="w-5 h-5" />
              {isOpen && <span>Orders</span>}
            </li>
            <li className={`px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 ${!isOpen ? 'justify-center' : ''}`}>
              <FiUsers className="w-5 h-5" />
              <span className={`${isOpen ? '' : 'hidden'} transition-opacity duration-300`}>Users</span>
            </li>
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
                <li className="px-4 py-2 hover:bg-gray-100">
                  <a href="/categories/category1">Category 1</a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <a href="/categories/category2">Category 2</a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100">
                  <a href="/categories/category3">Category 3</a>
                </li>
              </ul>
            )}
            <div className="flex items-center justify-between px-4 py-2 border-b">
            </div>
            <li className={`px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 ${!isOpen ? 'justify-center' : ''}`}>
              <FiLock className="w-5 h-5" />
              <span className={`${isOpen ? '' : 'hidden'} transition-opacity duration-300`}>Authentication</span>
            </li>
            <li className={`px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 ${!isOpen ? 'justify-center' : ''}`}>
              <FiHelpCircle className="w-5 h-5" />
              <span className={`${isOpen ? '' : 'hidden'} transition-opacity duration-300`}>Help</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
