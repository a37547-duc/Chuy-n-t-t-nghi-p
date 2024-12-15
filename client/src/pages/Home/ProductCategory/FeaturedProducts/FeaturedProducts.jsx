import { useState, useRef, useEffect } from "react";
import "./FeaturedProducts.css";
import ReactPaginate from "react-paginate";

import { PiCaretRight } from "react-icons/pi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import MobileFeatured from "./MobileFeatured/MobileFeatured";
import ComputerFeatured from "./ComputerFeatured/ConputerFeatured";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsClient } from "../../../../features/Client/ClientProductSlice";
import SkeletonComputer from "./Skeleton/SkeletonComputer";

const FeaturedProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.clientProduct);

  const [page, setPage] = useState(0);
  const [productsPerPage] = useState(10);

  // Trạng thái để xác định màn hình nhỏ
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 540);

  // Trạng thái để quản lý số lượng sản phẩm hiển thị trên màn hình nhỏ
  const [visibleProducts, setVisibleProducts] = useState(10);

  const highlightRef = useRef(null);

  useEffect(() => {
    dispatch(getAllProductsClient());
  }, [dispatch]);

  // Cập nhật trạng thái màn hình khi kích thước cửa sổ thay đổi
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 540);
    };

    window.addEventListener("resize", handleResize);

    // Xóa listener khi component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalProducts = products.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageClick = (data) => {
    setPage(data.selected);
    // Cuộn lên phần tử "Sản phẩm nổi bật"
    highlightRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const indexOfLastProduct = (page + 1) * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Logic cho màn hình nhỏ (xem thêm sản phẩm)
  const handleShowMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 10);
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
          <a href="/productList" className="no-underline text-inherit cursor-pointer">
            <div className="cursor-pointer box-border flex items-center text-[14px] text-[#82869e]">
              Xem tất cả
              <PiCaretRight className="w-[1em] h-[1em]" />
            </div>
          </a>
        </div>

        {loading && (
          <SkeletonComputer />
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
            <p>Lỗi: {error.message || error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {!isMobile ? (
              <ComputerFeatured currentProducts={currentProducts} />
            ) : (
              <MobileFeatured currentVisibleProducts={currentVisibleProducts} />
            )}
          </>
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
};

export default FeaturedProducts;
