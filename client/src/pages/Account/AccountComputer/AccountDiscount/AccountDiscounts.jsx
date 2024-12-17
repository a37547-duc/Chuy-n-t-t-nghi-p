import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTier } from "../../../../features/Client/ClientDiscountSlice";
import { GiMedalSkull } from "react-icons/gi";

const AccountDiscounts = () => {
  const dispatch = useDispatch();
  const { totalSpent, tier, tiers, loading, error } = useSelector((state) => state.clientDiscount);
  const [activeTier, setActiveTier] = useState("");

  useEffect(() => {
    dispatch(getUserTier());
    setActiveTier(tier)
  }, [dispatch, tier]);

  const handleTierClick = (tier) => {
    setActiveTier(tier);
  };

  const activeTierData = tiers.find((item) => item.name === activeTier);

  const formatMoney = (amount) => {
    if (amount >= 1_000_000) {
      return `${(amount / 1_000_000).toFixed(2)}M`; // Chia cho 1 triệu và giữ 2 chữ số thập phân
    }
    return `${amount.toLocaleString("vi-VN")} VNĐ`; // Nếu nhỏ hơn 1 triệu, hiển thị VNĐ
  };

  return (
    <div className="p-6">
      {(loading) && (
        <div className="flex justify-center items-center my-6 min-h-[400px]">
          <svg className="animate-spin h-8 w-8 text-black-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <span className="ml-2 text-black-500">Loading...</span>
        </div>
      )}

      {(error) && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          <p>
            Lỗi: {error?.message || error}
          </p>
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="rounded-lg shadow-none border border-[#eaedef] mx-auto p-1 relative w-full z-[1] mb-10">
            <div className="pb-4 justify-around flex">
              <div className="justify-start mt-4 w-full flex items-center flex-col">
                <p className="text-xl font-bold">{tier}</p>
                <p className="text-sm">Hạng</p>
              </div>
              <div className="h-[50px] border-l-2 border-gray-700 mx-4 my-2"></div>
              <div className="justify-start mt-4 w-full flex items-center flex-col">
                <p className="text-xl font-bold">{formatMoney(totalSpent)}</p>
                <p className="text-sm">Tổng tiền tích lũy</p>
              </div>
            </div>
          </div>

          {/* Thẻ hạng */}
          <div className="flex justify-around mb-6">
            {tiers.map((item) => (
              <div
                key={item._id}
                className={`p-4 cursor-pointer text-center ${activeTier === item.name ? "opacity-100" : "opacity-50"}`}
                onClick={() => handleTierClick(item.name)}
              >
                {/* Icon với màu sắc tương ứng */}
                <div
                  className="text-[50px] mb-2 flex justify-center items-center"
                  style={{ color: item.color || "#000" }} // Lấy màu từ dữ liệu
                >
                  <GiMedalSkull />
                </div>

                <p className={`text-sm font-bold mt-2 ${activeTier === item.name ? "text-red-500" : "text-gray-400"}`}>
                  {item.name}
                </p>

                {/* Dấu chấm đỏ với viền */}
                <div className="flex justify-center items-center mt-2">
                  <div
                    className={`w-5 h-5 flex items-center justify-center rounded-full border-2 ${
                      activeTier === item.name ? "border-red-500" : "border-gray-400"
                    }`}
                  >
                    {activeTier === item.name && <div className="w-2 h-2 bg-red-500 rounded-full"></div>}
                  </div>
                </div>      
              </div>
            ))}
          </div>

          {/* Điều kiện */}
          <div className="mb-6">
            <h3 className="font-bold text-red-500 mb-2">ĐIỀU KIỆN</h3>
            <p className="text-gray-700 text-sm flex items-center text-[20px]">
              <span className="mr-2">🛒</span>
              {activeTierData ? activeTierData.description : "Không có thông tin điều kiện"}
            </p>
          </div>

          {/* Ưu đãi mua hàng */}
          <div>
            <h3 className="font-bold text-red-500 mb-2">ƯU ĐÃI MUA HÀNG</h3>
            <ul className="space-y-3">
              {activeTierData?.otherBenefits.map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2 text-[20px]">🎁</span>
                  {benefit}
                </li>
              )) || <li>Không có thông tin ưu đãi</li>}
            </ul>
          </div>
        </>
      )}      
    </div>
  );
};

export default AccountDiscounts;
