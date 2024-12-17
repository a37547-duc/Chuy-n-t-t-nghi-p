/* eslint-disable react/prop-types */
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./GeneralProductMiddle.css";

const GeneralProductMiddle = ({ data }) => {
  const navigate = useNavigate();
  const [canMoveLeft, setCanMoveLeft] = useState(false);
  const [canMoveRight, setCanMoveRight] = useState(true);
  const [shiftedCount, setShiftedCount] = useState(0);
  const moveCount = 4;

  useEffect(() => {
    setCanMoveRight(data.length > moveCount && shiftedCount < Math.floor(data.length / moveCount - 1));
  }, [data, shiftedCount]);

  const handleArrowClick = (direction) => {
    let newShiftedCount = shiftedCount;

    if (direction === 'left' && shiftedCount > 0) {
      newShiftedCount -= 1;
    } else if (direction === 'right' && canMoveRight) {
      newShiftedCount += 1;
    }

    setShiftedCount(newShiftedCount);
    setCanMoveLeft(newShiftedCount > 0);
    setCanMoveRight(data.length > moveCount && newShiftedCount < Math.floor(data.length / moveCount - 1));
  };

  const handleProductClick = (productId) => {navigate(`/products/${productId}`);};

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="border-none border border-transparent opacity-100 bg-white mb-6 p-4">
      <div className="rounded-[4px] pt-0 relative min-h-[400px]">
        <img 
          className="w-full h-full top-0 absolute"
          src="https://lh3.googleusercontent.com/mlK2of-2nsmni93ObehfzO5fw0Zu55rusrnDaLP0FqCzm9LcQhs9wsG_5cCyYXsUryDzN6mM-aSBaCUYwg7U_lbF__lEUzq9=w1232"
          alt="Background"
        />
        
        <div className="justify-center relative flex items-center px-4 h-[3.5rem] bg-transparent border-b border-[rgba(255,255,255,0.5)]">
          <div className="px-2 border-none border border-transparent opacity-100 text-white font-bold text-[20px] leading-[28px] overflow-hidden transition-colors duration-300">
            Sản phẩm mới nhất
          </div>
        </div>

        <div className="p-3 relative w-full box-border">
          <div className="overflow-hidden relative h-full">
            <div 
              className={`flex flex-nowrap m-0 p-0 whitespace-nowrap h-full relative transition-transform duration-[400ms] ease-out`} 
              style={{ transform: `translateX(-${shiftedCount * 100.5}%)` }}
            >
              {data.map((product, index) => (
                <div key={index} className="h-auto mr-1 w-[calc(20%-3.5px)] flex-shrink-0 box-border whitespace-normal px-[2px]">
                  <div className="bg-white rounded h-full block">
                    <div className="relative w-full h-full p-4 flex flex-col justify-between bg-white">
                      <a 
                        className="cursor-pointer block flex flex-col justify-between h-full" 
                        onClick={() => handleProductClick(product._id)}
                        >
                        <div className="relative mb-2 flex-1">
                          <div className="relative mb-1">
                            <div className="relative pb-[100%]">
                              <div className="inline-block overflow-hidden h-full w-full transition-transform duration-300 ease-in-out absolute object-contain">
                                <img 
                                  className="w-full h-full object-contain absolute top-0 left-0 hover:scale-110 transition-transform duration-500"
                                  alt={product.name}
                                  src={product.images[0]}
                                  loading="lazy"
                                  decoding="async"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Tên sản phẩm: Giới hạn ba dòng */}
                          <div className="mb-1 line-clamp-3">
                            <div className="uppercase inline m-0 p-0 border-none text-[13px] leading-[20px] font-medium text-[#82869e] no-underline overflow-hidden transition-colors duration-300">
                              {product.name}
                            </div>
                          </div>
                        </div>

                        {/* Phần giá sản phẩm */}
                        <div className="relative mt-1 mb-1">
                          <div className="flex flex-col items-start">
                            <div 
                              className={`m-0 p-0 border-none opacity-100 font-bold no-underline text-[13px] leading-6 overflow-hidden transition-colors duration-300
                              ${product.status === "out of stock" ? "text-[#ff0000]" : "text-[rgb(20,53,195)]"
                              }`}
                            >
                              {product.status === "out of stock" ? "Hết hàng" : `${product?.product_variants?.price?.toLocaleString()} VNĐ`}
                            </div>
                          </div>
                        </div>
                      </a>
                      <button
                        type="button"
                        onClick={() => handleProductClick(product._id)}
                        className="opacity-100 h-8 p-0 rounded-md bg-white border border-[rgb(20,53,195)] relative flex items-center justify-center outline-none w-full text-[rgb(20,53,195)] cursor-pointer transition-colors duration-80"
                      >
                        <div className="m-0 p-0 border-none opacity-100 text-[rgb(20,53,195)] font-medium text-[13px] leading-[20px]">
                          Xem chi tiết
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Nút điều hướng */}
            <button 
              className={`arrow left-0 rounded-tr-[100px] rounded-br-[100px]`} 
              onClick={() => handleArrowClick('left')}
              disabled={!canMoveLeft}
            >
              <FaChevronLeft className={`w-[24px] h-[24px] ${canMoveLeft ? 'opacity-100' : 'opacity-25 cursor-not-allowed'}`} />
            </button>
            <button 
              className={`arrow right-0 rounded-tl-[100px] rounded-bl-[100px]`} 
              onClick={() => handleArrowClick('right')}
              disabled={!canMoveRight}
            >
              <FaChevronRight className={`h-[24px] w-[24px] ${canMoveRight ? 'opacity-100' : 'opacity-25 cursor-not-allowed'}`}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GeneralProductMiddle;
