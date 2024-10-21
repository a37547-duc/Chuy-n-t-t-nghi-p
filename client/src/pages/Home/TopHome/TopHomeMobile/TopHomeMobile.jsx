/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";

const TopHomeMobile = () => {
  const imgAdvertisement = [
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/sliding-home-iphone-16-pro-km-moi.jpg",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/dien-thoai-samsung-galaxy-s24-fe-home-27-9-2024.png",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/xiaomi-14T-series-home-mo-ban.jpg",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/Sliding-airpod-4.jpg",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/watch-gt-5-series-03-10-home-new-new.jpg",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/tecno-spark-go-1-home.jpg",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/tai-nghe-sony-wf-c510-home.jpg",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/thu-cu-banner-390-home.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0); // Lưu vị trí dịch chuyển hiện tại
  const intervalRef = useRef(null);
  const startTouchXRef = useRef(0); // Lưu vị trí bắt đầu khi chạm
  const isDraggingRef = useRef(false); // Kiểm tra xem có đang kéo không

  const startAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current); // Xóa interval hiện tại nếu có
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imgAdvertisement.length);
    }, 5000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [imgAdvertisement.length]);

  const handleDotClick = (index) => {
    setCurrentIndex(index); // Cập nhật currentIndex khi nhấn vào chấm
    setTranslateX(0); // Reset dịch chuyển khi nhấn vào dot
    startAutoSlide(); // Đặt lại interval khi người dùng nhấn vào chấm
  };

  // Hàm xử lý khi người dùng bắt đầu chạm
  const handleTouchStart = (e) => {
    e.preventDefault();
    startTouchXRef.current = e.touches[0].clientX; // Lưu lại vị trí chạm ban đầu
    isDraggingRef.current = true; // Đánh dấu là đang kéo
    clearInterval(intervalRef.current); // Dừng auto slide khi bắt đầu kéo
  };

  // Hàm xử lý khi người dùng di chuyển ngón tay
  const handleTouchMove = (e) => {
    if (isDraggingRef.current) {
      const touchCurrentX = e.touches[0].clientX;
      const deltaX = touchCurrentX - startTouchXRef.current; // Tính khoảng cách kéo
      setTranslateX(deltaX); // Cập nhật vị trí dịch chuyển
    }
  };

  // Hàm xử lý khi người dùng kết thúc chạm (thả ngón tay)
  const handleTouchEnd = () => {
    isDraggingRef.current = false; // Không còn kéo nữa
    const threshold = 100; // Đặt ngưỡng kéo để chuyển ảnh (100px)

    if (translateX > threshold) {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? imgAdvertisement.length - 1 : prevIndex - 1)); // Kéo sang phải -> chuyển về ảnh trước
    } else if (translateX < -threshold) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imgAdvertisement.length); // Kéo sang trái -> chuyển sang ảnh tiếp theo
    }

    setTranslateX(0); // Đặt lại dịch chuyển về 0
    startAutoSlide(); // Đặt lại auto slide sau khi kết thúc kéo
  };

  // Mouse event handlers
  const handleMouseDown = (e) => {
    e.preventDefault(); // Prevent default dragging behavior
    startTouchXRef.current = e.clientX;
    isDraggingRef.current = true;
    clearInterval(intervalRef.current);
  };

  const handleMouseMove = (e) => {
    if (isDraggingRef.current) {
      const mouseCurrentX = e.clientX;
      const deltaX = mouseCurrentX - startTouchXRef.current;
      setTranslateX(deltaX);
    }
  };
  
  const handleMouseUp = () => {
    isDraggingRef.current = false;
    const threshold = 100; // Threshold to switch images
    if (translateX > threshold) {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? imgAdvertisement.length - 1 : prevIndex - 1));
    } else if (translateX < -threshold) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imgAdvertisement.length);
    }
    setTranslateX(0);
    startAutoSlide();
  };

  return (
    <div className="w-full px-[10px] pt-[10px]">
      <div 
        className="h-auto overflow-hidden"
        onTouchStart={handleTouchStart} // Bắt đầu chạm
        onTouchMove={handleTouchMove} // Di chuyển ngón tay
        onTouchEnd={handleTouchEnd} // Thả ngón tay trên điện thoại
        onMouseDown={handleMouseDown} // Mouse down
        onMouseMove={handleMouseMove} // Mouse move
        onMouseUp={handleMouseUp} // Mouse up dùng trên máy tính để test
      >
        <div className="rounded-[10px] shadow-[0_1px_2px_0_rgba(60,64,67,0.1),_0_2px_6px_2px_rgba(60,64,67,0.15)] w-full list-none mx-auto overflow-hidden p-0 relative z-[1]">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(calc(-${currentIndex * 100}% + ${translateX}px))`, // Dịch chuyển dựa vào vị trí kéo
            }} // Dịch chuyển dựa vào currentIndex
          >
            {imgAdvertisement.map((img, index) => (
              <div key={index} className="flex-shrink-0 w-full h-full relative items-center bg-white transition-transform">
                <a className="flex h-auto w-full items-center text-[#485fc7] cursor-pointer">
                  <img 
                    className="w-full h-auto max-w-full"
                    src={img}
                    loading="lazy"
                    alt={`Advertisement ${index + 1}`}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
        <div 
          className="block leading-[1.5] my-[5px] min-h-[24px] static text-center transition-opacity duration-300" 
          style={{ transform: "translateZ(0)" }}>
          {imgAdvertisement.map((_, index) => (
            <span 
              key={index} 
              onClick={() => handleDotClick(index)} // Thêm sự kiện onClick để cập nhật currentIndex
              className={`mx-[4px] opacity-100 transition-all duration-300 cursor-pointer inline-block h-[8px] font-inherit font-normal text-center 
              ${currentIndex === index ? "bg-[#d70018] rounded-[50px] w-[20px]" : "bg-gray-400 rounded-full w-[8px]"}`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopHomeMobile;
