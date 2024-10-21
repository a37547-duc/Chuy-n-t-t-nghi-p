import { useState, useEffect } from "react";
import BottomFooter from "./BottomFooter/BottomFooter";
import BottomBar from "./BottomBar/BottomBar";

const Footer = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Hàm kiểm tra chiều rộng màn hình
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Thêm sự kiện lắng nghe resize
    window.addEventListener("resize", handleResize);

    // Dọn dẹp sự kiện khi component bị unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {/* Nếu màn hình từ 541px đến 768px, hiển thị cả BottomFooter và BottomBar */}
      {windowWidth > 540 && windowWidth <= 768 && (
        <>
          <BottomFooter />
          <BottomBar />
        </>
      )}
      
      {/* Nếu màn hình lớn hơn 768px, chỉ hiển thị BottomFooter */}
      {windowWidth > 768 && <BottomFooter />}
      
      {/* Nếu màn hình nhỏ hơn hoặc bằng 540px, chỉ hiển thị BottomBar */}
      {windowWidth <= 540 && <BottomBar />}
    </div>
  );
};

export default Footer;
