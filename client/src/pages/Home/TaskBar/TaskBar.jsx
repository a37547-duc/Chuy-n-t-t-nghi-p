import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaptop,
  faDesktop,
  faGamepad,
  faCogs,
  faComputer,
} from "@fortawesome/free-solid-svg-icons";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import "./Taskbar.css";

const Taskbar = () => {
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
    if (target.classList.contains("menu-item") && activeIndex !== null) {
      const rect = target.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        const submenu = document.querySelector(".submenu-container");
        if (!submenu.contains(event.relatedTarget)) {
          setActiveIndex(null);
        }
      }
    }
  };

  const menuItems = [
    {
      title: "Laptop",
      icon: faLaptop,
      subItems: [
        { title: "Thương hiệu", subSubItems: ["Dell", "HP", "ABC"] },
        { title: "Nhu cầu", subSubItems: ["Công việc", "Giải trí", "Gaming"] },
        {
          title: "Kích thước",
          subSubItems: [
            "Dưới 13 inch",
            "13-15 inch",
            "Trên 15 inch",
            "Cái con cc",
          ],
        },
        {
          title: "Cấu hình",
          subSubItems: ["Core i5", "Core i7", "Core i9", "Ryzen 5", "Ryzen 7"],
        },
      ],
    },
    {
      title: "PC",
      icon: faComputer,
      subItems: [
        { title: "Thương hiệu", subSubItems: ["Asus", "MSI", "Gigabyte"] },
        { title: "Nhu cầu sử dụng", subSubItems: ["Gaming", "Office"] },
        {
          title: "Giá",
          subSubItems: [
            "Dưới 10 triệu",
            "10-15 triệu",
            "15-20 triệu",
            "Trên 20 triệu",
          ],
        },
        {
          title: "Cấu hình",
          subSubItems: ["Core i3", "Core i5", "Core i7", "Ryzen"],
        },
      ],
    },
    {
      title: "Màn hình",
      icon: faDesktop,
      subItems: [
        { title: "Thương hiệu", subSubItems: ["Asus", "MSI", "Gigabyte"] },
        {
          title: "Tần số quét",
          subSubItems: [
            "60Hz",
            "75Hz",
            "100Hz",
            "120Hz",
            "144Hz",
            "165Hz",
            "170Hz",
            "180Hz",
            "240Hz",
          ],
        },
        {
          title: "Giá",
          subSubItems: [
            "Dưới 3 triệu",
            "3-5 triệu",
            "5-10 triệu",
            "10-15 triệu",
            "15-20 triệu",
            "Trên 20 triệu",
          ],
        },
        {
          title: "Kích thước",
          subSubItems: [
            "Dưới 19inch",
            "24 inch",
            "27 inch",
            "32 inch",
            "Trên 32 inch",
          ],
        },
        {
          title: "Độ phân giải",
          subSubItems: ["HD", "Full HD", "2K-QHD", "4K UHD"],
        },
      ],
    },
    {
      title: "Linh kiện máy tính",
      icon: faGamepad,
      subItems: [
        {
          title: "Thùng máy tính",
          subSubItems: [
            "SAMA",
            "Phong Vũ",
            "ASUS",
            "GIGABYTE",
            "DELUXE",
            "MSI",
            "ANTEC",
          ],
        },
        {
          title: "Card màn hình",
          subSubItems: [
            "ASUS",
            "GALAX",
            "GIGABYTE",
            "MSI",
            "NVIDIA",
            "VGA GTX 1650",
            "VGA GTX 4070",
            "VGA GTX 4080",
            "VGA GTX 4090",
            "VGA GTX 3060",
            "VGA GTX 3090",
          ],
        },
        {
          title: "Ổ cứng",
          subSubItems: ["SSD", "HDD", "WD", "INTEL", "Samsung", "Adata"],
        },
        {
          title: "CPU",
          subSubItems: [
            "CPU-Intel",
            "Core i3",
            "Core i5",
            "Core i7",
            "Core i9",
            "Ryzen 3",
            "Ryzen 5",
            "Ryzen 7",
            "Ryzen 9",
          ],
        },
        {
          title: "RAM",
          subSubItems: [
            "DDR5",
            "DDR4",
            "16GB",
            "32GB",
            "Adata",
            "Gigabyte",
            "Apacer",
          ],
        },
      ],
    },
    {
      title: "Phụ kiện",
      icon: faCogs,
      subItems: [
        {
          title: "Chuột",
          subSubItems: [
            "ASUS",
            "Logitech",
            "Razer",
            "HyperX",
            "Dell",
            "Microsoft",
            "Xiaomi",
            "MSI",
          ],
        },
        {
          title: "Bàn phím",
          subSubItems: [
            "Logitech",
            "Microsoft",
            "Dell",
            "MSI",
            "HyperX",
            "ASUS",
            "AKKO",
            "Razer",
          ],
        },
        {
          title: "Lót chuột",
          subSubItems: ["Logitech", "AKKO", "ASUS", "MSI", "Hyper", "Corsair"],
        },
        {
          title: "Phụ kiện Laptop",
          subSubItems: [
            "Balo-túi chống sốc",
            "Dán màn hình",
            "Sạc",
            "Bộ cấp nguồn",
            "Giá đỡ",
            "Ốp lưng",
            "Đế tản nhiệt",
          ],
        },
      ],
    },
    {
      title: "Gaming Gear",
      icon: faGamepad,
      subItems: [
        { title: "Bàn phím Gaming", subSubItems: ["Cơ", "Membrane"] },
        { title: "Chuột Gaming", subSubItems: ["Wired", "Wireless"] },
        { title: "Tai nghe Gaming", subSubItems: ["Over-ear", "In-ear"] },
        { title: "Ghế Gaming", subSubItems: ["Over-ear", "In-ear"] },
        { title: "Tay cầm chơi game", subSubItems: ["Over-ear", "In-ear"] },
      ],
    },
  ];

  return (
    <div
      className="taskbar w-full max-w-[210px] max-h-[376px] h-full  relative bg-white flex flex-col z-10 rounded-md border border-[#ddd] text-[12px]"
      onMouseLeave={handleMouseLeave}
    >
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`menu-item flex items-center px-[20px] py-[10px] text-[#333] cursor-pointer transition-colors duration-300 ${
            activeIndex === index ? "hover" : ""
          }`}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseOut={handleMouseOver}
        >
          <FontAwesomeIcon icon={item.icon} className="mr-2" />
          {item.title}
          <FontAwesomeIcon
            icon={faGreaterThan}
            className="ml-auto"
            style={{ fontSize: "12px", color: "rgba(0, 0, 0, 0.3)" }}
          />
        </div>
      ))}

      {activeIndex !== null && (
        <div
          className="submenu-container block absolute left-full top-0 h-[376px] w-[calc(80vw_-_200px)] bg-white border-2 border-[#ddd] shadow-md z-20 rounded-r-md"
          onMouseLeave={handleMouseLeave}
        >
          <div className="submenu flex w-full p-2.5 justify-between">
            {menuItems[activeIndex].subItems.map((subItem, subIndex) => (
              <div
                key={subIndex}
                className="submenu-item w-full px-5 text-[#333] cursor-pointer text-left border-l border-[#ddd]"
              >
                <div className="submenu-title font-bold mb-2.5 text-center">
                  {subItem.title}
                </div>
                {subItem.subSubItems && (
                  <div className="sub-submenu flex flex-col w-full">
                    {subItem.subSubItems.map((subSubItem, subSubIndex) => (
                      <a
                        key={subSubIndex}
                        href="#"
                        className="sub-submenu-item px-[10px] py-[5px] text-[#333] no-underline whitespace-nowrap text-left hover:text-red-500"
                      >
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
  );
};

export default Taskbar;
