/* eslint-disable react/prop-types */
import { useState } from "react";
import ImageModal from "../../../../../components/product/ImageModal/ImageModal";

const ShowImageComputer = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(mainImage);

  // Lấy ra tối đa 5 ảnh đầu tiên
  const displayedImages = images.slice(0, 6);
  // Tính số ảnh không hiển thị
  const remainingImagesCount = images.length - displayedImages.length;

  const openModalWithImage = (image) => {
    setCurrentImage(image);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="main-image mb-[10px] justify-center items-center flex">
        <img src={mainImage} alt="Main" className="w-[320px] h-[320px]" />
      </div>

      <div className="thumbnail-gallery flex justify-center space-x-2">
        {displayedImages.map((image, index) => (
          <div
            key={index}
            className={`thumbnail cursor-pointer h-[50px] w-[50px] relative ${index === 5 && remainingImagesCount > 0 ? 'opacity-50' : ''}`}
            onMouseEnter={() => setMainImage(image)}
            onClick={() => openModalWithImage(image)}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
            {index === 5 && remainingImagesCount > 0 && (
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xs">
                +{remainingImagesCount}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className='my-3 py-3'>
          <div className='dashs border-t border-dashed border-[#E4E5F0] w-full'></div>
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={images}
        currentImage={currentImage}
        setCurrentImage={setCurrentImage}
      />
    </div>
  );
}

export default ShowImageComputer;