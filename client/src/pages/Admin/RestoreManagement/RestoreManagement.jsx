const RestoreManagement = () => {
  const restore = [
    {name: "Brands", number: "5"},
    {name: "Products", number: "4"},
    {name: "Categories", number: "3"},
    {name: "Use case", number: "2"},
  ]
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold">All restore</h1>

      <table className="table-auto w-full mt-6 bg-white shadow-md rounded-lg">
        <thead>
          <tr className="text-left text-xs bg-gray-200 text-gray-500 uppercase">
            <th className="p-4">name</th>
            <th className="p-4">number</th>
            <th className="p-4">actions</th>
          </tr>
        </thead>
        <tbody>
          {restore.map((res, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 text-gray-700 hover:bg-gray-100"
            >
              <td className="p-4 text-sm font-semibold">{res.name}</td>
              <td className="p-4 text-sm font-semibold">
                {res.number}</td>
              <td className="p-4 text-sm">
                <div className="flex space-x-2">
                  <button 
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Xem chi tiết
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding Product */}
      {/* <BasicModal isOpen={isAddModalOpen} onRequestClose={handleCloseAddModal}>
        <AddBrand onSave={handleSaveBrand} onClose={handleCloseAddModal} />
      </BasicModal>
      <BasicModal isOpen={isDeleteModalOpen} onRequestClose={handleCloseDeleteModal}>
        <DeleteBrand 
          brandName={selectedBrand ? selectedBrand.name : ""}
          onDelete={handleDeleteBrand}
          onClose={handleCloseDeleteModal}
        />
      </BasicModal>
      <BasicModal isOpen={isUpdateModalOpen} onRequestClose={handleCloseUpdateModal}>
        <UpdateBrand 
          brand={selectedBrand ? selectedBrand.name : ""}
          onUpdate={handleUpdateBrand} 
          onClose={handleCloseUpdateModal} 
        />
      </BasicModal> */}
    </div>
  );
}

export default RestoreManagement;