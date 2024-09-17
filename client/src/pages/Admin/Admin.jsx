import { useState } from 'react';
import Header from './Header/Header.jsx';
import Sidebar from './SideBar/SideBar.jsx';
import { Outlet } from 'react-router-dom';

function Admin() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-row">
        {/* Sidebar nằm bên trái */}
        <Sidebar isOpen={isSidebarOpen} />
        {/* Nội dung ProductManagement nằm bên phải */}
        <main className={`flex-1 p-4 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
            <Outlet />  
        </main>
      </div>
    </div>
  );
}

export default Admin;
