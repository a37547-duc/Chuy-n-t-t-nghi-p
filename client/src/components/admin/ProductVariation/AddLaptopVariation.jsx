/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addVariation } from "../../../features/Admin/adminVariationsSlice";
import { getAllProductVariations } from "../../../features/product/productVariationSlice";

const AddLaptopVariation = ({ onClose, productId }) => {
  const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState({
    type: "LaptopVariant",
    color: "",
    price: "",
    stock_quantity: "",
    gpu: { name: "" },
    cpu: { name: "", cores: "", threads: "" },
    ram: { capacity: "", type: "" },
    storage: "",
  });

  const [displayPrice, setDisplayPrice] = useState("");
  const [errors, setErrors] = useState({});

  const formatPrice = (value) => {
    if (!value) return "";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "price") {
      // Xử lý định dạng giá
      const numericValue = value.replaceAll(",", "").replace(/\D/g, ""); // Loại bỏ dấu phẩy và ký tự không phải số
      setDisplayPrice(formatPrice(numericValue, ",")); // Định dạng lại với dấu phẩy
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        price: numericValue, // Lưu giá trị không chứa dấu phẩy
      }));
    } else {
      // Xử lý các trường khác
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleNestedChange = (e, field, subField) => {
    const { value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [field]: {
        ...prevProduct[field],
        [subField]: value,
      },
    }));
  };

  const validateForm = () => {
    let formErrors = {};

    // if (!newProduct.color) {
    //   formErrors.color = "Màu sắc không được để trống.";
    // }

    // if (!newProduct.price || newProduct.price <= 0) {
    //   formErrors.price = "Giá phải lớn hơn 0.";
    // }

    // if (!newProduct.stock_quantity || newProduct.stock_quantity < 0) {
    //   formErrors.stock_quantity = "Số lượng trong kho phải lớn hơn hoặc bằng 0.";
    // }

    // if (!newProduct.gpu.name) {
    //   formErrors.gpu = "GPU không được để trống.";
    // }

    // if (!newProduct.cpu.name) {
    //   formErrors.cpuName = "Tên CPU không được để trống.";
    // }

    // if (!newProduct.cpu.cores || newProduct.cpu.cores <= 0) {
    //   formErrors.cpuCores = "Số lõi CPU phải lớn hơn 0.";
    // }

    // if (!newProduct.cpu.threads || newProduct.cpu.threads <= 0) {
    //   formErrors.cpuThreads = "Số luồng CPU phải lớn hơn 0.";
    // }

    // if (!newProduct.ram.capacity) {
    //   formErrors.ramCapacity = "Dung lượng RAM không được để trống.";
    // }

    // if (!newProduct.ram.type) {
    //   formErrors.ramType = "Loại RAM không được để trống.";
    // }

    // if (!newProduct.storage) {
    //   formErrors.storage = "Bộ nhớ không được để trống.";
    // }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    newProduct.price = Number(newProduct.price);
    newProduct.stock_quantity = Number(newProduct.stock_quantity);
    newProduct.cpu.cores = Number(newProduct.cpu.cores);
    newProduct.cpu.threads = Number(newProduct.cpu.threads);
    if (!validateForm()) return;
    dispatch(addVariation({ productId, variationData: newProduct }))
      .unwrap()
      .then(() => {
        console.log("Product added successfully");
        dispatch(getAllProductVariations(productId));
        onClose();
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit}>
      <h2 className="mb-4 text-xl font-semibold tracking-wide">
        Thêm biến thể sản phẩm
      </h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <label className="block text-sm font-medium">Màu sắc</label>
            <input
              type="text"
              name="color"
              value={newProduct.color}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            />
            {errors.color && <p className="text-red-500 text-sm">{errors.color}</p>}
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium">Giá</label>
            <input
              type="text" // Sử dụng type="text" để hiển thị dấu chấm
              name="price"
              value={displayPrice} // Hiển thị giá trị có dấu chấm
              onChange={handleChange} // Cập nhật giá trị
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
              value={newProduct.stock_quantity}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            />
            {errors.stock_quantity && <p className="text-red-500 text-sm">{errors.stock_quantity}</p>}
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium">GPU</label>
            <input
              type="text"
              name="gpu"
              value={newProduct.gpu.name}
              onChange={(e) => handleNestedChange(e, "gpu", "name")}
              className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            />
            {errors.gpu && <p className="text-red-500 text-sm">{errors.gpu}</p>}
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium">Dung lượng</label>
            <input
              type="text"
              name="storage"
              value={newProduct.storage}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            />
            {errors.storage && <p className="text-red-500 text-sm">{errors.storage}</p>}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <label className="block text-sm font-medium">CPU</label>
            <input
              type="text"
              name="cpu"
              value={newProduct.cpu.name}
              onChange={(e) => handleNestedChange(e, "cpu", "name")}
              className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            />
            {errors.cpuName && <p className="text-red-500 text-sm">{errors.cpuName}</p>}
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium">Số nhân CPU (CPU Cores)</label>
            <input
              type="number"
              name="cpuCores"
              value={newProduct.cpu.cores}
              onChange={(e) => handleNestedChange(e, "cpu", "cores")}
              className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            />
            {errors.cpuCores && <p className="text-red-500 text-sm">{errors.cpuCores}</p>}
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium">Số luồng (CPU threads) </label>
            <input
              type="number"
              name="cpuThreads"
              value={newProduct.cpu.threads}
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
              name="ramCapacity"
              value={newProduct.ram.capacity}
              onChange={(e) => handleNestedChange(e, "ram", "capacity")}
              className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            />
            {errors.ramCapacity && <p className="text-red-500 text-sm">{errors.ramCapacity}</p>}
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium">Loại RAM</label>
            <input
              type="text"
              name="ramType"
              value={newProduct.ram.type}
              onChange={(e) => handleNestedChange(e, "ram", "type")}
              className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            />
            {errors.ramType && <p className="text-red-500 text-sm">{errors.ramType}</p>}
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Thêm biến thể sản phẩm
        </button>
        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          Đóng
        </button>
      </div>
    </form>
  );
};

export default AddLaptopVariation;
