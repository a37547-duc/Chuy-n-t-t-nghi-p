/* eslint-disable react/prop-types */
import "./GeneralProductUp.css";
import BrandImageLogo from "../../BrandImageLogo/BrandImageLogo";
import OnDemand from "../OnDemand/OnDemand";
const GeneralProductUp = ({image, choose}) => {
  return (
    <div className="opacity-100 bg-white mb-0 p-3 px-4">
      <div className="flex items-baseline justify-start flex-wrap opacity-100 bg-white">
        <h1 className="text-xl leading-8 font-bold text-[#434657]">
          Laptop - Máy tính xách tay
        </h1>
        <div className="pl-2 border-none border border-transparent opacity-100 text-[#82869e] font-normal no-underline text-[20px] leading-[28px] overflow-hidden transition-colors duration-300">
          (654 sản phẩm)
        </div>
      </div>

      <BrandImageLogo image={image} />
        
      <OnDemand choose={choose} />
    </div>
  );
}
export default GeneralProductUp;