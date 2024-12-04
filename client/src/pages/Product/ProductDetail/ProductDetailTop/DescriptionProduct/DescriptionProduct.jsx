/* eslint-disable react/prop-types */

const DescriptionProduct = ({data}) => {
  // console.log("Data: ", data);
  
  const handleScrollToMiddle = () => {
    const element = document.getElementById("product-detail-middle");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div>
      {data && (
        <div className='p-4 text-[14px] text-[#333]'>
          - CPU: {data?.cpu?.name}
          <br />
          - RAM: {data?.ram?.capacity}
          <br />
          - GPU: {data?.gpu?.name}
          <br />
          - Màu: {data?.color}
          <br />
          - Core: {data?.cpu?.cores}
          <br />
          - Giá: {data?.price}
        </div>
      )}

      <a href="#" onClick={(e) => { e.preventDefault(); handleScrollToMiddle(); }} className='cursor-pointer text-[#1990FF] text-[13px]'>
        <div>
          Xem thông tin chi tiết
        </div>
      </a>
    </div>
  );
}

export default DescriptionProduct;