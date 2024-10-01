import { Outlet } from 'react-router-dom';
import SideBarOrder from './SideBarOrder/SideBarOrder';

const AccountOrder =() =>{
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div className="text-xl font-bold pl-4">
                    Quản lý đơn hàng
                </div>
                <SideBarOrder />
            </div>

            <Outlet />
            
        </div>
    );
};

export default AccountOrder;