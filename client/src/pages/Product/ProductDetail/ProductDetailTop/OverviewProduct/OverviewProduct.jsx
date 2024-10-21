/* eslint-disable react/prop-types */
const OverviewProduct = ({product}) => {
  return (
    <div>
      <div>
        <h1 className='mb-2 text-[24px] font-bold leading-tight text-[#333]'>{product.name}</h1>
        <div className='text-[14px] mt-[-4px] text-[#82869E]'>
          Thương hiệu:
          <a 
            href='#'
            className='cursor-pointer'>
            <span className='text-blue-700 font-bold uppercase'> {product.brand.name}</span>
          </a>
          <span className='mx-2'>|</span>
          SKU: 0123456789
        </div>
      </div>
      <div className='my-4'>
        <div className='text-[12px] text-[#82869E] uppercase font-medium'>
          Màu sắc Laptop(Filter)
        </div>
        <div className='flex mt-[8px] '>
          <a className='px-4 py-2 rounded-md border-2 border-blue-500 text-[12px] text-blue-500 mr-2 mb-2'>
            Xanh
          </a>
        </div>
      </div>
      <div className='flex-column mb-3'>
        <div className='text-blue-700 font-bold text-[20px]'>
          10.000.000đ
        </div>
        <div className='text-[12px] flex'>
          <div className='mr-1 text-[#82869E] line-through'>
            12.990.000đ
          </div>
          <div className='text-blue-500'>
            -16.936%
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