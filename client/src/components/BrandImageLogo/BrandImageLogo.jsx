/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
const BrandImageLogo = ({ image }) => {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="opacity-100 mb-3 pt-2 flex flex-wrap gap-2 justify-start items-baselin w-[calc(100%+200px)] md:w-full">
        {image.map((logo, index) => (
          <Link key={index} to={"/productOneBrand"} className="opacity-100 text-black no-underline">
            <button className="opacity-100 w-[88px] h-10 p-1 rounded border border-[#e4e5f0] bg-transparent relative flex items-center justify-center outline-none min-w-[2.5rem] cursor-pointer transition duration-[80ms] transition-bg">
              <div className="relative inline-block overflow-hidden h-full w-[100px]">
                <img 
                  className="w-full h-full object-contain absolute top-0 left-0"
                  loading="lazy"
                  decoding="async"
                  src={logo}
                />
              </div>
              <span className="ml-0">
                <div className="absolute inset-0 overflow-hidden z-0 rounded-inherit"></div>
              </span>
            </button>
          </Link>
        ))}
      </div>
      
    </div>
  );
}

export default BrandImageLogo;