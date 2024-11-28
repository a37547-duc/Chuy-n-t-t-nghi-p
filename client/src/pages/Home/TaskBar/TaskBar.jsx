import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptop, faDesktop, faGamepad, faComputer } from "@fortawesome/free-solid-svg-icons";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { setCategoryName } from "../../../features/Client/ClientFilterSlice";
import { useDispatch } from "react-redux";


import "./Taskbar.css";
const Taskbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]); // Lưu trữ danh sách category từ API
  const [activeIndex, setActiveIndex] = useState(null);

  // Map icon theo tên category
  const iconMap = {
    "Laptop văn phòng": faLaptop,
    "Laptop doanh nhân": faDesktop,
    "Laptop Gaming": faGamepad,
    "Phụ kiện": faComputer,
    // Thêm các mapping khác nếu cần
  };

  // Gọi API để lấy danh sách category
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://laptech4k.onrender.com/api/v1/products/category");
        const data = await response.json();
        setCategories(data?.category || []); // Đảm bảo dữ liệu trả về hợp lệ
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  const handleProductClick = (categoryName) => {
    dispatch(setCategoryName(categoryName));
    navigate(`/productList/${categoryName}`);
  };

  return (
    <div
      className="taskbar w-full max-w-[1100px] max-h-[376px] h-full top-[20px] relative bg-white flex flex-col z-10 rounded-md border border-[#ddd] text-[12px]"
      onMouseLeave={handleMouseLeave}
    >
      {categories.map((category, index) => (
        <div
          key={index}
          onClick={() => handleProductClick(category.name)}
          className={`menu-item flex items-center px-[20px] py-[10px] text-[#333] cursor-pointer transition-colors duration-300 ${
            activeIndex === index ? "hover" : ""
          }`}
          onMouseEnter={() => handleMouseEnter(index)}
        >
          <FontAwesomeIcon
            icon={iconMap[category.name] || faComputer} // Hiển thị icon dựa trên tên category
            className="mr-2"
          />
          {category.name} {/* Hiển thị tên category */}
          <FontAwesomeIcon
            icon={faGreaterThan}
            className="ml-auto"
            style={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.3)" }}
          />
        </div>
      ))}

      {activeIndex !== null && (
        <div
          className="submenu-container block absolute left-full top-0 h-[376px] min-w-[550px] w-auto w-[58vw] bg-white border-2 border-[#ddd] shadow-md z-20 rounded-r-md"
          onMouseLeave={handleMouseLeave}
        >
          <div className="submenu flex w-full p-2.5 justify-between">
            <div className="submenu-item w-full px-5 text-[#333] cursor-pointer text-left border-l border-[#ddd]">
              <div className="submenu-title font-bold mb-2.5 text-center">
                {/* Bạn có thể hiển thị thông tin chi tiết của category ở đây */}
                Submenu Content
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Taskbar;
