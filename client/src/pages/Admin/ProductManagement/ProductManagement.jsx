import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ProductManagement = () => {
  const [page, setPage] = useState(1);
  const [productsPerPage] = useState(7);

  const products = [
    { id: "#194556", name: "ASUS ROG Strix G15", category: "Laptop Gaming", technology: "Intel Core i7, 16GB RAM, 512GB SSD", price: "$1499" },
    { id: "#623232", name: "Dell XPS 13", category: "Ultrabook", technology: "Intel Core i5, 8GB RAM, 256GB SSD", price: "$1299" },
    { id: "#746734", name: "Acer Nitro 5", category: "Laptop Gaming", technology: "AMD Ryzen 5, 16GB RAM, 1TB HDD", price: "$999" },
    { id: "#239874", name: "HP Pavilion x360", category: "Laptop 2-in-1", technology: "Intel Core i3, 8GB RAM, 256GB SSD", price: "$799" },
    { id: "#239874", name: "HP Pavilion x360", category: "Laptop 2-in-1", technology: "Intel Core i3, 8GB RAM, 256GB SSD", price: "$799" },
    { id: "#239874", name: "HP Pavilion x360", category: "Laptop 2-in-1", technology: "Intel Core i3, 8GB RAM, 256GB SSD", price: "$799" },
    { id: "#239874", name: "HP Pavilion x360", category: "Laptop 2-in-1", technology: "Intel Core i3, 8GB RAM, 256GB SSD", price: "$799" },
    { id: "#239874", name: "HP Pavilion x360", category: "Laptop 2-in-1", technology: "Intel Core i3, 8GB RAM, 256GB SSD", price: "$799" },
    { id: "#239874", name: "HP Pavilion x360", category: "Laptop 2-in-1", technology: "Intel Core i3, 8GB RAM, 256GB SSD", price: "$799" },
    { id: "#239874", name: "HP Pavilion x360", category: "Laptop 2-in-1", technology: "Intel Core i3, 8GB RAM, 256GB SSD", price: "$799" },
    { id: "#239874", name: "HP Pavilion x360", category: "Laptop 2-in-1", technology: "Intel Core i3, 8GB RAM, 256GB SSD", price: "$799" },
  ];

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold">All products</h1>

      {/* Search Bar & Add Button */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center bg-white p-2 shadow-sm rounded-lg w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search for products"
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

        {/* Add Product Button */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600">
          <span className="mr-2">+ Add product</span>
        </button>
      </div>

      {/* Product Table */}
      <table className="table-auto w-full mt-6 bg-white shadow-md rounded-lg">
        <thead>
          <tr className="text-left text-xs bg-gray-200 text-gray-500">
            <th className="p-4">
              <input type="checkbox" />
            </th>
            <th className="p-4">PRODUCT NAME</th>
            <th className="p-4">TECHNOLOGY</th>
            <th className="p-4">ID</th>
            <th className="p-4">PRICE</th>
            <th className="p-4">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 text-gray-700 hover:bg-gray-100"
            >
              <td className="p-4">
                <input
                  type="checkbox"
                  className="form-checkbox text-blue-600 transition duration-150 ease-in-out border border-gray-300 rounded"
                />
              </td>
              <td className="p-4">
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">{product.name}</span>
                  <span className="text-sm text-gray-500">{product.category}</span>
                </div>
              </td>
              <td className="p-4 text-sm">{product.technology}</td>
              <td className="p-4 text-sm">{product.id}</td>
              <td className="p-4 text-sm">{product.price}</td>
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

export default ProductManagement;