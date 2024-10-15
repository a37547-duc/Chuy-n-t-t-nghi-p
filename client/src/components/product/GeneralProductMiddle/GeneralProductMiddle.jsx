/* eslint-disable react/prop-types */
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { useState, useEffect } from 'react';
import "./GeneralProductMiddle.css";
const GeneralProductMiddle = ({data}) => {
    const [canMoveLeft, setCanMoveLeft] = useState(false);
    const [canMoveRight, setCanMoveRight] = useState(true);
    const [shiftedCount, setShiftedCount] = useState(0);
    const moveCount = 4;

    useEffect(() => {
        setCanMoveRight(data.length > moveCount && shiftedCount < Math.floor(data.length / moveCount - 1));
    }, [data, shiftedCount]);

    const handleArrowClick = (direction) => {
        let newShiftedCount = shiftedCount;

        if (direction === 'left' && shiftedCount > 0) { 
            newShiftedCount -= 1;
        } else if (direction === 'right' && canMoveRight) {
            newShiftedCount += 1;
        }

        setShiftedCount(newShiftedCount);
        setCanMoveLeft(newShiftedCount > 0);
        setCanMoveRight(data.length > moveCount && newShiftedCount < Math.floor(data.length / moveCount - 1));
    };

    return (
        <div className="border-none border border-transparent opacity-100 bg-white mb-6 p-4">
            <div className="rounded-[4px] pt-0 relative min-h-[416px]">
                <img 
                    className="w-full h-full top-0 absolute "
                    src="https://lh3.googleusercontent.com/mlK2of-2nsmni93ObehfzO5fw0Zu55rusrnDaLP0FqCzm9LcQhs9wsG_5cCyYXsUryDzN6mM-aSBaCUYwg7U_lbF__lEUzq9=w1232"
                >
                </img>
                <div className="justify-center relative flex items-center px-4 h-[3.5rem] bg-transparent border-b border-[rgba(255,255,255,0.5)]">
                    <div className="px-2 border-none border border-transparent opacity-100 text-white font-bold text-[20px] leading-[28px] overflow-hidden transition-colors duration-300">
                        Sản phẩm mới nhất
                    </div>
                </div>
                <div className="p-3 relative w-full box-border">
                    <div className="overflow-hidden relative h-full">
                        <div 
                            className={`flex flex-nowrap m-0 p-0 whitespace-nowrap h-full relative transition-transform duration-[400ms] ease-out`} 
                            style={{ transform: `translateX(-${shiftedCount * 100.5}%)` }}
                        >
                            {data.map((product) => (
                                <div key={product.id} className="mr-1 w-[188px] flex-shrink-0 whitespace-normal">
                                    <div className="bg-white rounded h-full">
                                        <div className="relative w-full h-full p-4 flex flex-col justify-between bg-white">
                                            <a className="cursor-pointer block" href="#">
                                                <div className="relative mb-2">
                                                    <div className="relative mb-1">
                                                        <div className="relative pb-[100%]">
                                                            <div className="inline-block overflow-hidden h-full w-full transition-transform duration-300 ease-in-out absolute top-0 left-0 bottom-0 right-0 object-contain">
                                                                <img 
                                                                    className="w-full h-full object-contain absolute top-0 left-0"
                                                                    alt="Laptop ASUS ROG Zephyrus G16 GA605WI 2024 (Ryzen AI 9 HX 370/RAM 32GB/GeForce RTX 4070/1TB SSD/ Windows 11 + Office)"
                                                                    src={product.image}
                                                                    loading="lazy"
                                                                    decoding="async"
                                                                >
                                                                </img>
                                                            </div>
                                                        </div>
                                                        <div className="absolute bottom-0 left-0">
                                                            <div 
                                                                className="flex flex-col h-9 leading-3 p-1 justify-center
                                                                            bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA5NiA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iOTYiIGhlaWdodD0iNDAiIHJ4PSI0IiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXIpIiAvPgogIDxtYXNrIGlkPSJtYXNrMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMCIgeT0iMCIgd2lkdGg9Ijk2IiBoZWlnaHQ9IjQwIj4KICAgIDxyZWN0IHdpZHRoPSI5NiIgaGVpZ2h0PSI0MCIgcng9IjQiIGZpbGw9IndoaXRlIiAvPgogIDwvbWFzaz4KICA8ZyBtYXNrPSJ1cmwoI21hc2swKSI+CiAgICA8cGF0aCBvcGFjaXR5PSIwLjMiCiAgICAgIGQ9Ik03NC4yNDQ2IC05LjAyODY5TDY1Ljg3NjcgOC45MTYyMUw3MC43NzA4IDExLjE5ODNMNjMuOTI0NCAyNS44ODA1TDg0LjQ3MjQgMTEuNjI5M0w3Ny45NDcgOC41ODY0Mkw5MC41NTgxIC0xLjQyMTU2TDc0LjI0NDYgLTkuMDI4NjlaIgogICAgICBmaWxsPSIjMUIxRDI5IiAvPgogIDwvZz4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhciIgeDE9IjM1LjcyMDkiIHkxPSIxLjY2NTQ0ZS0wNiIgeDI9IjU3Ljg4ODYiIHkyPSI0MC4wODczIgogICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNBQTIwRkYiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzQxM0VGRiIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgo8L3N2Zz4=')] 
                                                                            rounded bg-cover"
                                                            >
                                                                <div className="uppercase text-[10px] font-bold text-[#ffd591]">tiết kiệm</div>
                                                                <div className="text-[13px] leading-[18px] font-bold text-white">{product.save} đ</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-1">
                                                        <div className="uppercase inline m-0 p-0 border-none text-[13px] leading-[20px] font-medium text-[#82869e] no-underline overflow-hidden transition-colors duration-300">
                                                            {product.name}
                                                        </div>
                                                    </div>
                                                    <div className="h-12">
                                                        <div className="m-0 p-0 border-none opacity-100 text-[rgb(67,70,87)] font-normal no-underline text-[12px] leading-4 overflow-hidden transition-colors duration-300 line-clamp-3">
                                                            <h3 className="font-normal leading-4 inline">
                                                                Laptop ASUS ROG Zephyrus G16 GA605WI 2024 (Ryzen AI 9 HX 370/RAM 32GB/GeForce RTX 4070/1TB SSD/ Windows 11 + Office)
                                                            </h3>
                                                        </div>
                                                    </div>
                                                    <div className="relative mt-1 mb-1">
                                                        <div className="flex flex-col items-start h-10">
                                                            <div className="m-0 p-0 border-none opacity-100 text-[rgb(20,53,195)] font-bold no-underline text-[15px] leading-6 overflow-hidden transition-colors duration-300">
                                                                77.900.000 đ
                                                            </div>
                                                            <div className="flex h-4">
                                                                <div className="m-0 mr-1 p-0 border-none opacity-100 text-[rgb(130,134,158)] font-normal text-[12px] leading-[16px] overflow-hidden transition-colors duration-300 line-through">
                                                                    91.980.000 đ
                                                                </div>
                                                                <div className="m-0 p-0 border-none opacity-100 text-[rgb(20,53,195)] font-normal text-[12px] leading-[16px] overflow-hidden transition-colors duration-300">
                                                                    -4.88%
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button 
                            className={`arrow left-0 rounded-tr-[100px] rounded-br-[100px]`} 
                            onClick={() => handleArrowClick('left')}
                            disabled={!canMoveLeft}
                        >
                            <FaChevronLeft className={`w-[24px] h-[24px] ${canMoveLeft ? 'opacity-100' : 'opacity-25 cursor-not-allowed'}`} />
                        </button>
                        <button 
                            className={`arrow right-0 rounded-tl-[100px] rounded-bl-[100px]`} 
                            onClick={() => handleArrowClick('right')}
                            disabled={!canMoveRight}
                        >
                            <FaChevronRight className={`h-[24px] w-[24px] ${canMoveRight ? 'opacity-100' : 'opacity-25 cursor-not-allowed'}`}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default GeneralProductMiddle;