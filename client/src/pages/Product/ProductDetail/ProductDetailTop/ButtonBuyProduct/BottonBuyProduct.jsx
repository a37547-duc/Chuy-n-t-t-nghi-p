/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { addItemToCart } from '../../../../../features/cart/cartSlice';

const ButtonBuyProduct = ({ product, variant }) => {
  const dispatch = useDispatch();
  
  // Kiểm tra nếu không có variant
  const isVariantAvailable = variant !== undefined;

  const handleClickAddProductToCart = () => {
    const data = {
      name: product.product?.name,
      description: product.product?.description,
      image: product.product?.images[0],
      ...variant,
    };
    dispatch(addItemToCart({ ...data, quantity: 1 }));
  };

  // Hàm mở Facebook khi bấm nút "Liên hệ chúng tôi"
  const handleContactUs = () => {
    window.open('https://www.facebook.com', '_blank'); // Thay đổi URL nếu cần
  };

  return (
    <div className='flex gap-2 mt-4'>
      {/* Kiểm tra variant */}
      {isVariantAvailable ? (
        <>
          <div
        className='flex-grow flex-shrink basis-0'
        onClick={() => {
          handleClickAddProductToCart();
          window.location.href = "/cart";
        }}
      >
            <button 
          className='h-[50px] bg-blue-600 cursor-pointer w-full text-white font-bold rounded hover:bg-blue-700'>
              Mua ngay
            </button>
          </div>
          <div 
            className='flex-grow flex-shrink basis-0'
            onClick={handleClickAddProductToCart}
          >
            <button className='h-[50px] bg-white cursor-pointer w-full border border-blue-700 rounded text-blue-700 font-bold flex items-center justify-center gap-2'>
              <FontAwesomeIcon icon={faCartPlus} />
              Thêm vào giỏ hàng
            </button>
          </div>
        </>
      ) : (
        <div className='flex-grow flex-shrink basis-0'>
          <button 
            onClick={handleContactUs}
            className='h-[50px] bg-blue-600 cursor-pointer w-full text-white font-bold rounded hover:bg-blue-700'
          >
            Liên hệ chúng tôi
          </button>
        </div>
      )}
    </div>
  );
};

export default ButtonBuyProduct;
