import { useEffect  } from "react";
import { FiUsers, FiPackage, FiTag, FiGrid, FiBox, FiHome } from "react-icons/fi";
import { MdOutlineRestoreFromTrash } from "react-icons/md";
import { Link, useLocation, useNavigate  } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Sidebar = ({ isOpen, toggleSidebar, isDarkMode  }) => {
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

  const sidebarItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: FiHome },
    { path: "/admin/products", label: "Products", icon: FiBox },
    { path: "/admin/orders", label: "Orders", icon: FiPackage },
    { path: "/admin/users", label: "Users", icon: FiUsers },
    { path: "/admin/brand", label: "Brands", icon: FiTag },
    { path: "/admin/category", label: "Category", icon: FiGrid },
    { path: "/admin/restore", label: "Restore", icon: MdOutlineRestoreFromTrash },
  ];
  
  return (
    <div
      className={`${isDarkMode ? 'bg-blue-950' : 'bg-white'} text-gray-800 h-screen fixed z-5 shadow-md transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}
    >
      <div className="flex flex-col h-full overflow-y-auto px-2">
        {/* Sidebar Content */}
        <nav className="mt-4 flex flex-col">
          <ul className="space-y-2">
          {sidebarItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className="block"
                onDragStart={(e) => e.preventDefault()}
              >
                <li
                  className={`rounded-md px-4 py-2 flex items-center space-x-2 transition-all duration-300 
                  ${isDarkMode ? "text-gray-200 hover:bg-blue-700 active:bg-blue-900 focus:bg-blue-900" : "hover:bg-gray-200 active:bg-gray-400 focus:bg-gray-400"} 
                  ${!isOpen ? "justify-center" : ""} 
                  ${isActive(path) ? (isDarkMode ? "bg-blue-800" : "bg-gray-300") : ""}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className={`transition-opacity duration-300 ${isOpen ? "opacity-100" : "hidden opacity-0"}`}>
                    {label}
                  </span>
                </li>
              </Link>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;