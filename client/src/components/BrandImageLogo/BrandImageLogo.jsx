/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { setBrandName } from "../../features/Client/ClientFilterSlice";
import { useState } from "react";

const BrandImageLogo = ({ image }) => {
  const dispatch = useDispatch();
  const [activeLogo, setActiveLogo] = useState(null);

  const handleLogoClick = (logo) => {
    if (activeLogo === logo) {
      dispatch(setBrandName(null));
      setActiveLogo(null);
    } else {
      dispatch(setBrandName(logo));
      setActiveLogo(logo);
    }
  };

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="opacity-100 mb-3 pt-2 flex flex-wrap gap-2 justify-start items-baseline w-[calc(100%+200px)] md:w-full">
        {image.map((logo, index) => (
          <button
            key={index}
            className={`opacity-100 w-[88px] h-10 p-1 rounded border border-[#e4e5f0] bg-transparent relative flex items-center justify-center outline-none min-w-[2.5rem] cursor-pointer transition duration-[80ms] transition-bg ${
            activeLogo === logo.name ? "border-blue-500" : ""}`}
            onClick={() => handleLogoClick(logo.name)}
          >
            <div className="relative inline-block overflow-hidden h-full w-[100px]">
              <img
                className="w-full h-full object-contain absolute top-0 left-0"
                loading="lazy"
                decoding="async"
                src={logo.image}
                alt={`Logo ${logo.name}`}
              />
            </div>
            <span className="ml-0">
              <div className="absolute inset-0 overflow-hidden z-0 rounded-inherit"></div>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BrandImageLogo;