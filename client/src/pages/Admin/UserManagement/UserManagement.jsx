import { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const UserManagement = () => {
  const [page, setPage] = useState(1);
  const [usersPerPage] = useState(7);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const users = [
    { id: "1", name: "Nguyễn Văn A", role: "Manage", email: "ABC@gmail.com", register:"11/11/1111", status: "Active" },
    { id: "2", name: "Nguyễn Văn B", role: "Manage", email: "ABC@gmail.com", register:"11/11/1111", status: "InActive" },
    { id: "3", name: "Nguyễn Văn C", role: "Client", email: "ABC@gmail.com", register:"11/11/1111", status: "Active" },
    { id: "4", name: "Nguyễn Văn D", role: "Client", email: "ABC@gmail.com", register:"11/11/1111", status: "Active" },
    { id: "5", name: "Nguyễn Văn E", role: "Manage", email: "ABC@gmail.com", register:"11/11/1111", status: "InActive" },
    { id: "6", name: "Nguyễn Văn F", role: "Client", email: "ABC@gmail.com", register:"11/11/1111", status: "Active" },
    { id: "7", name: "Nguyễn Văn G", role: "Client", email: "ABC@gmail.com", register:"11/11/1111", status: "Active" },
    { id: "8", name: "Nguyễn Văn H", role: "Manage", email: "ABC@gmail.com", register:"11/11/1111", status: "Active" },
    { id: "9", name: "Nguyễn Văn I", role: "Client", email: "ABC@gmail.com", register:"11/11/1111", status: "Active" },
    { id: "10", name: "Nguyễn Văn K", role: "Client", email: "ABC@gmail.com", register:"11/11/1111", status: "InActive" },
    { id: "11", name: "Nguyễn Văn L", role: "Client", email: "ABC@gmail.com", register:"11/11/1111", status: "InActive" },
  ];

  const totalUsers = users.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const indexOfLastUser = page * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Cập nhật trạng thái checkbox selectAll khi chuyển trang
  useEffect(() => {
    const allSelected = currentUsers.every((user) => selectedUsers.includes(user.id));
    setSelectAll(allSelected);
  }, [page, selectedUsers, currentUsers]);

  // Sử lý chọn hết checkbox
  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      const allIds = currentUsers.map((user) => user.id);
      setSelectedUsers([...selectedUsers, ...allIds.filter(id => !selectedUsers.includes(id))]);
    } else {
      const remainingIds = selectedUsers.filter(id => !currentUsers.some(user => user.id === id));
      setSelectedUsers(remainingIds);
    }
  };

  // Sử lý riêng lẻ checkbox
  const handleCheckboxChange = (e, userId) => {
    if (e.target.checked) {
      setSelectedUsers([...selectedUsers, userId]); // Thêm user ID danh sách chọn
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId)); // Xóa user ID khỏi danh sách chọn
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold">All Users</h1>

      {/* Search Bar & Add Button */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center bg-white p-2 shadow-sm rounded-lg w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search for users..."
            className="flex-grow px-4 py-2 border border-gray-200 rounded-md"
          />
          <button className="ml-2 p-2 bg-gray-200 rounded-md">
            <i className="fa fa-search"></i>
          </button>
          <div className="ml-2 flex space-x-2">
            <button className="p-2 bg-gray-200 rounded-md">
              <i className="fa fa-cog"></i>
            </button>
            <button className="p-2 bg-gray-200 rounded-md">
              <i className="fa fa-trash"></i>
            </button>
          </div>
        </div>

        {/* Add Users Button */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600">
          <span className="mr-2">+ Add User</span>
        </button>
      </div>

      {/* User Table */}
      <table className="table-auto w-full mt-6 bg-white shadow-md rounded-lg">
        <thead>
          <tr className="text-left text-xs bg-gray-200 text-gray-500 uppercase">
            <th className="p-4">
              <input 
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
              />
            </th>
            <th className="p-4">id</th>
            <th className="p-4">user name</th>
            <th className="p-4">email</th>
            <th className="p-4">status</th>
            <th className="p-4">Registration date</th>
            <th className="p-4">actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 text-gray-700 hover:bg-gray-100"
            >
              <td className="p-4">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-600 transition duration-150 ease-in-out border border-gray-300 rounded"
                  checked={selectedUsers.includes(user.id)}
                  onChange={(e) => handleCheckboxChange(e, user.id)}
                />
              </td>
              <td className="p-4 text-sm">{user.id}</td>
              <td className="p-4">
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">{user.name}</span>
                  <span className="text-sm text-gray-500">{user.role}</span>
                </div>
              </td>
              <td className="p-4 text-sm">{user.email}</td>
              <td className="p-4 text-sm">{user.status}</td>
              <td className="p-4 text-sm">{user.register}</td>
              <td className="p-4 text-sm">
                <div className="flex space-x-2">
                  <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    <FaEdit className="mr-2" />
                    Edit item
                  </button>
                  <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                    <FaTrashAlt className="mr-2" />
                    Delete item
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChange}
            color="primary"
          />
        </Stack>
      </div>
    </div>
  );
};

export default UserManagement;