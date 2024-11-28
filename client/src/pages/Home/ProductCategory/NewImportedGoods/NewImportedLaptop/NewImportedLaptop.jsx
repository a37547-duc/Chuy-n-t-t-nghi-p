import { useEffect } from "react";
import { PiCaretRight } from "react-icons/pi";
import NewImportedProducts from "../../../../../components/home/NewImportedProducts/NewImportedProducts";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsClient } from "../../../../../features/Client/ClientProductSlice";

const NewImportedLaptop = () => {
  const dispatch = useDispatch();

  // Lấy dữ liệu từ Redux store
  const { products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProductsClient());
  }, [dispatch]);

  return (
    <div className="px-[10px] w-full mx-auto border-none opacity-100 max-w-[1100px] mb-6">
      <div className="relative min-h-[416px] bg-pink-500 rounded-md">
        <div className="relative flex justify-between items-center px-4 h-14 bg-transparent border-b border-white/50">
          <a href="#" className="no-underline text-inherit cursor-pointer">
            <div className="uppercase px-2 m-0 p-0 border-none opacity-100 text-white font-bold no-underline text-[20px] leading-7 overflow-hidden transition-colors duration-300">
              laptop mới nhập
            </div>
          </a>
          <a href="#" className="no-underline text-inherit cursor-pointer">
            <div className="cursor-pointer text-white box-border flex items-center text-[14px]">
              Xem tất cả
              <PiCaretRight className="w-[1em] h-[1em]" />
            </div>
          </a>
        </div>
        {loading && (
          <div className="flex justify-center items-center mt-6">
            <svg className="animate-spin h-8 w-8 text-black-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <span className="ml-2 text-black-500">Loading...</span>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
            <p>Lỗi: {error.message || error}</p>
          </div>
        )}
        {!loading && !error && (
          <NewImportedProducts data={products} itemsPerPage={window.innerWidth > 540 ? 5 : 2} />
        )}
      </div>
    </div>
  );
}

export default NewImportedLaptop;