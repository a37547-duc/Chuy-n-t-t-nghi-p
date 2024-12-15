import { useState } from 'react';
import Header from './Header/Header.jsx';
import Sidebar from './SideBar/SideBar.jsx';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleSidebar={toggleSidebar} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
      <div className="flex flex-row">
        <Sidebar isOpen={isSidebarOpen} isDarkMode={isDarkMode}/>
        <main className={`flex-1 ${isDarkMode ? 'bg-blue-950' : 'bg-gray-200'} p-4 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
            <Outlet />  
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;