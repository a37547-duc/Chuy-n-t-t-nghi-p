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
    // Check if the mouse has left both the taskbar and submenu
    if (
      event.relatedTarget &&
      !event.currentTarget.contains(event.relatedTarget)
    ) {
      setActiveIndex(null);
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
    <div className="taskbar" onMouseLeave={handleMouseLeave}>
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`menu-item ${activeIndex === index ? "hover" : ""}`}
          onMouseEnter={() => handleMouseEnter(index)}
        >
          <FontAwesomeIcon icon={item.icon} className="mr-2" />
          {item.title}
          <FontAwesomeIcon icon={faGreaterThan} className="ml-auto" style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.3)'}} />
        </div>
      ))}

      {activeIndex !== null && (
        <div className="submenu-container" onMouseLeave={handleMouseLeave}>
          <div className="submenu">
            {menuItems[activeIndex].subItems.map((subItem, subIndex) => (
              <div key={subIndex} className="submenu-item">
                <div className="submenu-title">{subItem.title}</div>
                {subItem.subSubItems && (
                  <div className="sub-submenu">
                    {subItem.subSubItems.map((subSubItem, subSubIndex) => (
                      <a key={subSubIndex} href="#" className="sub-submenu-item">
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
