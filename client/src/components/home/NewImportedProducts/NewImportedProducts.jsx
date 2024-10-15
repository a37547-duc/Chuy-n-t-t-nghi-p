/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { useState, useEffect } from 'react';
import "./NewImportedProducts.css";

const NewImportedProducts = ({ data, moveCount = 5}) => {
    const [canMoveLeft, setCanMoveLeft] = useState(false);
    const [canMoveRight, setCanMoveRight] = useState(true);
    const [shiftedCount, setShiftedCount] = useState(0);

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
        <div className="p-3 relative w-full box-border text-[#333333]">
            <div className="overflow-hidden relative h-full">
                <div 
                    className={`flex flex-nowrap m-0 p-0 whitespace-nowrap h-full relative transition-transform duration-[400ms] ease-out`}
                    style={{ transform: `translateX(-${shiftedCount * 100.5}%)` }}
                >
                    {data.map((product) => (
                        <div key={product.id} className="h-auto mr-[5px] w-[205px] flex-shrink-0 box-border">
                            <div className="bg-white rounded-md h-full block">
                                <div className="relative w-full h-full p-4 flex flex-col bg-white justify-between">
                                    <a className="no-underline text-inherit cursor-pointer block">
                                        <div className="mb-2 relative">
                                            <div className="mb-1 relative">
                                                <div className="relative pb-[100%]">
                                                    <div className="inline-block overflow-hidden h-full w-full transition-transform duration-300 absolute inset-0 object-contain">
                                                        <img 
                                                            className="w-full h-full absolute top-0 left-0 object-contain hover:scale-110 transition-transform duration-500" 
                                                            loading="lazy"
                                                            decoding="async"
                                                            src={product.image}
                                                            alt={product.name}    
                                                        >
                                                        </img>
                                                    </div>
                                                </div>
                                                <div className="absolute bottom-0 left-0">
                                                    <div 
                                                        className="h-[36px] leading-[12px] flex flex-col justify-center 
                                                        bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA5NiA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iOTYiIGhlaWdodD0iNDAiIHJ4PSI0IiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJhIiAvPgogIDxtYXNrIGlkPSJtYXNrMCIgbWFzay10eXBlPSJhbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMCIgeT0iMCIgd2lkdGg9Ijk2IiBoZWlnaHQ9IjQwIj4KICAgIDxyZWN0IHdpZHRoPSI5NiIgaGVpZ2h0PSI0MCIgcng9IjQiIGZpbGw9IndoaXRlIiAvPgogIDwvbWFzaz4KICA8ZyBtYXNrPSJ1cmwoI21hc2swKSI+CiAgICA8cGF0aCBvcGFjaXR5PSIwLjMiCiAgICAgIGQ9Ik03NC4yNDQ2IC05LjAyODY5TDY1Ljg3NjcgOC45MTYyMUw3MC43NzA4IDExLjE5ODNMNjMuOTI0NCAyNS44ODA1TDg0LjQ3MjQgMTEuNjI5M0w3Ny45NDcgOC41ODY0Mkw5MC41NTgxIC0xLjQyMTU2TDc0LjI0NDYgLTkuMDI4NjlaIgogICAgICBmaWxsPSIjMUIxRDI5IiAvPgogIDwvZz4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQwX2xpbmVhciIgeDE9IjM1LjcyMDkiIHkxPSIxLjY2NTQ0ZS0wNiIgeDI9IjU3Ljg4ODYiIHkyPSI0MC4wODczIgogICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNBQTIwRkYiIC8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzQxM0VGRiIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgo8L3N2Zz4=')] 
                                                        bg-cover no-repeat p-1 rounded-md"
                                                    >
                                                        <div className="uppercase text-[10px] font-bold text-[rgb(255,213,145)]">
                                                            tiết kiệm
                                                        </div>
                                                        <div className="text-[13px] leading-[18px] font-bold text-black">
                                                            {product.save} đ
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-1">
                                                <div className="uppercase m-0 p-0 opacity-100 text-[rgb(130,134,158)] font-medium text-[13px] leading-[20px] overflow-hidden block transition-colors duration-300">
                                                    {product.name}
                                                </div>
                                            </div>
                                            <div className="h-12">
                                                <div className="m-0 p-0 opacity-100 text-[rgb(67,70,87)] font-normal text-[12px] leading-[16px] block transition-colors duration-300">
                                                    <h3 className="text-xs font-normal leading-[1rem] inline-block overflow-wrap break-word whitespace-normal">
                                                        {product.description}
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="relative mt-1 mb-1">
                                                <div className="flex flex-col items-start h-10">
                                                    <div className="m-0 p-0 opacity-100 text-[rgb(20,53,195)] font-bold text-[15px] leading-[24px] overflow-hidden block transition-colors duration-300">
                                                        {product.price} đ
                                                    </div>
                                                    <div className="flex h-4">
                                                        <div className="m-0 mr-1 p-0 opacity-100 text-[rgb(130,134,158)] font-normal text-[12px] leading-[16px] overflow-hidden transition-colors duration-300 line-through">
                                                            {product.oldPrice} đ
                                                        </div>
                                                        <div className="m-0 p-0 opacity-100 text-[rgb(20,53,195)] font-normal text-[12px] leading-[16px] overflow-hidden block transition-colors duration-300">
                                                            -{product.discount}%
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <button className="opacity-100 h-8 p-0 rounded-md bg-white border border-[rgb(20,53,195)] relative flex items-center justify-center outline-none min-w-8 text-[rgb(20,53,195)] w-full cursor-pointer transition duration-80">
                                        <div className="m-0 p-0 border-0 opacity-100 text-[rgb(20,53,195)] font-medium text-[13px] leading-[20px] overflow-hidden block transition-colors duration-300">
                                            Thêm vào giỏ
                                        </div>
                                    </button>
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
    );
};

export default NewImportedProducts;