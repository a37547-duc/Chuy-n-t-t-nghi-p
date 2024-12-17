import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTiers } from "../../../features/tier/tiersSlice";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import BasicModal from "../../../components/Modal/BasicModal";

import AddTiers from "../../../components/admin/Tiers/AddTiers";
import UpdateTiers from "../../../components/admin/Tiers/UpdateTiers";
import DeleteTiers from "../../../components/admin/Tiers/DeleteTiers";
import DetailTiers from "../../../components/admin/Tiers/DetailTiers";

const TiersManagement = () => {
  const dispatch = useDispatch();
  const { tiers, loading, error } = useSelector((state) => state.tier);

  //Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTierDetailModalOpen, setIsTierDetailModalOpen] = useState(false);
  const [tierToUpdate, setTierToUpdate] = useState(null);
  const [tierToDelete, setTierToDelete] = useState(null);
  const [tierToDetail, setTierToDetail] = useState(null);

  useEffect(() => {
    dispatch(getAllTiers());
  }, [dispatch]);

  const handleOpenAddModal = () => setIsAddModalOpen(true);
  const handleCloseAddModal = () => setIsAddModalOpen(false);

  const handleOpenDeleteModal = (tier) => {
    setTierToDelete(tier);
    setIsDeleteModalOpen(true);
  };
  
  const handleCloseDeleteModal = () => {
    setTierToDelete(null);
    setIsDeleteModalOpen(false);
  };;

  const handleOpenUpdateModal = (tier) => {
    setTierToUpdate(tier);
    setIsUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setTierToUpdate(null);
    setIsUpdateModalOpen(false);
  };

  const handleOpenTierDetailModal = (tier) => {
    setTierToDetail(tier)
    setIsTierDetailModalOpen(true);
  };

  const handleCloseUserDetailModal = () => {
    setIsTierDetailModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold">Danh sách hạng thành viên</h1>

      {/* Search Bar & Add Button */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center bg-white p-2 shadow-sm rounded-lg w-full md:w-1/3">
          <input
            type="text"
            placeholder="Tìm kiếm hạng..."
            // value={searchTerm}
            // onChange={handleSearchChange}
            className="flex-grow px-4 py-2 border border-gray-200 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md"
          />
          <button className="ml-2 p-2 bg-gray-200 rounded-md">
            <i className="fa fa-search"></i>
          </button>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600"
        >
          <span className="mr-2">+ Thêm hạng</span>
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center mt-6 min-h-[200px]">
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
          <p>Lỗi: {error.message || error}</p>
        </div>
      )}

      {!loading && !error && (
        <table className="table-auto w-full mt-6 bg-white shadow-md rounded-lg">
          <thead>
            <tr className="text-left text-xs bg-gray-200 text-gray-500 uppercase">
              <th className="p-4">Tên hạng</th>
              <th className="p-4">Giá trị giảm giá</th>
              <th className="p-4">Chi tiêu tối thiểu</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {tiers.map((tier) => (
              <tr
                key={tier._id}
                className="border-b border-gray-200 text-gray-700 hover:bg-gray-100"
              >
                <td className="p-4 text-sm font-semibold">{tier.name}</td>
                <td className="p-4 text-sm">{tier.discountValue}%</td>
                <td className="p-4 text-sm">{tier.minSpent.toLocaleString()} VNĐ</td>
                <td className="p-4 text-sm">
                  <div className="flex space-x-2 justify-end">
                    <button 
                      className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      onClick={() => handleOpenUpdateModal(tier)}
                    >
                      <FaEdit className="mr-2" />
                      Edit
                    </button>
                    <button 
                      className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => handleOpenDeleteModal(tier)}
                    >
                      <FaTrashAlt className="mr-2" />
                      Delete
                    </button>
                    <button 
                      className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      onClick={() => handleOpenTierDetailModal(tier)}
                    >
                      <FaEye className="mr-2" />
                      View Details
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      <BasicModal isOpen={isAddModalOpen} onRequestClose={handleCloseAddModal}>
        <AddTiers onClose={handleCloseAddModal} />
      </BasicModal>

      <BasicModal isOpen={isUpdateModalOpen} onRequestClose={handleCloseUpdateModal}>
        {tierToUpdate ? (
          <UpdateTiers
            editTier={tierToUpdate}
            onClose={handleCloseUpdateModal}
          />
        ) : (
          <p>Lỗi Edit rồi kiểm tra đê...</p>
        )}
      </BasicModal>

      <BasicModal isOpen={isDeleteModalOpen} onRequestClose={handleCloseDeleteModal}>
        {tierToDelete ? (
          <DeleteTiers
            tierId={tierToDelete._id}
            tierName={tierToDelete.name}
            onClose={handleCloseDeleteModal}
          />
        ) : (
          <p>Lỗi Delete rồi kiểm tra đê...</p>
        )}
      </BasicModal>

      <BasicModal isOpen={isTierDetailModalOpen} onRequestClose={handleCloseUserDetailModal}>
      {tierToDetail ? (
        <DetailTiers
          data={tierToDetail}
          onClose={handleCloseUserDetailModal} />
          ) : (
          <p>Lỗi Detail rồi kiểm tra đê...</p>
        )}
      </BasicModal>
    </div>
  );
};

export default TiersManagement;
