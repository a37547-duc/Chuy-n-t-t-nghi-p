import { useState } from "react";
import { useDispatch } from "react-redux";
import { addVariation } from "../../../features/Admin/adminVariationsSlice";
import { getAllProductVariations } from "../../../features/product/productVariationSlice";

const AddMouseVariation = ({ onClose, productId }) => {
  const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState({
    type: "MouseVariant",
    color: "",
    price: "",
    stock_quantity: "",
    dpi: "",
    connectivity: "",
    weight: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!newProduct.name) formErrors.name = "Tên sản phẩm không được để trống!";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    newProduct.price = Number(newProduct.price);
    newProduct.stock_quantity = Number(newProduct.stock_quantity);
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
        Thêm sản phẩm biến thể {newProduct.type}
      </h2>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center space-x-2">
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
        </div>

        <div className="flex items-center space-x-2">
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
        </div>

        <div className="flex items-center space-x-2">
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

          <div className="flex-1">
            <label className="block text-sm font-medium">Weight (g)</label>
            <input
              type="text"
              name="weight"
              value={newProduct.weight}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            />
          </div>
        </div>
      </div>
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

export default AddMouseVariation;
