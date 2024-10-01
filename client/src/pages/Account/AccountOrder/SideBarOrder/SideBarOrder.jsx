import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const SideBarOrder = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => {
        return location.pathname === path;
    };

    useEffect(() => {
        if (location.pathname === "/account/order") {
            navigate("/account/order/emptyDelivery");
        }
    }, [location.pathname, navigate]);

    return (
        <div>
            <ul className="flex bg-white p-0 m-0 rounded-[5px] overflow-hidden shadow-[5px_5px_20px_0px_rgb(230,230,230)]">
                <Link to="/account/order/emptyPayment">
                    <li 
                        className={`list-none p-[0.6rem] text-[0.95rem] cursor-pointer transition duration-100 hover:bg-gray-100 hover:text-[rgb(20,53,195)]
                        ${isActive('/account/order/emptyPayment') ? 'text-[rgb(20,53,195)] bg-gray-100' : 'text-[rgb(153,153,153)] bg-white'}`}
                    >
                        <span>Chờ thanh toán</span>
                    </li>
                </Link>
                <Link to="/account/order/emptyDelivery">
                    <li 
                        className={`list-none p-[0.6rem] text-[0.95rem] cursor-pointer transition duration-100 hover:bg-gray-100 hover:text-[rgb(20,53,195)]
                        ${isActive('/account/order/emptyDelivery') ? 'text-[rgb(20,53,195)] bg-gray-100' : 'text-[rgb(153,153,153)] bg-white'}`}
                    >
                        <span>Chờ giao hàng</span>
                    </li>
                </Link>
                <Link to="/account/order/emptyCompleted">
                    <li 
                        className={`list-none p-[0.6rem] text-[0.95rem] cursor-pointer transition duration-100 hover:bg-gray-100 hover:text-[rgb(20,53,195)] 
                        ${isActive('/account/order/emptyCompleted') ? 'text-[rgb(20,53,195)] bg-gray-100' : 'text-[rgb(153,153,153)] bg-white'}`}
                    >
                        <span>Đã hoàn thành</span>
                    </li>
                </Link>
            </ul>
        </div>
    );
}

export default SideBarOrder;
