import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop, faDesktop, faGamepad, faCogs, faComputer } from '@fortawesome/free-solid-svg-icons';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';
import "./Taskbar.css";

// TEST
import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "../../../stores/query/productQuery";
import {
  setCategory,
  setUsecase,
  setBrand,
} from "../../../stores/slices/producSlice"; // Import từ RTK Query

const Taskbar = () => {
  const dispatch = useDispatch();

  const handleCategoryChange = ({ category, usecase }) => {
    dispatch(setCategory(category)); // Cập nhật category dựa trên giá trị truyền vào
    dispatch(setUsecase(usecase));
    console.log(category, usecase);
    console.log("ĐÂY LÀ TASKBAR");
  };

  const [activeIndex, setActiveIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = (event) => {
    if (
      event.relatedTarget &&
      !event.currentTarget.contains(event.relatedTarget)
    ) {
      setActiveIndex(null);
    }
  };

  const handleMouseOver = (event) => {
    const target = event.target;
    if (target.classList.contains('menu-item') && activeIndex !== null) {
      const rect = target.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
        const submenu = document.querySelector('.submenu-container');
        if (!submenu.contains(event.relatedTarget)) {
          setActiveIndex(null);
        }
      }
    }
  };

  const menuItems = [
    {
      name: "Laptop văn phòng",
      category: "Laptop",
      usecase: "Office",
      icon: faLaptop,
      subItems: [],
    },
    {
      name: "Laptop doanh nhân",
      category: "Laptop",
      usecase: "Business",
      icon: faComputer,
      subItems: [],
    },
    {
      name: "Laptop Gaming",
      category: "Laptop",
      usecase: "Gaming",
      icon: faDesktop,
      subItems: [],
    },
    {
      name: "Laptop sinh viên",
      category: "Laptop",
      usecase: "Student",
      icon: faGamepad,
      subItems: [],
    },
    {
      name: "Phụ kiện",
      icon: faCogs,
      subItems: [
        { name: "Chuột", subSubItems: ["ASUS", "Logitech", "Razer", "HyperX", "Dell", "Microsoft", "Xiaomi", "MSI"] },
      ],
    },
  ];

  return (
    <div className="taskbar w-full max-w-[1100px] max-h-[376px] h-full top-[20px] relative bg-white flex flex-col z-10 rounded-md border border-[#ddd] text-[12px]" onMouseLeave={handleMouseLeave}>
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`menu-item flex items-center px-[20px] py-[10px] text-[#333] cursor-pointer transition-colors duration-300 ${activeIndex === index ? "hover" : ""}`}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseOut={handleMouseOver}
          onClick={() =>
            handleCategoryChange({ category: item.category , usecase: item.usecase })}
        >
          <FontAwesomeIcon icon={item.icon} className="mr-2"
           
          />
          {item.name}
          <FontAwesomeIcon icon={faGreaterThan} className="ml-auto" style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.3)'}} />
        </div>
      ))}

      {activeIndex !== null && menuItems[activeIndex].name === "Phụ kiện" && (
        <div className="submenu-container block absolute left-full top-0 h-[376px] min-w-[550px] w-auto w-[58vw] bg-white border-2 border-[#ddd] shadow-md z-20 rounded-r-md" onMouseLeave={handleMouseLeave}>
          <div className="submenu flex w-full p-2.5 justify-between">
            {menuItems[activeIndex].subItems.map((subItem, subIndex) => (
              <div key={subIndex} className="submenu-item w-full px-5 text-[#333] cursor-pointer text-left border-l border-[#ddd]">
                <div className="submenu-title font-bold mb-2.5 text-center">{subItem.name}</div>
                {subItem.subSubItems && (
                  <div className="sub-submenu flex flex-col w-full">
                    {subItem.subSubItems.map((subSubItem, subSubIndex) => (
                      <a key={subSubIndex} href="#" className="sub-submenu-item px-[10px] py-[5px] text-[#333] no-underline whitespace-nowrap text-left hover:text-red-500">
                        {subSubItem}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

    // <h1>
    //   <button
    //     onClick={() =>
    //       handleCategoryChange({ category: "mouse", usecase: "gaming" })
    //     }
    //   >
    //     Test MOUSSE
    //   </button>
    //   <br />
    //   <button onClick={() => handleCategoryChange("laptop")}>
    //     Test LAPTOP
    //   </button>
    // </h1>
  );
};

export default Taskbar;