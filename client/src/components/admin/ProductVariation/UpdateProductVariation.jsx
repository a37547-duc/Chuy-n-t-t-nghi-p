import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProductVariations } from "../../../features/product/productVariationSlice";
import { updateVariation } from "../../../features/Admin/adminVariationsSlice";

const UpdateProductVariation = ({ data, productId, onClose, id }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    color: data?.color || "",
    price: data?.price || "",
    stock_quantity: data?.stock_quantity || "",
    gpu: {
      name: data?.gpu?.name || "",
    },
    storage: data?.storage || "",
    cpu: {
      name: data?.cpu?.name || "",
      cores: data?.cpu?.cores || "",
      threads: data?.cpu?.threads || "",
    },
    ram: {
      capacity: data?.ram?.capacity || "",
      type: data?.ram?.type || "",
    },
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.price || formData.price <= 0) newErrors.price = "Giá phải lớn hơn 0.";
    if (!formData.stock_quantity || formData.stock_quantity <= 0) newErrors.stock_quantity = "Số lượng phải lớn hơn 0.";
    if (formData.cpu?.cores < 1) newErrors.cpuCores = "Số nhân CPU phải lớn hơn 0.";
    if (formData.cpu?.threads < 1) newErrors.cpuThreads = "Số luồng CPU phải lớn hơn 0.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (e, field, subField) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [subField]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      await dispatch(updateVariation({ variationId: id, updatedData: formData })).unwrap();
      dispatch(getAllProductVariations(productId));
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit}>
      <h2 className="mb-4 text-xl font-semibold tracking-wide">Cập nhật biến thể</h2>

      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <label className="block text-sm font-medium">Màu sắc</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium">Giá</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <label className="block text-sm font-medium">Số lượng trong kho</label>
            <input
              type="number"
              name="stock_quantity"
              value={formData.stock_quantity}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            />
            {errors.stock_quantity && <p className="text-red-500 text-sm">{errors.stock_quantity}</p>}
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium">GPU</label>
            <input
              type="text"
              name="gpu"
              value={formData.gpu.name}
              onChange={(e) => handleNestedChange(e, "gpu", "name")}
              className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium">Dung lượng</label>
            <input
              type="text"
              name="storage"
              value={formData.storage}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <label className="block text-sm font-medium">CPU</label>
            <input
              type="text"
              name="cpu.name"
              value={formData.cpu.name}
              onChange={(e) => handleNestedChange(e, "cpu", "name")}
              className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium">Số nhân CPU</label>
            <input
              type="number"
              name="cpu.cores"
              value={formData.cpu.cores}
              onChange={(e) => handleNestedChange(e, "cpu", "cores")}
              className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            />
            {errors.cpuCores && <p className="text-red-500 text-sm">{errors.cpuCores}</p>}
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium">Số luồng CPU</label>
            <input
              type="number"
              name="cpu.threads"
              value={formData.cpu.threads}
              onChange={(e) => handleNestedChange(e, "cpu", "threads")}
              className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            />
            {errors.cpuThreads && <p className="text-red-500 text-sm">{errors.cpuThreads}</p>}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <label className="block text-sm font-medium">Dung lượng RAM</label>
            <input
              type="text"
              name="ram.capacity"
              value={formData.ram.capacity}
              onChange={(e) => handleNestedChange(e, "ram", "capacity")}
              className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium">Loại RAM</label>
            <input
              type="text"
              name="ram.type"
              value={formData.ram.type}
              onChange={(e) => handleNestedChange(e, "ram", "type")}
              className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Cập nhật biến thể sản phẩm
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
        >
          Đóng
        </button>
      </div>
    </form>
  );
};

export default UpdateProductVariation;
