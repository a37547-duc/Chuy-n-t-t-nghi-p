/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import DetailsProduct from "./DetailsProduct/DetailsProduct";
import "./ProductMiddle.css";

const ProductDetailMiddle = ({product, selectedVariant}) => {
  
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div id="product-detail-middle" className="flex justify-center mx-auto scroll-mt-[150px] md:scroll-mt-[100px]">
      <div className="flexBox w-full max-w-[1100px] h-[420px] rounded bg-white mb-4">
        {/* Phần trên / Phần dưới */}
        {isMobile ? (
          <>
            {/* Phần chi tiết sản phẩm ở trên */}
            <DetailsProduct />

            {/* Phần mô tả sản phẩm ở dưới */}
            <div className="w-full md:w-[60%] flex-shrink-0 pl-[5px]">
              <div className="h-[56px] flex px-4">
                <div className="py-4 font-bold text-[20px]">Mô tả sản phẩm</div>
              </div>
              <div className="p-4">
                <div className="text-[14px]">Đang cập nhật...</div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Phần mô tả sản phẩm ở trên */}
            <div className="w-full md:w-[60%] flex-shrink-0 pl-[5px]">
              <div className="h-[56px] flex px-4">
                <div className="py-4 font-bold text-[20px]">Mô tả sản phẩm</div>
              </div>
              <div className="p-4">
                <div className="text-[14px]">Đang cập nhật...</div>
              </div>
            </div>

            {/* Phần chi tiết sản phẩm ở dưới */}
            <DetailsProduct data={product} selectedVariant={selectedVariant}/>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductDetailMiddle;