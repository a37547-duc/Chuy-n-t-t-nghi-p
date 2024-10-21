import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const PromotionProduct = () => {
  const [isApplied, setIsApplied] = useState(false);

  const handlePromotionClick = () => {
    if (isApplied) {
      setIsApplied(false);
      toast.info('Bỏ áp dụng khuyến mãi thành công', {className:'mt-20 text-[15px]'});
    } else {
      setIsApplied(true);
      toast.success('Áp dụng khuyến mãi thành công', {className:'mt-20 text-[15px]'});
    }  
  };

  return (
    <div className='bg-[#F5F5F5] p-4 mt-4 rounded-md' style={{border: "1.5px solid rgb(228, 229, 240)"}}>
      <div className='text-[#82869e] text-[14px] uppercase mb-1 '>
        <strong className='font-medium'>
          Chọn một trong những khuyến mãi
        </strong>
      </div>

      <div
        className={`w-full flex flex-row gap-0 justify-start items-start opacity-100 box-border mt-2.5 p-3 w-full rounded-lg cursor-pointer relative overflow-hidden ${isApplied ? 'bg-[#F5F5F5] border-2 border-blue-500' : 'bg-white border border-gray-200'}`}
        onClick={handlePromotionClick}
      >
        <div className='min-w-[64px] h-[64px] w-[64px] flex justify-center items-center mr-[12px] rounded bg-[#E8EBF9]'>
          <FontAwesomeIcon className='text-red-500 text-[24px]' icon={faGift} />
        </div>

        <div className='w-full flex-grow flex-shrink basis-0 border-0 border-[1px] border-transparent opacity-100 h-full flex flex-col gap-0 justify-between items-baseline'>
          <div className='max-w-full text-[13px] font-medium leading-[20px] overflow-hidden text-[#434657] whitespace-pre-line'>
            Giảm 3đ (áp dụng vào giá sản phẩm)
          </div>
          <div className='max-w-full mt-1 text-[12px] leading-[16px] text-[#848788] overflow-hidden whitespace-pre-line'>
            Khuyến mãi áp dụng khi mua tối thiểu một sản phẩm 
          </div>
          <div className='border-none border border-gray-200 opacity-100 w-full mt-2 flex flex-row gap-0 justify-between items-baseline'>
            <div className='text-xs leading-4 text-gray-500'>
              HSD: 15/15/1515
            </div>
            <div className='text-[13px] leading-5 text-[#1990FF]'>
              {isApplied ? 'Bỏ chọn' : 'Áp dụng'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromotionProduct;