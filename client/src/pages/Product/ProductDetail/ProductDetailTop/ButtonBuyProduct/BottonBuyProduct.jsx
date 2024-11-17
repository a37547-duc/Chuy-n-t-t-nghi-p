import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { addItemToCart } from '../../../../../features/cart/cartSlice';

const ButtonBuyProduct = ({ product, variant }) => {
  const dispatch = useDispatch();
  console.log(product)
  const handleClickAddProductToCart = () => {
    const data = {
      name: product.product?.name,
      description: product.product?.description,
      image: product.product?.images[0],
      ...variant,
    }
    console.log(data);
    dispatch(addItemToCart({...data, quantity: 1}));
  };

  return (
    <div className='flex gap-2 mt-4'>
      <div className='flex-grow flex-shrink basis-0'>
        <button className='h-[50px] bg-blue-600 cursor-pointer w-full text-white font-bold rounded hover:bg-blue-700'>
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
    </div>
  );
};

export default ButtonBuyProduct;
