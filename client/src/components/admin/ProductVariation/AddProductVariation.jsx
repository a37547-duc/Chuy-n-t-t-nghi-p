import { useState } from "react";
import { useDispatch } from "react-redux";
import { addVariation } from "../../../features/Admin/adminVariationsSlice";
import { getAllProductVariations } from "../../../features/product/productVariationSlice";

const AddProductVariation = ({ onClose, productId }) => {
  const dispatch = useDispatch();
  const productTypes = {
    LaptopVariant: "LaptopVariant",
    MouseVariant: "MouseVariant",
    ACCESSORY: "Accessory",
  };

  const [newProduct, setNewProduct] = useState({
    type: "",
    name: "",
    color: "",
    price: "",
    stock_quantity: "",
    // Dữ liệu laptop
    gpu: { name: "" },
    cpu: { name: "", cores: "", threads: "" },
    ram: { capacity: "", type: "" },
    storage: "",
    // Dữ liệu chuột
    dpi: "",
    weight: "",
    connectivity: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
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
    if (!newProduct.type) formErrors.type = "Chọn loại sản phẩm!";
    if (!newProduct.name) formErrors.name = "Tên sản phẩm không được để trống!";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    console.log(newProduct);
    e.preventDefault();
    if(newProduct.type === "LaptopVariant") {
      newProduct.price = Number(newProduct.price);
      newProduct.stock_quantity = Number(newProduct.stock_quantity);
      newProduct.cpu.cores = Number(newProduct.cpu.cores);
      newProduct.cpu.threads = Number(newProduct.cpu.threads);
    }
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
        Thêm sản phẩm biến thể
      </h2>

      {/* Dropdown chọn loại sản phẩm */}
      <div>
        <label className="block text-sm font-medium">Chọn loại sản phẩm</label>
        <select
          name="type"
          value={newProduct.type}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
        >
          <option value="">Chọn loại sản phẩm</option>
          {Object.entries(productTypes).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
        {errors.type && <p className="text-red-500 text-sm">{errors.type}</p>}
      </div>

      {newProduct.type === "LaptopVariant" && (
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
                required
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium">Color</label>
              <input
                type="text"
                name="color"
                value={newProduct.color}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <label className="block text-sm font-medium">Stock Quantity</label>
              <input
                type="number"
                name="stock_quantity"
                value={newProduct.stock_quantity}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
              />
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
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium">Storage</label>
              <input
                type="text"
                name="storage"
                value={newProduct.storage}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <label className="block text-sm font-medium">CPU Name</label>
              <input
                type="text"
                name="cpu"
                value={newProduct.cpu.name}
                onChange={(e) => handleNestedChange(e, "cpu", "name")}
                className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium">CPU Cores</label>
              <input
                type="number"
                name="cpuCores"
                value={newProduct.cpu.cores}
                onChange={(e) => handleNestedChange(e, "cpu", "cores")}
                className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium">CPU Threads</label>
              <input
                type="number"
                name="cpuThreads"
                value={newProduct.cpu.threads}
                onChange={(e) => handleNestedChange(e, "cpu", "threads")}
                className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <label className="block text-sm font-medium">RAM Capacity</label>
              <input
                type="text"
                name="ramCapacity"
                value={newProduct.ram.capacity}
                onChange={(e) => handleNestedChange(e, "ram", "capacity")}
                className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium">RAM Type</label>
              <input
                type="text"
                name="ramType"
                value={newProduct.ram.type}
                onChange={(e) => handleNestedChange(e, "ram", "type")}
                className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
              />
            </div>
          </div>
        </div>
      )}
      {/* Form dành cho Mouse */}
      {newProduct.type === "MouseVariant" && (
        <div className="grid grid-cols-1 gap-4">
          {/* Các trường dữ liệu của Mouse */}
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
                required
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">DPI</label>
              <input
                type="text"
                name="dpi"
                value={newProduct.dpi}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <label className="block text-sm font-medium">Weight</label>
              <input
                type="text"
                name="weight"
                value={newProduct.weight}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium">Connectivity</label>
              <input
                type="text"
                name="connectivity"
                value={newProduct.connectivity}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
              />
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-end space-x-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Thêm sản phẩm
        </button>
        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          Đóng
        </button>
      </div>
    </form>
  );
};

export default AddProductVariation;
