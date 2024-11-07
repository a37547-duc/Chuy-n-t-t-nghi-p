/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

const OverviewProduct = ({ data, onVariantChange }) => {
  const initialVariant = data.variants.find(variant => variant.stock_quantity > 1) || data.variants[0];

  const [selectedCpu, setSelectedCpu] = useState(initialVariant._id);
  const [selectedPrice, setSelectedPrice] = useState(initialVariant.price);
  const [selectedColor, setSelectedColor] = useState(initialVariant.color);

  useEffect(() => {
    // Cập nhật variant ra bên ngoài mỗi khi variant được chọn thay đổi
    const selectedVariant = data.variants.find(variant => variant._id === selectedCpu);
    if (selectedVariant) onVariantChange(selectedVariant);
  }, [selectedCpu, data.variants, onVariantChange]);

  const handleCpuChange = (variant) => {
    setSelectedCpu(variant._id);
    setSelectedPrice(variant.price);
    setSelectedColor(variant.color);
  };

  return (
    <div>
      <div>
        <h1 className='mb-2 text-[24px] font-bold leading-tight text-[#333]'>{data.product.name}</h1>
        <div className='text-[14px] mt-[-4px] text-[#82869E]'>
          Thương hiệu:
          <a 
            href='#'
            className='cursor-pointer'>
            <span className='text-blue-700 font-bold uppercase'> {data.product.brand.name}</span>
          </a>
          <span className='mx-2'>|</span>
          SKU: 0123456789
        </div>
      </div>

      <div className='my-4'>
        <div className='text-[12px] text-[#82869E] uppercase font-medium'>
          CPU Laptop (Filter)
        </div>
        <div className='flex flex-wrap mt-[8px]'>
          {data.variants.map((variant) => (
            <a
              key={variant._id}
              onClick={() => variant.stock_quantity > 1 && handleCpuChange(variant)}  // Chỉ gọi handleCpuChange nếu stock_quantity > 1
              className={`px-4 py-2 rounded-md border-2 text-[12px] mr-2 mb-2 cursor-pointer text-center w-[130px] overflow-hidden whitespace-nowrap truncate
                ${selectedCpu === variant._id 
                  ? 'border-blue-500 text-blue-500'  // Phần tử được chọn
                  : 'border-gray-300 text-gray-500'   // Phần tử chưa chọn
                }
                ${variant.stock_quantity <= 1 ? 'cursor-not-allowed opacity-50' : ''}  // Vô hiệu hóa bấm và giảm độ sáng khi stock_quantity <= 1
              `}
            >
              {variant.ram.capacity}
              <br />
              {variant.cpu.name}
              <br />
              {variant.gpu.name}
            </a>
          ))}
        </div>
      </div>

      <div className='my-4'>
        <div className='text-[12px] text-[#82869E] uppercase font-medium'>
          Màu sắc Laptop (Filter)
        </div>
        <div className='flex mt-[8px] '>
          <a className='px-4 py-2 rounded-md border-2 border-blue-500 text-[12px] text-blue-500 mr-2 mb-2'>
            {selectedColor}
          </a>
        </div>
      </div>

      <div className='flex-column mb-3'>
        <div className='text-blue-700 font-bold text-[20px]'>
          {selectedPrice.toLocaleString()}đ {/* Hiển thị giá của variant đã chọn */}
        </div>
        <div className='text-[12px] flex'>
          <div className='mr-1 text-[#82869E] line-through'>
            {(selectedPrice * 1.2).toLocaleString()}đ {/* Giả định giá cũ là giá hiện tại * 1.2 */}
          </div>
          <div className='text-blue-500'>
            {(((selectedPrice - (selectedPrice * 1.2)) / (selectedPrice * 1.2)) * 100).toFixed(2)}% {/* Giảm giá */}
          </div>
        </div>
      </div>

      <div className='py-3'>
        <div className='dashs border-t border-dashed border-[#ddd] w-full'></div>
      </div>
    </div>
  );
}

export default OverviewProduct;
