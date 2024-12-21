import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGift } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setCartTotal, setDiscountInfo, clearDiscountInfo, setIsApplied } from "./../../../../../features/Client/discountSlice";
import { apiFormData } from "../../../../../api/apiConfig";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const PromotionProduct = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Lấy trạng thái từ Redux
  const isApplied = useSelector((state) => state.discount.isApplied);
  const cartTotal = useSelector((state) => state.discount.originalPrice);

  // Hàm xử lý click khuyến mãi
  const handlePromotionClick = async () => {
    try {
      const response = await apiFormData.post("/user/tier/check-discount",{cartTotal,isApplied});
      const data = response.data;

      if (data.isApplied !== undefined) {
        dispatch(setIsApplied(data.isApplied)); // Cập nhật trạng thái isApplied

        if (data.isApplied) {
          dispatch(setCartTotal(data.finalPrice));
          dispatch(setDiscountInfo(data.discount));
          toast.success("Áp dụng khuyến mãi thành công!", {
            className: " text-[15px]",
          });
        } else {
          dispatch(clearDiscountInfo());
          toast.info("Bỏ áp dụng khuyến mãi thành công", {
            className: "text-[15px]",
          });
        }
      } else {
        toast.warning("Không đủ điều kiện áp dụng khuyến mãi", {
          className: "text-[15px]",
        });
      }
    } catch (error) {
      console.error("Lỗi kiểm tra khuyến mãi:", error);
      setTimeout(() => {
        navigate("/login", { state: { from: location }, replace: true });
      }, 1000);
    }
  };

  return (
    <div
      className="bg-[#F5F5F5] p-4 mt-4 rounded-md"
      style={{ border: "1.5px solid rgb(228, 229, 240)" }}
    >
      {/* Tiêu đề */}
      <div className="text-[#82869e] text-[14px] uppercase mb-1 ">
        <strong className="font-medium">Chọn một trong những khuyến mãi</strong>
      </div>

      {/* Nội dung khuyến mãi */}
      <div
        className={`w-full flex flex-row gap-0 justify-start items-start opacity-100 box-border mt-2.5 p-3 rounded-lg cursor-pointer relative overflow-hidden 
          ${isApplied ? "bg-[#F5F5F5] border-2 border-blue-500": "bg-white border border-gray-200"}`
        }
        onClick={handlePromotionClick}
      >
        {/* Icon khuyến mãi */}
        <div className="min-w-[64px] h-[64px] w-[64px] flex justify-center items-center mr-[12px] rounded bg-[#E8EBF9]">
          <FontAwesomeIcon className="text-red-500 text-[24px]" icon={faGift} />
        </div>

        {/* Thông tin khuyến mãi */}
        <div className="w-full flex flex-col gap-0 justify-between items-baseline">
          <div className="text-[13px] font-medium leading-[20px] text-[#434657]">
            Áp dụng giảm giá theo hạng thành viên
          </div>
          <div className="mt-1 text-[12px] text-[#848788] leading-[16px]">
            Khuyến mãi áp dụng khi mua tối thiểu một sản phẩm
          </div>

          {/* HSD và trạng thái */}
          <div className="w-full mt-2 flex flex-row justify-between">
            <div className="text-xs text-gray-500">HSD: 15/15/1515</div>
            <div className="text-[13px] text-[#1990FF]">
              {isApplied ? "Bỏ chọn" : "Áp dụng"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionProduct;
