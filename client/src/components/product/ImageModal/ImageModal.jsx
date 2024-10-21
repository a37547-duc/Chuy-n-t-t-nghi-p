/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faExpand, faCompress, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const ImageModal = ({ isOpen, onClose, images, currentImage, setCurrentImage }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const modalRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslateX, setCurrentTranslateX] = useState(0);
  
  const currentIndex = images.indexOf(currentImage);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 540);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

  useEffect(() => {
    let timeout;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 5000);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (event.key === 'ArrowRight') {
        handleNextImage();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, currentIndex]);

  const handleFullScreenToggle = () => {
    if (!isFullScreen) {
      if (modalRef.current.requestFullscreen) {
        modalRef.current.requestFullscreen();
      } else if (modalRef.current.webkitRequestFullscreen) {
        modalRef.current.webkitRequestFullscreen();
      } else if (modalRef.current.msRequestFullscreen) {
        modalRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };

  const handlePrevImage = () => {
    if (currentIndex > 0) {
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      setCurrentImage(images[prevIndex]);
    }
  };

  const handleNextImage = () => {
    if (currentIndex < images.length - 1) {
      const nextIndex = (currentIndex + 1) % images.length;
      setCurrentImage(images[nextIndex]);
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const distance = e.clientX - startX; // Tính khoảng cách kéo
    setCurrentTranslateX(distance); // Cập nhật vị trí hiện tại của ảnh
  };

  const handleMouseUp = () => {
    if (isDragging) {
      const threshold = 100; // Ngưỡng để chuyển đổi hình ảnh
      if (currentTranslateX < -threshold) {
        handleNextImage(); // Chuyển đến ảnh tiếp theo
      } else if (currentTranslateX > threshold) {
        handlePrevImage(); // Chuyển đến ảnh trước đó
      }
      setCurrentTranslateX(0); // Đặt lại vị trí hiện tại
    }
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    // Đặt lại trạng thái kéo khi chuột rời khỏi modal
    setIsDragging(false);
    setCurrentTranslateX(0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999]" ref={modalRef}>
      <div 
        className="flex flex-col opacity-100 overflow-hidden relative w-full h-full bg-black"
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => {
          setIsHovered(false);
          handleMouseLeave(); // Gọi hàm khi chuột rời khỏi modal
        }}
        onMouseDown={handleMouseDown} 
        onMouseUp={handleMouseUp} 
        onMouseMove={handleMouseMove} 
      >
        <div className={`bg-[rgba(0,0,0,0.45)] w-full h-[50px] absolute left-4 right-4 flex justify-between items-center transition-transform duration-300 ${showControls ? 'translate-y-0' : '-translate-y-full'} z-10`}>
          <span className="text-white">
            {currentIndex + 1} / {images.length}
          </span>
          <div className="flex">
            <button 
              onClick={handleFullScreenToggle} 
              className="h-[50px] w-[50px] text-white opacity-50 hover:opacity-100 hover:text-white transition-opacity duration-400">
              <FontAwesomeIcon icon={isFullScreen ? faCompress : faExpand} className="h-[40%] w-[40%]" />
            </button>
            <button 
              onClick={onClose} 
              className="mr-4 h-[50px] w-[50px] text-white opacity-50 hover:opacity-100 hover:text-white transition-opacity duration-400">
              <FontAwesomeIcon icon={faTimes} className="h-[50%] w-[50%]" />
            </button>
          </div>
        </div>

        <div className="relative flex h-full w-full overflow-hidden">
          <button 
            onClick={handlePrevImage} 
            className={`absolute left-5 top-1/2 transform -translate-y-1/2 z-20 bg-black ${currentIndex === 0 ? 'opacity-25 cursor-not-allowed' : 'opacity-50 hover:opacity-100'} p-2 rounded-full transition-transform duration-300 ${showControls || isHovered ? 'translate-x-0' : '-translate-x-20'}`}
            disabled={currentIndex === 0} 
          >
            <FontAwesomeIcon icon={faChevronLeft} className="w-[25px] h-[25px] text-white" />
          </button>

          <div
            className={`flex transition-transform duration-500 ease-in-out`}
            style={{ transform: `translateX(calc(-${currentIndex * 100}% + ${currentTranslateX}px))` }} // Cập nhật transform
          >
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Main"
                className="object-contain p-4 h-full w-full flex-shrink-0"
              />
            ))}
          </div>

          <button 
            onClick={handleNextImage} 
            className={`absolute right-5 top-1/2 transform -translate-y-1/2 z-20 bg-black ${currentIndex === images.length - 1 ? 'opacity-25 cursor-not-allowed' : 'opacity-50 hover:opacity-100'} p-2 rounded-full transition-transform duration-300 ${showControls || isHovered ? 'translate-x-0' : 'translate-x-20'}`}
            disabled={currentIndex === images.length - 1} 
          >
            <FontAwesomeIcon icon={faChevronRight} className="w-[25px] h-[25px] text-white" />
          </button>
        </div>

        {!isMobile && (
          <div className={`h-[100px] bg-[rgba(0,0,0,0.45)] bottom-4 w-full flex overflow-x-auto p-2 space-x-2 justify-center transition-transform duration-300 ${showControls ? 'translate-y-0' : 'translate-y-full'}`}>
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`w-[50px] h-[50px] cursor-pointer object-cover ${currentImage === image ? 'border-2 border-blue-500 opacity-100' : 'opacity-50'}`}
                onClick={() => setCurrentImage(image)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageModal;
