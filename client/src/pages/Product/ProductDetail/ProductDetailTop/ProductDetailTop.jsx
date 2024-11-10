/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShowImageComputer from './ShowImageComputer/ShowImageComputer';
import ShowImageMobile from './ShowImageMobile/ShowImageMobile';
import DescriptionProduct from './DescriptionProduct/DescriptionProduct';
import OverviewProduct from './OverviewProduct/OverviewProduct';
import PromotionProduct from './PromotionProduct/PromotionProduct';
import ButtonBuyProduct from './ButtonBuyProduct/BottonBuyProduct';

const ProductDetailTop = ({ product, onVariantChange }) => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 540);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  // Function to check screen size on resize
  const handleResize = () => {
    setIsMobileView(window.innerWidth <= 768);
  };

  useEffect(() => {
    // Add event listener to handle window resize
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    onVariantChange(selectedVariant); // Đẩy variant được chọn ra ngoài khi khởi tạo
  }, [selectedVariant]);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    onVariantChange(variant); // Gọi callback để cập nhật variant khi thay đổi
  };

  return (
    <div className="flex flex-col md:flex-row justify-center mx-auto">
      <div className="flex w-full max-w-[1100px] h-420px flex-nowrap md:my-6 md:p-6 bg-white rounded md:flex-row flex-col">
        <div className="w-full md:w-[40%] flex-shrink-0 pl-[5px]">
          {isMobileView ? <ShowImageMobile images={product.product.images} /> : <ShowImageComputer images={product.product.images} />}
          {/* Render OverviewProduct ở trên DescriptionProduct khi dưới 540px */}
          {isMobileView ? <OverviewProduct product={product} /> : <DescriptionProduct data={selectedVariant}/>}
        </div>

        <div className="w-full md:w-[60%] flex-grow min-w-0 h-full overflow-hidden px-2 pb-2 z-10">
          {/* Render DescriptionProduct ở trên OverviewProduct khi dưới 540px */}
          {isMobileView ? (
            <>
              <DescriptionProduct data={selectedVariant}/>
              <PromotionProduct />
              <ButtonBuyProduct />
            </>
          ) : (
            <>
              <OverviewProduct data={product} onVariantChange={handleVariantChange}/>
              <PromotionProduct />
              <ButtonBuyProduct />
            </>
          )}
        </div>
      </div>
      <ToastContainer 
        position="top-right" 
        autoClose={2000} 
        hideProgressBar={false} 
        newestOnTop={true} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss={false} 
        draggable 
        pauseOnHover={false} 
      />
    </div>
  );
}

export default ProductDetailTop;
