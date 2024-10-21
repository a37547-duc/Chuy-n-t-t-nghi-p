import { useState, useEffect } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
  const [paddingClass, setPaddingClass] = useState("pt-[70px] pb-[60px]");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setPaddingClass("pt-[70px] pb-[60px]");
      } else {
        setPaddingClass("");
      }
    };

    // Lắng nghe sự thay đổi kích thước màn hình
    window.addEventListener("resize", handleResize);

    // Kiểm tra kích thước màn hình khi component mount
    handleResize();

    // Cleanup khi component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <Header />
      <main className={paddingClass}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
