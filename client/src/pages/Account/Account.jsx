import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AccountComputer from "./AccountComputer/AccountComputer";
import AccountMobile from "./AccountMobile/AccountMobile";

const Account = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      if (newWidth !== windowWidth) {
        setWindowWidth(newWidth);
      }

      if (newWidth <= 768) {
        if (location.pathname.includes("information")) {
          navigate("/account/informationMobile");
        } else if (location.pathname.includes("order")) {
          navigate("/account/orderMobile");
        } else if (location.pathname.includes("changePassword")) {
          navigate("/account/changePasswordMobile");
        }
      } else {
        if (location.pathname.includes("informationMobile")) {
          navigate("/account/information");
        } else if (location.pathname.includes("orderMobile")) {
          navigate("/account/order");
        } else if (location.pathname.includes("changePasswordMobile")) {
          navigate("/account/changePassword");
        }
      }
    };

    // Lắng nghe sự thay đổi kích thước cửa sổ
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [location.pathname, navigate, windowWidth]);

  const renderAccountUser = windowWidth > 768 ? <AccountComputer /> : <AccountMobile />;

  return <div>{renderAccountUser}</div>;
};

export default Account;
