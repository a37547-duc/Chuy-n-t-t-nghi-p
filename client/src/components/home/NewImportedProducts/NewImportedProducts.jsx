/* eslint-disable react/prop-types */
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./NewImportedProducts.css";

const NewImportedProducts = ({ data, itemsPerPage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleArrowClick = (direction) => {
    setCurrentIndex(prevIndex => {
      return direction === 'left' ? Math.max(0, prevIndex - 1) : Math.min(totalPages - 1, prevIndex + 1);
    });
  };

  const handleProductClick = (productId) => {navigate(`/products/${productId}`);};

  // Tính toán giá trị translateX
  const translateX = currentIndex * -100; // Mỗi sản phẩm chiếm 100% chiều rộng

  return (
    <div className="p-3 relative w-full box-border text-[#333333]">
      <div className="overflow-hidden relative h-full">
      <div
        id="slider"
        className={`flex flex-nowrap m-0 p-0 whitespace-nowrap h-full relative transition-transform duration-[400ms] ease-out`}
        style={{ transform: `translateX(${translateX}%)` }}
      >
        {data.map((product, index) => (
          <div key={index} className="h-auto mr-1 productNewImport flex-shrink-0 box-border whitespace-normal">
            <div className="bg-white rounded-md h-full block">
              <div className="relative w-full h-full p-4 flex flex-col bg-white justify-between">
                <a
                  className="no-underline text-inherit cursor-pointer block h-full flex flex-col justify-between"
                  onClick={() => handleProductClick(product._id)}
                >
                  <div className="mb-2 relative flex-1">
                    <div className="mb-1 relative">
                      <div className="relative pb-[100%]">
                        <div className="inline-block overflow-hidden h-full w-full transition-transform duration-300 absolute inset-0 object-contain flex justify-center items-center">
                          <img
                            className="w-[90%] h-full object-contain hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                            decoding="async"
                            src={product.images[0]}
                            alt={product.name}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-1">
                      <div className="uppercase m-0 p-0 opacity-100 text-[rgb(130,134,158)] font-medium text-[13px] leading-[20px] overflow-hidden block transition-colors duration-300">
                        {product.name}
                      </div>
                    </div>
                  </div>
                  <div className="relative mt-1 mb-1">
                    <div className="flex items-start">
                      <div className="m-0 p-0 opacity-100 text-[rgb(20,53,195)] font-bold text-[15px] leading-6 overflow-hidden block transition-colors duration-300">
                        {product.price} đ
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
          </div>
        ))}
      </div>
        <button
          className={`arrow left-0 rounded-tr-[100px] rounded-br-[100px]`}
          onClick={() => handleArrowClick('left')}
          disabled={currentIndex === 0}
        >
          <FaChevronLeft className={`w-[24px] h-[24px] ${currentIndex === 0 ? 'opacity-25 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`} />
        </button>
        <button
          className={`arrow right-0 rounded-tl-[100px] rounded-bl-[100px]`}
          onClick={() => handleArrowClick('right')}
          disabled={currentIndex >= totalPages - 1}
        >
          <FaChevronRight className={`w-[24px] h-[24px] ${currentIndex >= totalPages - 1 ? 'opacity-25 cursor-not-allowed' : 'opacity-100 cursor-pointer'}`} />
        </button>
      </div>
    </div>
  );
}

export default NewImportedProducts;
