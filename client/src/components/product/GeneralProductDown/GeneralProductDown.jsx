/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./GeneralProductDown.css";

const GeneralProductDown = ({data}) => {
  const navigate = useNavigate();
  const sortOptions = [
    "Giá tăng dần",
    "Giá giảm dần",
    "Sản phẩm mới nhất",
  ];

  const [visibleProducts, setVisibleProducts] = useState(10);
  const [sortOrder, setSortOrder] = useState(null);
  const [activeSort, setActiveSort] = useState("");

  // useEffect để reset lại các state khi data thay đổi
  useEffect(() => {
    setSortOrder(null);
    setActiveSort("");
    setVisibleProducts(10);
  }, [data]);

  const handleSortChange = (option) => {
    if (activeSort === option) {
      // Nếu tùy chọn đã được chọn, bỏ active và reset
      setSortOrder(null);
      setActiveSort("");
    } else {
      // Nếu tùy chọn chưa được chọn, cập nhật tùy chọn sắp xếp
      setActiveSort(option);
      setSortOrder(option);
    }
  };

  const sortedData = [...data];
  if (sortOrder === "Giá tăng dần") {
    sortedData.sort((a, b) => (a?.product_variants?.price ?? 0) - (b?.product_variants?.price ?? 0));
  } else if (sortOrder === "Giá giảm dần") {
    sortedData.sort((a, b) => (b?.product_variants?.price ?? 0) - (a?.product_variants?.price ?? 0));
  } else if (sortOrder === "Sản phẩm mới nhất") {
    sortedData.reverse();
  }
  
  const currentProducts = sortedData.slice(0, visibleProducts);

  const handleShowMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 10);
  };

  const handleProductClick = (productId) => { navigate(`/products/${productId}`);};

  return (
    <div className="border-none rounded-lg border opacity-100 bg-white w-full">
      <div className="border-b border-b-[#EAEAEA] border-t-0 border-x-0 opacity-100 flex flex-row gap-0 items-baseline w-full h-[64px] rounded-t-lg justify-between text-[14px]">
        <div className="border border-transparent opacity-100 h-full pl-4 flex flex-row gap-0 justify-center items-center">
          <div className="mr-8 p-0 border border-transparent opacity-100 text-inherit font-medium text-sm leading-6 overflow-hidden transition-colors duration-300">
            Sắp xếp theo
          </div>
          {sortOptions.map((option, index) => (
            <div
              key={index}
              className={`mr-4 p-2 rounded border border-gray-300 relative overflow-hidden cursor-pointer select-none 
                ${activeSort === option ? "bg-blue-700 text-white" : ""}`}
              onClick={() => handleSortChange(option)}
            >
              <div className="m-0 p-0 border border-transparent opacity-100 text-inherit font-normal text-[13px] leading-5 overflow-hidden transition-colors duration-300">
                {option}
              </div>
            </div>
          ))}
        </div>
      </div>

      {data.length === 0 ? (
        <div className="flex justify-center items-center w-full py-4 text-center text-gray-600 min-h-[400px]">
          <span className="text-xl font-medium">Hiện tại chúng tôi không có sản phẩm bạn cần tìm. Xin lỗi vì sự bất tiện này!</span>
        </div>
      ) : (
        <div className="flex flex-wrap gap-0.5 justify-start bg-[#F6F6F6] py-0.5">
          {currentProducts.map((product, index) => (
            <div key={index} className="h-auto bg-white mb-[2px] product">
              <div className="relative w-full h-full p-4 flex flex-col bg-white justify-between">
                <a 
                  className="no-underline text-inherit cursor-pointer block h-full flex flex-col justify-between"
                  onClick={() => handleProductClick(product._id)}
                >
                  <div className="relative mb-2">
                    <div className="relative mb-1">
                      <div className="relative pb-[100%]">
                        <div className="inline-block overflow-hidden h-full w-full transition-transform duration-300 absolute inset-0 object-contain">
                          <img 
                            className="absolute top-0 left-0 w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                            loading="lazy"
                            decoding="async"
                            alt={product.name}
                            src={product.images[0]}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-1">
                      <div className="uppercase m-0 p-0 opacity-100 text-[rgb(130,134,158)] font-medium text-[13px] leading-[20px] overflow-hidden line-clamp-3 transition-colors duration-300">
                        {product.name}
                      </div>
                    </div>
                  </div>
                  <div className="relative mt-1 mb-1">
                    <div className="flex items-start">
                      <div 
                        className={`m-0 p-0 border-none opacity-100 font-bold no-underline text-[13px] leading-6 overflow-hidden transition-colors duration-300
                        ${product.status === "out of stock" ? "text-[#ff0000]" : "text-[rgb(20,53,195)]"}`
                        }
                      >
                        {product.status === "out of stock" ? "Hết hàng" : `${product?.product_variants?.price?.toLocaleString()} VNĐ`}
                      </div>
                    </div>
                  </div>
                </a>
                <button 
                  type="button" 
                  onClick={() => handleProductClick(product._id)}
                  className="opacity-100 h-8 p-0 rounded-md bg-white border border-[rgb(20,53,195)] relative flex items-center justify-center outline-none min-w-[2rem] text-[rgb(20,53,195)] w-full cursor-pointer transition-colors duration-80"
                >
                  <div className="m-0 p-0 border-none border-[1px] border-transparent opacity-100 text-[rgb(20,53,195)] font-medium no-underline text-[13px] leading-[20px] overflow-hidden max-w-none min-w-0 transition-colors duration-300">
                    Xem chi tiết
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {visibleProducts < data.length && (
        <div className="flex justify-center pb-20 md:pb-0 pt-4 bg-[#F5F5F5]">
          <button 
            onClick={handleShowMore}
            className="bg-white text-blue-500 px-8 py-2 rounded-lg text-[13px] hover:underline transition duration-200"
          >
            Xem thêm sản phẩm
          </button>
        </div>
      )}
    </div>
  );
};

export default GeneralProductDown;
