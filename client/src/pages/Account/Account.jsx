import { MdOutlineEventNote } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";

export default function Account() {
    
    return (
        <div className="bg-[#F5F5F5]">
            <div className="flex justify-center mx-auto">
                <div className="flex w-full max-w-[1100px] h-420px flex-nowrap my-6 p-6">
                    <div className="w-[20%] pl-[5px] bg-white">
                        <div className='flex'>
                            <div className='max-w-full relative overflow-hidden z-0 rounded-none w-12 content-auto h-12'>
                                <img src='https://www.shutterstock.com/shutterstock/photos/1855064608/display_1500/stock-vector-cute-king-pig-wearing-glasses-cartoon-vector-icon-illustration-animal-icon-concept-isolated-1855064608.jpg'></img>
                            </div>
                            <div className='ml-2'>
                                <h6 className='mb-0 font-normal text-[0.8rem]'>Tài khoản của</h6>
                                <h5 className='uppercase text-base font-medium leading-5'>thanh nguyen</h5>
                            </div>
                        </div>
    
                        <ul className='text-[14px]'>
                            <a className="point">
                                <div className='cursor-pointer flex items-center justify-between py-1 my-2 bg-transparent font-bold text-[rgb(20,53,195)] '>
                                    <FaRegUserCircle />
                                    <div className='text-ellipsis overflow-hidden mx-[0.6rem] flex-1 font-medium'>Thông tin tài khoản</div>
                                </div>
                            </a>
                            <a>
                                <div className='cursor-pointer flex items-center justify-between py-1 my-2 hover:text-[rgb(20,53,195)] hover:font-bold'>
                                    <MdOutlineEventNote />
                                    <div className='text-ellipsis overflow-hidden mx-[0.6rem] flex-1'>Quản lý đơn hàng</div>
                                </div>
                            </a>
                            <a>
                                <div className='cursor-pointer flex items-center justify-between py-1 my-2 hover:text-[rgb(20,53,195)] hover:font-bold'>
                                    <IoMdNotificationsOutline />
                                    <div className='text-ellipsis overflow-hidden mx-[0.6rem] flex-1'>Thông báo</div>
                                </div>
                            </a>
                        </ul>
                    </div>

                    <div className="w-[80%] flex-grow min-w-0 h-full overflow-hidden mx-[10px] bg-white rounded">
                        <div className="p-4">
                            <div className="flex mb-3 p-0 border-none font-bold text-[20px] leading-[28px] opacity-100 text-inherit transition-colors duration-300">
                                Thông tin tài khoản
                            </div>
                        </div>
                        <form className="leading-5 text-[#333333]">
                            <div>
                                <div>

                                </div>
                                <input></input>
                            </div>
                            <div>
                                <div>

                                </div>
                                <input></input>
                            </div>
                            <div>
                                <div>

                                </div>
                                <input></input>
                            </div>
                            <div>
                                <div>

                                </div>
                                <input></input>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
