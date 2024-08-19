import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptop, faDesktop, faGamepad, faCogs } from '@fortawesome/free-solid-svg-icons';
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons';
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
      title: "Laptop",
      icon: faLaptop,
      subItems: [
        {
          title: "Thương hiệu",
          subSubItems: ["Dell", "HP", "ABC"],
        },
        { title: "Nhu cầu sử dụng", subSubItems: ["Công việc", "Giải trí"] },
        { title: "Linh kiện", subSubItems: ["RAM", "Ổ cứng", "Card đồ họa", "Cái con cc"] },
      ],
    },
    {
      title: "PC",
      icon: faDesktop,
      subItems: [
        { title: "Thương hiệu", subSubItems: ["Asus", "MSI", "Gigabyte"] },
        { title: "Nhu cầu sử dụng", subSubItems: ["Gaming", "Office"] },
        { title: "Linh kiện", subSubItems: ["CPU", "GPU", "Mainboard"] },
        { title: "Màn hình", subSubItems: ["4K", "144Hz", "UltraWide"] },
      ],
    },
    {
      title: "Gaming Gear",
      icon: faGamepad,
      subItems: [
        { title: "Bàn phím", subSubItems: ["Cơ", "Membrane"] },
        { title: "Chuột", subSubItems: ["Wired", "Wireless"] },
        { title: "Tai nghe", subSubItems: ["Over-ear", "In-ear"] },
      ],
    },
    {
      title: "Thiết bị văn phòng",
      icon: faCogs,
      subItems: [
        { title: "Máy in", subSubItems: ["Cơ", "Membrane"] },
        { title: "Phần mềm", subSubItems: ["Wired", "Wireless"] },
        { title: "Decor bàn làm việc", subSubItems: ["Over-ear", "In-ear"] },
      ],
    },
  ];

  return (
    <div className="taskbar w-full max-w-[210px] max-h-[376px] h-full top-[20px] relative bg-white flex flex-col z-10 rounded-md border border-[#ddd] text-[12px]" onMouseLeave={handleMouseLeave}>
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`menu-item flex items-center px-[20px] py-[10px] text-[#333] cursor-pointer transition-colors duration-300 ${activeIndex === index ? "hover" : ""}`}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseOut={handleMouseOver}
        >
          <FontAwesomeIcon icon={item.icon} className="mr-2" />
          {item.title}
          <FontAwesomeIcon icon={faGreaterThan} className="ml-auto" style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.3)'}} />
        </div>
      ))}

      {activeIndex !== null && (
        <div className="submenu-container block absolute left-full top-0 h-[376px] w-[calc(80vw_-_200px)] bg-white border-2 border-[#ddd] shadow-md z-20 rounded-r-md" onMouseLeave={handleMouseLeave}>
          <div className="submenu flex w-full p-2.5 justify-between">
            {menuItems[activeIndex].subItems.map((subItem, subIndex) => (
              <div key={subIndex} className="submenu-item w-full px-5 text-[#333] cursor-pointer text-left border-l border-[#ddd]">
                <div className="submenu-title font-bold mb-2.5 text-center">{subItem.title}</div>
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
  );
};

export default Taskbar;
