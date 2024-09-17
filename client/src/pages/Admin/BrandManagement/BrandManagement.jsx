import { useState, useEffect  } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const BrandManagement = () => {
  const [page, setPage] = useState(1);
  const [brandsPerPage] = useState(7);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const brands = [
    { id: "1", name: "ASUS", logo: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/Asus.png", description: "Intel Core i7, 16GB RAM, 512GB SSD", NumProduct: "1499" },
    { id: "2", name: "Dell", logo: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/Dell.png", description: "Intel Core i5, 8GB RAM, 256GB SSD", NumProduct: "1299" },
    { id: "3", name: "Acer", logo: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/acer.png", description: "AMD Ryzen 5, 16GB RAM, 1TB HDD", NumProduct: "999" },
    { id: "4", name: "HP", logo: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/HP.png", description: "Intel Core i3, 8GB RAM, 256GB SSD", NumProduct: "799" },
    { id: "5", name: "HP", logo: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/HP.png", description: "Intel Core i3, 8GB RAM, 256GB SSD", NumProduct: "799" },
    { id: "6", name: "HP", logo: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/HP.png", description: "Intel Core i3, 8GB RAM, 256GB SSD", NumProduct: "799" },
    { id: "7", name: "HP", logo: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/HP.png", description: "Intel Core i3, 8GB RAM, 256GB SSD", NumProduct: "799" },
    { id: "8", name: "HP", logo: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/HP.png", description: "Intel Core i3, 8GB RAM, 256GB SSD", NumProduct: "799" },
    { id: "9", name: "HP", logo: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/HP.png", description: "Intel Core i3, 8GB RAM, 256GB SSD", NumProduct: "799" },
    { id: "10", name: "HP", logo: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/HP.png", description: "Intel Core i3, 8GB RAM, 256GB SSD", NumProduct: "799" },
    { id: "11", name: "HP", logo: "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:50/q:30/plain/https://cellphones.com.vn/media/wysiwyg/Icon/brand_logo/HP.png", description: "Intel Core i3, 8GB RAM, 256GB SSD", NumProduct: "799" },
  ];

  const totalBrands = brands.length;
  const totalPages = Math.ceil(totalBrands / brandsPerPage);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const indexOfLastBrand = page * brandsPerPage;
  const indexOfFirstBrand = indexOfLastBrand - brandsPerPage;
  const currentBrands = brands.slice(indexOfFirstBrand, indexOfLastBrand);

  // Cập nhật trạng thái checkbox selectAll khi chuyển trang
  useEffect(() => {
    const allSelected = currentBrands.every((brand) => selectedBrands.includes(brand.id));
    setSelectAll(allSelected);
  }, [page, selectedBrands, currentBrands]);

  // Sử lý chọn hết checkbox
  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
    if (e.target.checked) {
      const allIds = currentBrands.map((brand) => brand.id);
      setSelectedBrands([...selectedBrands, ...allIds.filter(id => !selectedBrands.includes(id))]);
    } else {
      const remainingIds = selectedBrands.filter(id => !currentBrands.some(brand => brand.id === id));
      setSelectedBrands(remainingIds);
    }
  };

  // Sử lý riêng lẻ checkbox
  const handleCheckboxChange = (e, brandId) => {
    if (e.target.checked) {
      setSelectedBrands([...selectedBrands, brandId]); // Thêm brand ID danh sách chọn
    } else {
      setSelectedBrands(selectedBrands.filter((id) => id !== brandId)); // Xóa brand ID khỏi danh sách chọn
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold">All brands</h1>

      {/* Search Bar & Add Button */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center bg-white p-2 shadow-sm rounded-lg w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search for brands"
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

        {/* Add Brand Button */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600">
          <span className="mr-2">+ Add brand</span>
        </button>
      </div>

      {/* Brand Table */}
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
            <th className="p-4">brand name</th>
            <th className="p-4">logo</th>
            <th className="p-4">descriptions</th>
            <th className="p-4">Number of products</th>
            <th className="p-4">actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBrands.map((brand, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 text-gray-700 hover:bg-gray-100"
            >
              <td className="p-4">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-600 transition duration-150 ease-in-out border border-gray-300 rounded"
                  checked={selectedBrands.includes(brand.id)}
                  onChange={(e) => handleCheckboxChange(e, brand.id)}
                />
              </td>
              <td className="p-4 text-sm">{brand.id}</td>
              <td className="p-4 text-sm font-semibold">{brand.name}</td>
              <td className="p-1 text-sm">
                <img src={brand.logo} alt={brand.name} className="h-10 w-20 object-contain" />
              </td>
              <td className="p-4 text-sm">{brand.description}</td>
              <td className="p-4 text-sm">{brand.NumProduct}</td>
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

export default BrandManagement;