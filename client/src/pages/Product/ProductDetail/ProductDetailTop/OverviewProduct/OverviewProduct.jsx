/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCartTotal, setDiscountInfo, clearDiscountInfo, setOriginalPrice } from "./../../../../../features/Client/discountSlice";

const OverviewProduct = ({ data, onVariantChange }) => {
  const dispatch = useDispatch();

  // Lấy thông tin giảm giá từ Redux store
  const discountInfo = useSelector((state) => state.discount) || {discount: 0,};
  const originalPrice = useSelector((state) => state.discount.originalPrice);
  const cartTotal = useSelector((state) => state.discount.cartTotal);

  // Tính toán số tiền đã giảm
  const priceDifference = originalPrice - cartTotal;

  // Lấy biến thể đầu tiên có hàng, nếu không lấy biến thể đầu tiên
  const initialVariant = data?.variants?.find((variant) => variant?.stock_quantity > 0) || data?.variants?.[0];

  const [selectedCpu, setSelectedCpu] = useState(initialVariant?._id);
  const [selectedColor, setSelectedColor] = useState(initialVariant?.color);

  // Cập nhật giá và màu khi biến thể thay đổi
  useEffect(() => {
    const selectedVariant = data?.variants?.find((variant) => variant?._id === selectedCpu);

    if (selectedVariant) {
      // Cập nhật originalPrice và cartTotal vào Redux
      dispatch(setOriginalPrice(selectedVariant.price));

      const discountedPrice = discountInfo.discount ? selectedVariant.price * (1 - discountInfo.discount / 100) : selectedVariant.price;

      dispatch(setCartTotal(discountedPrice));
      setSelectedColor(selectedVariant?.color);

      // Truyền variant ra ngoài thông qua callback
      onVariantChange(selectedVariant);
    }
  }, [selectedCpu, discountInfo, data.variants, dispatch, onVariantChange]);

  // Xử lý khi người dùng chọn một biến thể
  const handleCpuChange = (variant) => {
    setSelectedCpu(variant?._id);
  };

  return (
    <div>
      <div>
        <h1 className="mb-2 text-[24px] font-bold leading-tight text-[#333]">
          {data?.product?.name}
        </h1>
        <div className="text-[14px] mt-[-4px] text-[#82869E]">
          Thương hiệu:
          <a href="#" className="cursor-pointer">
            <span className="text-blue-700 font-bold uppercase">
              {data?.product?.brand?.name}
            </span>
          </a>
          <span className="mx-2">|</span>
          SKU: 0123456789
        </div>
      </div>

      {/* Kiểm tra trạng thái hết hàng */}
      {!data?.variants?.some((variant) => variant?.stock_quantity > 0) ? (
        <div className="py-2 font-bold mb-[140px]">
          Tình trạng:{" "}
          <span className="font-medium text-red-500">Hết hàng!!!</span>
        </div>
      ) : (
        <div>
          {/* Lựa chọn CPU */}
          <div className="my-4">
            <div className="text-[12px] text-[#82869E] uppercase font-medium">
              CPU Laptop (Filter)
            </div>
            <div className="flex flex-wrap mt-[8px]">
              {data?.variants?.map((variant) => (
                <a
                  key={variant?._id}
                  onClick={() =>
                    variant?.stock_quantity > 0 && handleCpuChange(variant)
                  }
                  className={`px-4 py-2 rounded-md border-2 text-[12px] mr-2 mb-2 cursor-pointer text-center w-[130px] overflow-hidden whitespace-nowrap truncate
                    ${selectedCpu === variant._id ? "border-blue-500 text-blue-500" : "border-gray-300 text-gray-500"}
                    ${variant?.stock_quantity <= 0 ? "cursor-not-allowed opacity-50": ""}`
                  }
                >
                  {variant?.ram?.capacity}GB RAM
                  <br />
                  {variant?.cpu?.name}
                  <br />
                  {variant?.gpu?.name}
                </a>
              ))}
            </div>
          </div>

          {/* Màu sắc Laptop */}
          <div className="my-4">
            <div className="text-[12px] text-[#82869E] uppercase font-medium">
              Màu sắc Laptop (Filter)
            </div>
            <div className="flex mt-[8px]">
              <a className="px-4 py-2 rounded-md border-2 border-blue-500 text-[12px] text-blue-500 mr-2 mb-2">
                {selectedColor}
              </a>
            </div>
          </div>

          {/* Hiển thị giá */}
          <div className="flex-column mb-3">
            <div className="text-blue-700 font-bold text-[20px]">
              {cartTotal?.toLocaleString()}đ {/* Giá sau giảm */}
            </div>
            {discountInfo?.discount > 0 && (
              <div className="text-[12px] flex">
                <div className="mr-1 text-[#82869E] line-through">
                  {originalPrice?.toLocaleString()}đ {/* Giá gốc */}
                </div>
                <div className="text-blue-500">
                  Giảm {priceDifference?.toLocaleString()}đ {/* Giá giảm */}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="py-3">
        <div className="dashs border-t border-dashed border-[#ddd] w-full"></div>
      </div>
    </div>
  );
};

export default OverviewProduct;