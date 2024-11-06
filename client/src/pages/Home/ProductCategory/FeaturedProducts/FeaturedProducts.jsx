import { useState, useRef, useEffect } from "react";
import "./FeaturedProducts.css";
import ReactPaginate from "react-paginate";

import { PiCaretRight } from "react-icons/pi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import MobileFeatured from "./MobileFeatured/MobileFeatured";
import ComputerFeatured from "./ComputerFeatured/ConputerFeatured";

const FeaturedProducts = () => {
  const [page, setPage] = useState(0);
  const [productsPerPage] = useState(10);
  const [products, setProducts] = useState([]);
  
  // Trạng thái để xác định màn hình nhỏ
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 540);
  
  // Trạng thái để quản lý số lượng sản phẩm hiển thị trên màn hình nhỏ
  const [visibleProducts, setVisibleProducts] = useState(10);

  const highlightRef = useRef(null);

  useEffect(() => {
    fetch('https://laptech4k.onrender.com/api/v1/products', { credentials: "include" })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Kiểm tra xem dữ liệu có tồn tại và có cấu trúc mong muốn không
        if (data.mice || data.laptops) {
          const combinedProducts = [
            ...(data.mice || []),   // Lấy danh sách chuột
            ...(data.laptops || []) // Lấy danh sách laptop
          ];
          setProducts(combinedProducts); // Gán sản phẩm đã gộp
        } else {
          console.warn('No products found in the response.');
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

 

  // Cập nhật trạng thái màn hình khi kích thước cửa sổ thay đổi
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 540);
    };

    window.addEventListener('resize', handleResize);
    
    // Xóa listener khi component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  
  const handlePageClick = (data) => {
    setPage(data.selected);
    // Cuộn lên phần tử "Sản phẩm nổi bật"
    highlightRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const indexOfLastProduct = (page + 1) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Logic cho màn hình nhỏ (xem thêm sản phẩm)
  const handleShowMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 10); // Mỗi lần bấm tăng thêm 10 sản phẩm
  };

  const currentVisibleProducts = products.slice(0, visibleProducts);

  return (
    <div className="px-4 w-full mx-auto border-none opacity-100 max-w-[1100px] mb-6">
      <div className="rounded-md bg-white">
        <div className="relative flex justify-between items-center px-4 h-14 bg-transparent">
          <a 
            ref={highlightRef} 
            href="#" 
            className="scroll no-underline text-inherit cursor-pointer"
          >
            <div className="m-0 p-0 border-none opacity-100 text-[#1b1d29] font-bold no-underline text-[20px] leading-7 overflow-hidden transition-colors duration-300">
              Sản phẩm nổi bật
            </div>
          </a>
          <a href="#" className="no-underline text-inherit cursor-pointer">
            <div className="cursor-pointer box-border flex items-center text-[14px] text-[#82869e]">
              Xem tất cả
              <PiCaretRight className="w-[1em] h-[1em]" />
            </div>
          </a>
        </div>
        
        {!isMobile ? (
          // Hiển thị sản phẩm với phân trang trên màn hình lớn
          <ComputerFeatured currentProducts={currentProducts} />
        ) : (
          // Hiển thị sản phẩm với "Xem thêm" trên màn hình nhỏ
          <MobileFeatured currentVisibleProducts={currentVisibleProducts} />
        )}
      </div>

      {/* Hiển thị phân trang hoặc nút "Xem thêm" tùy vào kích thước màn hình */}
      <div className="border-none border border-transparent opacity-100 mt-4">
        <div className="border-0 border-opacity-100 w-full text-center">
          <div className="inline-flex">
            {!isMobile ? (
              // Phân trang trên màn hình lớn
              <ReactPaginate
                previousLabel={<FontAwesomeIcon icon={faChevronLeft} size="xs" />}
                nextLabel={<FontAwesomeIcon icon={faChevronRight} size="xs" />}
                pageCount={totalPages}
                onPageChange={handlePageClick}
                containerClassName={"flex items-center space-x-2"}
                previousLinkClassName={"w-8 h-8 flex items-center justify-center bg-white border rounded shadow hover:bg-gray-100"}
                nextLinkClassName={"w-8 h-8 flex items-center justify-center bg-white border rounded shadow hover:bg-gray-100"}
                disabledClassName={"text-blue-500"}
                activeLinkClassName={"bg-blue-500 text-white rounded w-8 h-8 flex items-center justify-center hover:bg-blue-600"}
                pageClassName={"w-8 h-8 flex items-center justify-center bg-white border rounded shadow hover:bg-gray-100"}
                pageLinkClassName={"w-full h-full flex items-center justify-center focus:outline-none"}
                breakLabel={"..."}
                breakClassName={"w-8 h-8 flex items-center justify-center text-gray-500"} 
              />
            ) : (
              // Nút "Xem thêm" trên màn hình nhỏ
              visibleProducts < totalProducts && (
                <div className="flex justify-center pt-4 bg-[#F5F5F5]">
                  <button 
                    onClick={handleShowMore}
                    className="bg-white text-blue-500 px-8 py-2 rounded-lg text-[13px] hover:underline transition duration-200"
                  >
                    Xem thêm sản phẩm
                  </button>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProducts;
