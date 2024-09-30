/* eslint-disable react/prop-types */

const GeneralProductUp = ({image, choose}) => {
    return (
        <div className="opacity-100 bg-white mb-0 p-3 px-4">
            <div className="flex items-baseline justify-start flex-wrap opacity-100 bg-white">
                <h1 className="text-xl leading-8 font-bold text-[#434657]">
                    Laptop - Máy tính xách tay
                </h1>
                <div className="m-0 p-0 pl-2 border-none border border-transparent opacity-100 text-[#82869e] font-normal no-underline text-[20px] leading-[28px] overflow-hidden transition-colors duration-300">
                    (654 sản phẩm)
                </div>
            </div>

            <div className="border-none border border-transparent opacity-100 mb-3 pt-2 flex flex-wrap gap-2 justify-start items-baselin">
                {image.map((logo) => (
                    <a key={logo.id} className="border-none border border-transparent opacity-100 text-black no-underline">
                    <button className="opacity-100 w-[88px] h-10 p-1 rounded border border-[#e4e5f0] bg-transparent relative flex items-center justify-center outline-none min-w-[2.5rem] cursor-pointer transition duration-[80ms] transition-bg">
                        <div className="relative inline-block overflow-hidden h-full w-[100px]">
                            <img 
                                className="w-full h-full object-contain absolute top-0 left-0"
                                loading="lazy"
                                src={logo}
                            >
                            </img>
                        </div>
                        <span className="ml-0">
                            <div className="absolute inset-0 overflow-hidden z-0 rounded-inherit"></div>
                        </span>
                    </button>
                </a>
                ))}
                
            </div>
            
            <div className="border-none border border-transparent opacity-100 mt-3 mb-1">
                <h2 className="m-0 text-lg leading-6 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                    Laptop theo nhu cầu
                </h2>
                <div className="overflow-hidden opacity-100 h-auto mt-2 flex flex-wrap gap-2 justify-start items-center">
                    {choose.map((chose) => (
                        <a key={chose.id} className="opacity-100 text-black no-underline hover:text-blue-700 hover:cursor-pointer">
                            <div className="rounded-md border border-gray-300 opacity-100 w-[88px] h-[125px] p-1 flex flex-col gap-0 justify-start items-center">
                                <div className="relative inline-block overflow-hidden h-[72px] w-[72px]">
                                    <img
                                        src={chose.image}
                                        className="w-[72px] h-[72px] object-contain absolute top-0 left-0"
                                        loading="lazy"
                                    >

                                    </img>
                                </div>
                                <div className="flex flex-grow items-center">
                                    <div className="mt-1 p-0 opacity-100 text-inherit font-normal text-[13px] leading-[24px] overflow-hidden flex-grow flex items-center transition-colors duration-300 text-center">
                                        {chose.name}
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default GeneralProductUp;