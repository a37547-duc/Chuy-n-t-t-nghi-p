import { useState, useEffect, useMemo } from "react";
import { FaEye } from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import ReactPaginate from "react-paginate";
import BasicModal from "../../../components/Modal/BasicModal";
import UserDetail from "../../../components/admin/Users/UserDetail"
import { getAllUsers } from "../../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const UserManagement = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);

  const [page, setPage] = useState(0);
  const [usersPerPage] = useState(7);
  const [searchUser, setSearchUser] = useState("");
  const [isUserDetailModalOpen, setIsUserDetailModalOpen] = useState(false);
  const [initUser, setInitUser] = useState();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.email.toLowerCase().includes(searchUser.toLowerCase())
    );
  }, [users, searchUser]);

  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const handlePageClick = (data) => {
    setPage(data.selected);
  };

  const indexOfLastUser = (page + 1) * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleOpenUserDetailModal = () => {
    setIsUserDetailModalOpen(true);
  };

  const handleCloseUserDetailModal = () => {
    setIsUserDetailModalOpen(false);
  };
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold">Danh sách người dùng</h1>

      {/* Search Bar & Add Button */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center bg-white p-2 shadow-sm rounded-lg w-full md:w-1/3">
          <input
            type="text"
            placeholder="Tìm kiếm user bằng email"
            className="flex-grow px-4 py-2 border border-gray-200 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />
          <button className="ml-2 p-2 bg-gray-200 rounded-md">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex justify-center items-center mt-6">
          <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <span className="ml-2 text-blue-500">Loading...</span>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          <p>Error: {error.message || error}</p>
        </div>
      )}
      {/* User Table */}
      {!loading && !error && (
        <table className="table-auto w-full mt-6 bg-white shadow-md rounded-lg">
          <thead>
            <tr className="text-left text-xs bg-gray-200 text-gray-500 uppercase">
              <th className="p-4">id</th>
              <th className="p-4">Tên người dùng</th>
              <th className="p-4">email</th>
              <th className="p-4">Số điện thoại</th>
              <th className="p-4">Ngày đăng ký</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((user, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 text-gray-700 hover:bg-gray-100"
              >
                <td className="p-4 text-sm">{user._id}</td>
                <td className="p-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">{user.username}</span>
                  </div>
                </td>
                <td className="p-4 text-sm">{user.email}</td>
                <td className="p-4 text-sm">{user.phoneNumber}</td>
                <td className="p-4 text-sm">{user.createdAt}</td>
                <td className="p-4 text-sm">
                  <div className="flex space-x-2">
                    <button 
                      className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      onClick={() => {
                        handleOpenUserDetailModal();
                        setInitUser(user);
                      }}
                    >
                      <FaEye className="mr-2" />
                      View Detail
                    </button>
                  </div>
                </td>
              </tr>
            ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-red-500 py-4">Người dùng không tồn tại</td>
              </tr>
            )}
          </tbody>
  
          {/* Pagination & Count within table footer */}
          <tfoot>
            <tr>
              <td colSpan="7" className="p-4">
                <div className="flex justify-between items-center">
                  {/* Left: Count display */}
                  <div className="text-sm text-gray-500">
                    Hiển thị {indexOfFirstUser + 1} đến {Math.min(indexOfLastUser, totalUsers)} / {totalUsers} người dùng
                  </div>
  
                  {/* Right: Pagination */}
                  <div className="flex justify-end">
                    <ReactPaginate
                      previousLabel={<FontAwesomeIcon icon={faChevronLeft} size="xs" />}
                      nextLabel={<FontAwesomeIcon icon={faChevronRight} size="xs" />}
                      pageCount={totalPages}
                      onPageChange={handlePageClick}
                      containerClassName={"flex items-center space-x-2"}
                      previousLinkClassName={"w-8 h-8 flex items-center justify-center bg-white border rounded shadow hover:bg-gray-100"}
                      nextLinkClassName={"w-8 h-8 flex items-center justify-center bg-white border rounded shadow hover:bg-gray-100"}
                      disabledClassName={"text-blue-500"}
                      activeLinkClassName={"bg-blue-500 text-white rounded w-8 h-8 flex items-center justify-center hover:bg-blue-600"}
                      pageClassName={"w-8 h-8 flex items-center justify-center bg-white border rounded shadow hover:bg-gray-100"}
                      pageLinkClassName={"w-full h-full flex items-center justify-center focus:outline-none"}
                      breakLabel={"..."}
                      breakClassName={"w-8 h-8 flex items-center justify-center text-gray-500"}
                    />
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      )}

      {/* Modal for User */}
      <BasicModal isOpen={isUserDetailModalOpen} onRequestClose={handleCloseUserDetailModal}>
        <UserDetail
          data={initUser}
          onClose={handleCloseUserDetailModal} />
      </BasicModal>
    </div>
  );
};

export default UserManagement;