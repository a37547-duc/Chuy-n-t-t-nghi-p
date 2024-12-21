/* eslint-disable react/prop-types */
import { useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTiers } from "../../../features/Admin/adminTiersSlice";
import { getAllTiers } from "../../../features/tier/tiersSlice";

const AddTiers = ({ onClose }) => {
  const dispatch = useDispatch();
  const tiers = useSelector((state) => state.tier.tiers);
  const [fieldErrors, setFieldErrors] = useState({});
  const nameInputRef = useRef(null);

  const [error, setError] = useState("");
  const [newTier, setNewTier] = useState({
    name: "",
    minSpent: "",
    discountValue: "",
    discountType: "percentage",
    description: "",
    couponExpiryDays: "",
    otherBenefits: [],
    color: "",
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
  
    // Kiểm tra lỗi cho các trường cụ thể
    if ((name === "minSpent" || name === "discountValue") && value < 0) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${name === "minSpent" ? "Chi tiêu tối thiểu" : "Giá trị giảm giá"} không được âm.`,
      }));
      return;
    }
  
    // Xóa lỗi nếu giá trị hợp lệ
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  
    setNewTier((prevTier) => ({
      ...prevTier,
      [name]: value,
    }));
  }, []);

  const handleBenefitsChange = useCallback((e, index) => {
    const { value } = e.target;
    setNewTier((prevTier) => {
      const updatedBenefits = [...prevTier.otherBenefits];
      updatedBenefits[index] = value;
      return { ...prevTier, otherBenefits: updatedBenefits };
    });
  }, []);

  const addBenefit = useCallback(() => {
    setNewTier((prevTier) => ({
      ...prevTier,
      otherBenefits: [...prevTier.otherBenefits, ""],
    }));
  }, []);

  const removeBenefit = useCallback((index) => {
    setNewTier((prevTier) => {
      const updatedBenefits = prevTier.otherBenefits.filter((_, i) => i !== index);
      return { ...prevTier, otherBenefits: updatedBenefits };
    });
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
  
      // Kiểm tra lỗi
      const errors = {};
      if (newTier.minSpent < 0) {
        errors.minSpent = "Chi tiêu tối thiểu không được âm.";
      }
      if (newTier.discountValue < 0) {
        errors.discountValue = "Giá trị giảm giá không được âm.";
      }
  
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        return;
      }
  
      // Kiểm tra trùng tên tier
      const isDuplicate = tiers.some(
        (tier) => tier.name.toLowerCase() === newTier.name.toLowerCase().trim()
      );
  
      if (isDuplicate) {
        setError("Hạng đã tồn tại. Vui lòng nhập tên khác.");
        nameInputRef.current.focus();
        return;
      }
  
      // Thêm tier nếu không trùng
      try {
        await dispatch(addTiers(newTier));
        dispatch(getAllTiers());
        setNewTier({
          name: "",
          minSpent: "",
          discountValue: "",
          discountType: "percentage",
          description: "",
          couponExpiryDays: "",
          otherBenefits: [],
          color: "",
        });
        onClose();
      } catch (error) {
        setError("Lỗi thêm hạng:", error);
      }
    },
    [dispatch, tiers, newTier, onClose]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="mb-4 text-xl font-semibold tracking-wide">Thêm hạng mới</h2>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium">Tên hạng</label>
          <input
            type="text"
            name="name"
            ref={nameInputRef}
            value={newTier.name}
            onChange={handleChange}
            className={`mt-1 block w-full border ${error ? "border-red-500" : "border-gray-300"} 
              focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2`}
            required
          />
          {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Chi tiêu tối thiểu</label>
          <input
            type="number"
            name="minSpent"
            value={newTier.minSpent}
            onChange={handleChange}
            className={`mt-1 block w-full border ${
              fieldErrors.minSpent ? "border-red-500" : "border-gray-300"
            } focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2`}
            required
          />
          {fieldErrors.minSpent && <p className="mt-1 text-sm text-red-500">{fieldErrors.minSpent}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium">Giá trị giảm giá</label>
          <input
            type="number"
            name="discountValue"
            value={newTier.discountValue}
            onChange={handleChange}
            className={`mt-1 block w-full border ${
              fieldErrors.discountValue ? "border-red-500" : "border-gray-300"
            } focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2`}
            required
          />
          {fieldErrors.discountValue && (
            <p className="mt-1 text-sm text-red-500">{fieldErrors.discountValue}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Loại giảm giá</label>
          <select
            name="discountType"
            value={newTier.discountType}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
          >
            <option value="percentage">Phần trăm</option>
            <option value="fixed">Cố định</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Mô tả</label>
          <textarea
            name="description"
            value={newTier.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium">Ngày hết hạn coupon</label>
          <input
            type="number"
            name="couponExpiryDays"
            value={newTier.couponExpiryDays}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
          />
        </div>

        {/* Các quyền lợi khác */}
        <div>
          <label className="block text-sm font-medium">Các quyền lợi khác</label>
          {newTier.otherBenefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <input
                type="text"
                value={benefit}
                onChange={(e) => handleBenefitsChange(e, index)}
                className="flex-1 border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
              />
              <button
                type="button"
                onClick={() => removeBenefit(index)}
                className="text-red-500 hover:underline"
              >
                Xóa
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addBenefit}
            className="mt-2 text-blue-500 hover:underline"
          >
            + Thêm quyền lợi
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium">Màu</label>
          <div className="flex items-center">
            <input
              type="color"
              name="color"
              value={newTier.color}
              onChange={handleChange}
              className="mt-1 block w-16 h-10 border-0 rounded-md"
              required
            />
            <p className="ml-4 mt-2 text-sm text-gray-500 font-medium">Mã màu: {newTier.color}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Thêm hạng
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Đóng
        </button>
      </div>
    </form>
  );
};

export default AddTiers;
