/* eslint-disable react/prop-types */
import { PiCaretRight } from "react-icons/pi";
import NewImportedProducts from "../../../../../components/home/NewImportedProducts/NewImportedProducts";
import { setCategoryName } from "../../../../../features/Client/ClientFilterSlice";
import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";

const NewImportedLaptop = ({ title, categoryName, products, bgColor, path, search }) => {
  const dispatch = useDispatch();
  const handleProductClick = (categoryName) => {
    dispatch(setCategoryName(categoryName)); // Dispatch brand name vào Redux
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="px-[10px] w-full mx-auto border-none opacity-100 max-w-[1100px] mb-6">
      <div className={`relative min-h-[416px] ${bgColor} rounded-md`}>
        <div className="relative flex justify-between items-center px-4 h-14 bg-transparent border-b border-white/50">
          <a href="#" className="no-underline text-inherit cursor-pointer">
            <div className="uppercase px-2 m-0 p-0 border-none opacity-100 text-white font-bold no-underline text-[20px] leading-7 overflow-hidden transition-colors duration-300">
              {title}
            </div>
          </a>
          <Link 
            to={{pathname: path,
                search: search}} 
            state={{ from: "Taskbar" }}
            className="no-underline text-inherit cursor-pointer"
            onClick={() => handleProductClick(categoryName)}
          >
            <div className="cursor-pointer text-white box-border flex items-center text-[14px]">
              Xem tất cả
              <PiCaretRight className="w-[1em] h-[1em]" />
            </div>
          </Link>
        </div>
        <NewImportedProducts data={products} itemsPerPage={window.innerWidth > 540 ? 5 : 2} />
      </div>
    </div>
  );
}

export default NewImportedLaptop;