// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { updateProductVariation } from "../../../features/product/productVariationSlice";

// const UpdateProductVariation = ({ variation, onClose }) => {
//   const dispatch = useDispatch();
//   const [formData, setFormData] = useState({
//     price: variation?.price || "",
//     stock_quantity: variation?.stock_quantity || "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await dispatch(updateProductVariation({ id: variation._id, data: formData }));
//     onClose();
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label className="block text-sm font-medium">Giá sản phẩm</label>
//         <input
//           type="number"
//           name="price"
//           value={formData.price}
//           onChange={handleInputChange}
//           className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none"
//           required
//         />
//       </div>
//       <div>
//         <label className="block text-sm font-medium">Số lượng tồn kho</label>
//         <input
//           type="number"
//           name="stock_quantity"
//           value={formData.stock_quantity}
//           onChange={handleInputChange}
//           className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none"
//           required
//         />
//       </div>
//       <div className="flex justify-end space-x-2">
//         <button
//           type="button"
//           onClick={onClose}
//           className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
//         >
//           Hủy
//         </button>
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Lưu thay đổi
//         </button>
//       </div>
//     </form>
//   );
// };

// export default UpdateProductVariation;
