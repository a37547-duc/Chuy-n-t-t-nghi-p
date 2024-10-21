const DescriptionProduct = () => {
  
  const handleScrollToMiddle = () => {
    const element = document.getElementById("product-detail-middle");
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div>
      <div className='p-4 text-[14px] text-[#333]'>
        - CPU: Intel Core i5-13400 (2.5 GHz - 4.6 GHz/20MB/10 nhân, 16 luồng)
        <br />
        - RAM: 1 x 8GB DDR4 3200MHz (2 Khe cắm, Hỗ trợ tối đa 64GB)
        <br />
        - Đồ họa: Intel UHD Graphics 730
        <br />
        - Lưu trữ: 256GB M.2 NVMe SSD/1TB HDD 7200RPM
        <br />
        - Bàn phím + Chuột
      </div>

      <a href="#" onClick={(e) => { e.preventDefault(); handleScrollToMiddle(); }} className='cursor-pointer text-[#1990FF] text-[13px]'>
        <div>
          Xem thông tin chi tiết
        </div>
      </a>
    </div>
  );
}

export default DescriptionProduct;