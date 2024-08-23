import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faGift } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductDetailTop() {
    const [mainImage, setMainImage] = useState('https://lh3.googleusercontent.com/RmgcDSPB9S7E24ewRRjyD0CT7HbUkuhZKEF_DBt6SoHMsnKa8-V9C9xdx3Gk-ryBW0MpqIyv7z8kdMeOWdNIWyu0cAIuZszQ=w500-rw');
    const [isApplied, setIsApplied] = useState(false);

    const images = [
        'https://lh3.googleusercontent.com/RmgcDSPB9S7E24ewRRjyD0CT7HbUkuhZKEF_DBt6SoHMsnKa8-V9C9xdx3Gk-ryBW0MpqIyv7z8kdMeOWdNIWyu0cAIuZszQ=w500-rw',
        'https://lh3.googleusercontent.com/mxkBkJLsHoteolx4AKQQjjzkGCv_Y4rwgCUiDuRlw_jZwwO7OCjRrSA5k_UHwXLz_u6G7tGJrJpbNHhsI5ZEOjLPYh83hNA=rw',
        'https://lh3.googleusercontent.com/XeJIl-Yj-ADi4pAMJKSfCwF7tYZbw6Wbahgew0GBMqAZ6M1uHRgYe8Oj915igMJlvQWchepBrKqgRx1zo1rHHDPAsv_LCJI=rw',
        'https://lh3.googleusercontent.com/5KJb1fZUPN2rwaGuQPxJ1sYYnCVH3jSogDT00pRyJ-8EZFn7dFgBAAEye5gmLnjXjcD77vphvdEBTtgS-JWRo-9sctsDWiegGg=w500-rw',
        'https://lh3.googleusercontent.com/ZuU_1FNx4QQcMPhEme5xUMpRZhBR14_S7wX6TXva_375Nkw7njomrRS3u6J0-6JCUyzmz2b-YCIdlDBheySdhFBGcMdU63I=w500-rw'
    ];

    const handleScrollToMiddle = () => {
        const element = document.getElementById("product-detail-middle");
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handlePromotionClick = () => {
        if (isApplied) {
            setIsApplied(false);
            toast.info('Bỏ áp dụng khuyến mãi thành công', {className:'text-[15px]'});
        } else {
            setIsApplied(true);
            toast.success('Áp dụng khuyến mãi thành công', {className:'text-[15px]'});
        }
    };

    return (
        <div className="flex justify-center mx-auto">
            <div className="flex w-full max-w-[1100px] h-420px flex-nowrap my-6 p-6 bg-white rounded">
                <div className="w-[40%] flex-shrink-0 pl-[5px]">
                    <div className="main-image mb-[10px] justify-center items-center flex">
                        <img src={mainImage} alt="Main" className="w-[320px] h-[320px]" />
                    </div>
                    <div className="thumbnail-gallery flex space-x-2">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="thumbnail cursor-pointer h-[50px] w-[50px]"
                                onMouseEnter={() => setMainImage(image)}
                            >
                                <img
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-full h-full object-content"
                                />
                            </div>
                        ))}
                    </div>
                    <div className='my-3 py-3'>
                        <div className='dashs border-t border-dashed border-[#E4E5F0] w-full'></div>
                    </div>
                    <div className='p-4 text-[14px] text-[#333]'>
                        - CPU: Intel Core i5-13400 (2.5 GHz - 4.6 GHz/20MB/10 nhân, 16 luồng)
                        <br />
                        - RAM: 1 x 8GB DDR4 3200MHz (2 Khe cắm, Hỗ trợ tối đa 64GB)
                        <br />
                        - Đồ họa: Intel UHD Graphics 730
                        <br />
                        - Lưu trữ: 256GB M.2 NVMe SSD/1TB HDD 7200RPM
                        <br />
                        - Bàn phím + Chuột
                    </div>
                    <a href="#" onClick={(e) => { e.preventDefault(); handleScrollToMiddle(); }} className='cursor-pointer text-[#1990FF] text-[13px]'>
                        <div>
                            Xem thông tin chi tiết
                        </div>
                    </a>
                </div>

                <div className="w-[60%] flex-grow min-w-0 h-full overflow-hidden mx-[10px] z-10">
                    <div>
                        <h1 className='mb-2 text-[24px] font-bold leading-tight text-[#333]'>Laptop ASUS Vivobook 15X Oled M3504YA-L1268W (Ryzen 5 7530U/RAM 16GB/Onboard/512GB SSD/ Windows 11)</h1>
                        <div className='text-[14px] mt-[-4px] text-[#82869E]'>
                            Thương hiệu:
                            <a 
                                href='#'
                                className='cursor-pointer'>
                                <span className='text-blue-700 font-bold'> ASUS</span>
                            </a>
                            <span className='mx-2'>|</span>
                            SKU: 0123456789
                        </div>
                    </div>
                    <div className='my-4'>
                        <div className='text-[12px] text-[#82869E] uppercase font-medium'>
                            Màu sắc Laptop(Filter)
                        </div>
                        <div className='flex mt-[8px] '>
                            <a className='px-4 py-2 rounded-md border-2 border-blue-500 text-[12px] text-blue-500 mr-2 mb-2'>
                                Xanh
                            </a>
                        </div>
                    </div>
                    <div className='flex-column mb-3'>
                        <div className='text-blue-700 font-bold text-[20px]'>
                            10.000.000đ
                        </div>
                        <div className='text-[12px] flex'>
                            <div className='mr-1 text-[#82869E] line-through'>
                                12.990.000đ
                            </div>
                            <div className='text-blue-500'>
                                -16.936%
                            </div>
                        </div>
                    </div>
                    <div className='py-3'>
                        <div className='dashs border-t border-dashed border-[#ddd] w-full'></div>
                    </div>
                    <div className='bg-[#F5F5F5] p-4 mt-4 rounded-md' style={{border: "1.5px solid rgb(228, 229, 240)"}}>
                        <div className='text-[#82869e] text-[14px] uppercase mb-1 '>
                            <strong className='font-medium'>
                                Chọn một trong những khuyến mãi
                            </strong>
                        </div>
                        <div
                            className={`w-full flex flex-row gap-0 justify-start items-start opacity-100 box-border mt-2.5 p-3 w-full rounded-lg cursor-pointer relative overflow-hidden ${isApplied ? 'bg-[#F5F5F5] border-2 border-blue-500' : 'bg-white border border-gray-200'}`}
                            onClick={handlePromotionClick}
                        >
                            <div className='min-w-[64px] h-[64px] w-[64px] flex justify-center items-center mr-[12px] rounded bg-[#E8EBF9]'>
                                <FontAwesomeIcon className='text-red-500 text-[24px]' icon={faGift} />
                            </div>
                            <div className='w-full flex-grow flex-shrink basis-0 border-0 border-[1px] border-transparent opacity-100 h-full flex flex-col gap-0 justify-between items-baseline'>
                                <div className='max-w-full text-[13px] font-medium leading-[20px] overflow-hidden text-[#434657] whitespace-pre-line'>
                                    Giảm 3đ (áp dụng vào giá sản phẩm)
                                </div>
                                <div className='max-w-full mt-1 text-[12px] leading-[16px] text-[#848788] overflow-hidden whitespace-pre-line'>
                                    Khuyến mãi áp dụng khi mua tối thiểu một sản phẩm
                                </div>
                                <div className='border-none border border-gray-200 opacity-100 w-full mt-2 flex flex-row gap-0 justify-between items-baseline'>
                                    <div className='text-xs leading-4 text-gray-500'>
                                        HSD: 15/15/1515
                                    </div>
                                    <div className='text-[13px] leading-5 text-[#1990FF]'>
                                        {isApplied ? 'Bỏ chọn' : 'Áp dụng'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-2 mt-4'>
                        <div className='flex-grow flex-shrink basis-0'>
                            <button className='h-[50px] bg-blue-600 cursor-pointer w-full text-white font-bold rounded hover:bg-blue-700'> Mua ngay</button>
                        </div>
                        <div className='flex-grow flex-shrink basis-0'>
                            <button className='h-[50px] bg-white cursor-pointer w-full border border-blue-700 rounded text-blue-700 font-bold'>
                                <FontAwesomeIcon icon={faCartPlus} />
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={true} closeOnClick rtl={false} pauseOnFocusLoss={false} draggable={true} pauseOnHover={false} />
        </div>
    );
}
