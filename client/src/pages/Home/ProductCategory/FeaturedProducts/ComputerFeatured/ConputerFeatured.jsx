/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const ComputerFeatured = ({ currentProducts }) => {
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <div className="flex flex-wrap gap-x-[2px] content-start bg-[#f6f6f6] py-[2px]">
      {currentProducts.map((product) => (
        <div key={product?._id} className="bg-white mb-[2px] product h-auto">
          <div className="relative w-full h-full p-4 flex flex-col bg-white justify-between">
            <a
              className="no-underline text-inherit cursor-pointer block h-full flex flex-col justify-between"
              onClick={() => handleProductClick(product?._id)}
            >
              <div className="relative mb-2">
                <div className="relative mb-1">
                  <div className="relative pb-[100%]">
                    <div className="inline-block overflow-hidden h-full w-full transition-transform duration-300 absolute inset-0 object-contain flex justify-center items-center">
                      <img
                        className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        alt={product?.name}
                        src={product?.images[0]}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-1">
                  <div className="uppercase m-0 p-0 border-none opacity-100 text-[#82869e] font-medium text-[13px] leading-[20px] overflow-hidden line-clamp-3 transition-colors duration-300">
                    {product?.name}
                  </div>
                </div>
              </div>
              <div className="h-10">
                <div className="m-0 p-0 border-none opacity-100 text-[rgb(67,70,87)] font-normal text-[12px] leading-[16px] overflow-hidden line-clamp-3">
                  <h3
                    title={product?.description}
                    className="text-[0.75rem] font-normal leading-[1rem]"
                  >
                    {product?.description}
                  </h3>
                </div>
              </div>
              <div className="relative mt-1 mb-1 pr-0">
                <div className="flex items-start h-10">
                  <div
                    className={`m-0 p-0 border-none font-bold text-[15px] leading-[24px] overflow-hidden 
                    ${product?.status === "out of stock" ? "text-[#ff0000]" : "text-[rgb(20,53,195)]"}`}
                  >
                    {product?.status === "out of stock" ? "Hết hàng" : `${product?.product_variants?.price.toLocaleString()} VNĐ`}
                  </div>
                </div>
              </div>
            </a>
            <button
              type="button"
              onClick={() => handleProductClick(product?._id)}
              className="opacity-100 h-8 p-0 rounded-md bg-white border border-[rgb(20,53,195)] relative flex items-center justify-center outline-none w-full text-[rgb(20,53,195)] cursor-pointer transition-colors duration-80"
            >
              <div className="m-0 p-0 border-none opacity-100 text-[rgb(20,53,195)] font-medium text-[13px] leading-[20px]">
                Xem chi tiết
              </div>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ComputerFeatured;
