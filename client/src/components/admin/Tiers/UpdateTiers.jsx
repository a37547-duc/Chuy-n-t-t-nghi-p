/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTiers } from "../../../features/tier/tiersSlice";
import { updateTier } from "../../../features/Admin/adminTiersSlice";

const UpdateTiers = ({ editTier, onClose }) => {
  const dispatch = useDispatch();
  const tiers = useSelector((state) => state.tier.tiers);

  const [error, setError] = useState("");
  const [updatedTier, setUpdatedTier] = useState({
    name: "",
    minSpent: 0,
    discountValue: 0,
    discountType: "percentage",
    description: "",
    couponExpiryDays: 0,
    otherBenefits: [],
    color: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    minSpent: "",
    discountValue: "",
  });

  useEffect(() => {
    if (editTier) {
      setUpdatedTier({
        name: editTier.name || "",
        minSpent: editTier.minSpent || 0,
        discountValue: editTier.discountValue || 0,
        discountType: editTier.discountType || "percentage",
        description: editTier.description || "",
        couponExpiryDays: editTier.couponExpiryDays || 0,
        otherBenefits: editTier.otherBenefits || [],
        color: editTier.color || "",
      });
      setError(""); // Xóa lỗi cũ nếu có
    }
  }, [editTier]);

  const duplicateTier = useMemo(() => {
    return tiers.find(
      (tier) =>
        tier.name.toLowerCase().trim() === updatedTier.name.toLowerCase().trim() &&
        tier._id !== editTier._id
    );
  }, [tiers, updatedTier.name, editTier]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
  
    // Reset lỗi cho trường đang nhập
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
  
    if ((name === "minSpent" || name === "discountValue") && value < 0) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: `${name === "minSpent" ? "Chi tiêu tối thiểu" : "Giá trị giảm giá"} không được âm.`,
      }));
      return;
    }
  
    setUpdatedTier((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleBenefitsChange = useCallback((e, index) => {
    const value = e.target.value;
    setUpdatedTier((prev) => {
      const updatedBenefits = [...prev.otherBenefits];
      updatedBenefits[index] = value;
      return { ...prev, otherBenefits: updatedBenefits };
    });
  }, []);

  const addBenefit = useCallback(() => {
    setUpdatedTier((prev) => ({
      ...prev,
      otherBenefits: [...prev.otherBenefits, ""],
    }));
  }, []);

  const removeBenefit = useCallback((index) => {
    setUpdatedTier((prev) => {
      const updatedBenefits = prev.otherBenefits.filter((_, i) => i !== index);
      return { ...prev, otherBenefits: updatedBenefits };
    });
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (duplicateTier) {
        setError("Hạng đã tồn tại.");
        return;
      }

      try {
        await dispatch(
          updateTier({
            id: editTier._id,
            editTier: updatedTier,
          })
        ).unwrap();
        dispatch(getAllTiers());
        onClose();
      } catch (error) {
        setError("Lỗi khi cập nhật hạng", error);
      }
    },
    [duplicateTier, dispatch, editTier, updatedTier, onClose]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="mb-4 text-xl font-semibold tracking-wide">Cập nhật hạng</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium">Tên hạng</label>
          <input
            type="text"
            name="name"
            value={updatedTier.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Chi tiêu tối thiểu</label>
          <input
            type="number"
            name="minSpent"
            value={updatedTier.minSpent}
            onChange={handleChange}
            className={`mt-1 block w-full border ${fieldErrors.minSpent ? "border-red-500" : "border-gray-300"} 
              focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2`}
            required
          />
          {fieldErrors.minSpent && <p className="mt-1 text-sm text-red-500">{fieldErrors.minSpent}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Giá trị giảm giá</label>
          <input
            type="number"
            name="discountValue"
            value={updatedTier.discountValue}
            onChange={handleChange}
            className={`mt-1 block w-full border ${fieldErrors.discountValue ? "border-red-500" : "border-gray-300"} 
              focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2`}
            required
          />
          {fieldErrors.discountValue && <p className="mt-1 text-sm text-red-500">{fieldErrors.discountValue}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Loại giảm giá</label>
          <select
            name="discountType"
            value={updatedTier.discountType}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
          >
            <option value="percentage">Phần trăm</option>
            <option value="fixed">Cố định</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Thời gian hiệu lực (ngày)</label>
          <input
            type="number"
            name="couponExpiryDays"
            value={updatedTier.couponExpiryDays}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Mô tả</label>
          <textarea
            name="description"
            value={updatedTier.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 focus:border-2 focus:border-blue-500 focus:outline-none rounded-md p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Màu</label>
          <div className="flex items-center">
            <input
              type="color"
              name="color"
              value={updatedTier.color}
              onChange={handleChange}
              className="mt-1 block w-16 h-10 border-0 rounded-md"
            />
            <p className="ml-4 mt-2 text-ml text-gray-500 font-medium">Mã màu: {updatedTier.color}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Các quyền lợi khác</label>
          {updatedTier.otherBenefits.map((benefit, index) => (
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
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Cập nhật hạng
        </button>
        <button
          onClick={onClose}
          type="button"
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Đóng
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </form>
  );
};

export default UpdateTiers;
