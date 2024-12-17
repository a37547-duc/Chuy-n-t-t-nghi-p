/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { setCategoryName } from "../../../features/Client/ClientFilterSlice";
import { useState } from "react";

const OnDemand = ({ choose }) => {
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (category) => {
    if (activeCategory === category) {
      dispatch(setCategoryName(null));
      setActiveCategory(null);
    } else {
      dispatch(setCategoryName(category));
      setActiveCategory(category);
    }
  };

  return (
    <div className="border-none border border-transparent opacity-100 mt-3 mb-1">
      <h2 className="m-0 text-lg leading-6 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
        Laptop theo nhu cầu
      </h2>

      <div className="overflow-x-auto scrollbar-hide">
        <div className="overflow-hidden opacity-100 h-auto mt-2 flex flex-wrap gap-2 justify-start items-center w-[calc(100%+50px)] md:w-full">
          {choose.map((chose, index) => (
            <button
              key={index}
              className={`rounded-md border opacity-100 w-[88px] h-[125px] p-1 flex flex-col gap-0 justify-start items-center hover:cursor-pointer transition-colors duration-300 ${
              activeCategory === chose.name ? "border-blue-500" : "border-gray-300"}`} 
              onClick={() => handleCategoryClick(chose.name)}
            >
              <div className="relative inline-block overflow-hidden h-[72px] w-[72px]">
                <img
                  src={chose.image}
                  className="w-[72px] h-[72px] object-contain absolute top-0 left-0"
                  loading="lazy"
                  decoding="async"
                  alt={`Category ${chose.name}`}
                />
              </div>

              <div className="flex flex-grow items-center">
                <div className="mt-1 opacity-100 text-inherit font-normal text-[13px] leading-[24px] overflow-hidden flex-grow flex items-center text-center">
                  {chose.name}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnDemand;
