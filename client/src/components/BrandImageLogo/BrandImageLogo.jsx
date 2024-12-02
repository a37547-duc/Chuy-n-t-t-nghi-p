/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux"; // Import useDispatch
import { setBrandName } from "../../features/Client/ClientFilterSlice"; // Import action

const BrandImageLogo = ({ image }) => {
  const dispatch = useDispatch(); // Tạo dispatch

  // Hàm xử lý khi click vào logo
  const handleLogoClick = (logo) => {
    dispatch(setBrandName(logo)); // Dispatch action để set brand đã chọn
    console.log("Logo clicked:", logo); // Kiểm tra logo khi click
  };

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="opacity-100 mb-3 pt-2 flex flex-wrap gap-2 justify-start items-baseline w-[calc(100%+200px)] md:w-full">
        {image.map((logo, index) => (
          <button
            key={index}
            className="opacity-100 w-[88px] h-10 p-1 rounded border border-[#e4e5f0] bg-transparent relative flex items-center justify-center outline-none min-w-[2.5rem] cursor-pointer transition duration-[80ms] transition-bg"
            onClick={() => handleLogoClick(logo.name)} // Gọi handleLogoClick khi click vào logo
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
