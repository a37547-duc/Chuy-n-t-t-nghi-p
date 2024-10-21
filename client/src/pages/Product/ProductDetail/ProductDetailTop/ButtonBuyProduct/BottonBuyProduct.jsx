import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ButtonBuyProduct = () => {
  const [isApplied, setIsApplied] = useState(false);

  const handleClickAddProductToCart = () => {
    setIsApplied(true);
    toast.success('Thêm vào giỏ hàng thành công', {className:'mt-20 text-[15px]'});
  }

  return (
    <div className='flex gap-2 mt-4'>
      <div className='flex-grow flex-shrink basis-0'>
        <button className='h-[50px] bg-blue-600 cursor-pointer w-full text-white font-bold rounded hover:bg-blue-700'> Mua ngay</button>
      </div>
      <div 
        className='flex-grow flex-shrink basis-0'
        onClick={handleClickAddProductToCart}
      >
        <button className='h-[50px] bg-white cursor-pointer w-full border border-blue-700 rounded text-blue-700 font-bold'>
          <FontAwesomeIcon icon={faCartPlus} />
          Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  );
}

export default ButtonBuyProduct;