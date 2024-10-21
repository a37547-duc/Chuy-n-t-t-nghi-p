/* eslint-disable react/prop-types */
import { useState } from 'react';

const ShowImageMobile = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0); // Thêm trạng thái activeIndex

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1)); // Cập nhật activeIndex
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1)); // Cập nhật activeIndex
  };

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    setActiveIndex(index); // Cập nhật activeIndex khi bấm vào thumbnail
  };

  return (
    <div className="mt-2 relative">
      <div className="mb-2 block">
        <div className="flex items-center justify-center border border-gray-300 rounded-[15px] m-0 mb-2.5 max-h-[220px] w-full relative z-10 overflow-hidden">
          <div
            className="box-content flex relative w-full h-full transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((img, index) => (
              <div
                key={index}
                className="w-full flex justify-center items-center bg-gradient-to-r from-[#dd5e89] to-[#f7bb97] border-0 rounded-[5px] overflow-hidden h-full flex-shrink-0"
              >
                <img
                  className="object-contain h-full max-h-[220px] w-full"
                  src={img}
                  alt={`Slide ${index}`}
                />
              </div>
            ))}
          </div>
          <button onClick={handlePrev} className="z-20 absolute left-2 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-1 shadow">
            Prev
          </button>
          <button onClick={handleNext} className="z-20 absolute right-2 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-1 shadow">
            Next
          </button>
        </div>
        
        <div className="w-full list-none mx-auto overflow-hidden p-0 relative z-10 block">
          <div className="transform transition-[transform] duration-0 p-0.5 mx-auto ease-out box-content flex h-full relative w-full z-10">
            {images.map((img, index) => (
              <div
                key={index}
                className={`bg-white rounded-[0.5rem] mr-2.5 cursor-pointer h-[50px] overflow-hidden w-[50px] flex-shrink-0 relative transition-transform ${
                  activeIndex === index
                    ? 'shadow-[0_0_0_1px_#d70018]' // Viền rõ hơn khi active
                    : 'shadow-[0_0_0_1px_#d1d5db]' // Viền nhạt hơn khi không active
                }`}
                onClick={() => handleThumbnailClick(index)} // Xử lý sự kiện click
              >
                <img
                  className="cursor-pointer h-full w-full"
                  src={img}
                  alt={`Thumbnail ${index}`}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='my-3 py-3'>
          <div className='dashs border-t border-dashed border-[#E4E5F0] w-full'></div>
      </div>
      </div>
    </div>
  );
};

export default ShowImageMobile;
