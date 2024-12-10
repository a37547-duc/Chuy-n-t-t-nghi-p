import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComputer } from "@fortawesome/free-solid-svg-icons";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryName } from "../../../features/Client/ClientFilterSlice";
import { getAllCategoriesClient } from "../../../features/Client/ClientCategorySlice";
import "./Taskbar.css";
const Taskbar = () => {
  const dispatch = useDispatch();
  const { data: categories} = useSelector((state) => state.clientCategory);

  useEffect(() => {
    dispatch(getAllCategoriesClient());
  }, [dispatch]);

  const [activeIndex, setActiveIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  const handleProductClick = (categoryName) => {
    dispatch(setCategoryName(categoryName)); // Dispatch brand name vào Redux
  };
  return (
    <div
      className="taskbar w-full max-w-[1100px] max-h-[376px] h-full top-[20px] relative bg-white flex flex-col z-10 rounded-md border border-[#ddd] text-[12px]"
      onMouseLeave={handleMouseLeave}
    >
      {categories.map((category, index) => (
        <Link
          key={index}
          to={{
            pathname: "/productList",
            search: `?categoryName=${category.name}`,
          }}
          state={{ from: "Taskbar" }} // Thêm state để xác định nguồn điều hướng
          className={`menu-item flex items-center px-[20px] py-[10px] text-[#333] cursor-pointer transition-colors duration-300 ${
            activeIndex === index ? "hover" : ""
          }`}
          onMouseEnter={() => handleMouseEnter(index)}
          onClick={() => handleProductClick(category.name)} // Dispatch category name vào Redux
        >
          {category.image ? (
            <img
              src={category.image}
              alt={category.name}
              className="mr-2 w-5 h-5 object-contain" // Tùy chỉnh kích thước của ảnh
            />
          ) : (
            <FontAwesomeIcon
              icon={faComputer} // Hiển thị icon mặc định nếu không có ảnh
              className="mr-2"
            />
          )}
          {category.name}
          <FontAwesomeIcon
            icon={faGreaterThan}
            className="ml-auto"
            style={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.3)" }}
          />
        </Link>
      ))}

      {/* {activeIndex !== null && (
        <div
          className="submenu-container block absolute left-full top-0 h-[376px] min-w-[550px] w-auto w-[58vw] bg-white border-2 border-[#ddd] shadow-md z-20 rounded-r-md"
          onMouseLeave={handleMouseLeave}
        >
          <div className="submenu flex w-full p-2.5 justify-between">
            <div className="submenu-item w-full px-5 text-[#333] cursor-pointer text-left border-l border-[#ddd]">
              <div className="submenu-title font-bold mb-2.5 text-center">
                Submenu Content
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Taskbar;