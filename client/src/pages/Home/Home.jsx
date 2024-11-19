import { useEffect, useState } from "react";
import BestSeller from "./BestSeller/BestSeller";
import ProductCategory from "./ProductCategory/ProductCategory";
import LogonButtonComputer from "./LogoButton/LogoButtonComputer/LogoButton";
import LogonButtonMobile from "./LogoButton/LogoButtonMobile/LogoButtonMobile";
import TopHomeComputer from "./TopHome/TopHomeComputer/TopHomeComputer";
import TopHomeMobile from "./TopHome/TopHomeMobile/TopHomeMobile";
import { setUserInfo } from "../../features/Auth/authSlice";
import { useDispatch } from "react-redux";

export default function Home() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    const username = queryParams.get("username");
    const email = queryParams.get("email");
  
    if (token && username && email) {
      dispatch(
        setUserInfo({
          token,
          name: username,
          email,
        })
      );
      const newUrl = window.location.pathname;
      window.history.replaceState(null, "", newUrl);
    }
  }, [dispatch]);

  useEffect(() => {
    // Hàm kiểm tra chiều rộng màn hình
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Thêm sự kiện lắng nghe resize
    window.addEventListener("resize", handleResize);

    // Dọn dẹp sự kiện khi component bị unmount tráng rò rỉ bộ nhớ
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderTopHome = windowWidth > 768 ? <TopHomeComputer /> : <TopHomeMobile />;
  const renderLogoButton = windowWidth > 768 ? <LogonButtonComputer /> : <LogonButtonMobile />;
  return (
    <div className="bg-[#F5F5F5]">
      {renderTopHome}

      {renderLogoButton}
      <div className="mt-[50px] mb-[20px]">
        <div className="max-w-[1100px] mx-auto">
          <ProductCategory />
          <BestSeller />
        </div>
      </div>
    </div>
  );
}